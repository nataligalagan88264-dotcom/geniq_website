const crypto = require("crypto");
const {
  getOAuthOrigin,
  getOAuthRedirectUri,
  serializeForInlineScript,
  setOAuthResponseHeaders,
} = require("../lib/oauth-security");

const parseCookies = (header = "") =>
  Object.fromEntries(
    header
      .split(";")
      .map((item) => item.trim().split("="))
      .filter(([key, value]) => key && value)
  );

const renderResult = (status, content, expectedOrigin, nonce) => `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <title>GENIQ CMS</title>
  </head>
  <body>
    <script nonce="${nonce}">
      const expectedOrigin = ${serializeForInlineScript(expectedOrigin)};
      const receiveMessage = (message) => {
        if (message.source !== window.opener || message.origin !== expectedOrigin) return;
        window.opener.postMessage(
          ${serializeForInlineScript(`authorization:github:${status}:`)} + ${serializeForInlineScript(JSON.stringify(content))},
          expectedOrigin
        );
        window.removeEventListener("message", receiveMessage, false);
      };
      window.addEventListener("message", receiveMessage, false);
      if (window.opener) window.opener.postMessage("authorizing:github", expectedOrigin);
    </script>
  </body>
</html>`;

module.exports = async function handler(req, res) {
  setOAuthResponseHeaders(res);

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).send("Method Not Allowed");
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const { code, state } = req.query;
  const cookies = parseCookies(req.headers.cookie);
  const expectedOrigin = getOAuthOrigin();
  const redirectUri = getOAuthRedirectUri();
  const nonce = crypto.randomBytes(18).toString("base64");

  res.setHeader(
    "Content-Security-Policy",
    `default-src 'none'; script-src 'nonce-${nonce}'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'`
  );

  if (!clientId || !clientSecret) {
    return res.status(500).send("GitHub authentication is unavailable");
  }
  if (!code || !state || state !== cookies.decap_oauth_state) {
    return res
      .status(401)
      .send(renderResult("error", { message: "Invalid OAuth state" }, expectedOrigin, nonce));
  }

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "GENIQ-Decap-CMS"
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri
      })
    });
    const result = await response.json();

    res.setHeader(
      "Set-Cookie",
      "decap_oauth_state=; Path=/api/callback; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
    );
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (!response.ok || result.error || !result.access_token) {
      return res.status(401).send(
        renderResult(
          "error",
          { message: "GitHub authorization failed" },
          expectedOrigin,
          nonce
        )
      );
    }

    return res.status(200).send(
      renderResult(
        "success",
        { token: result.access_token, provider: "github" },
        expectedOrigin,
        nonce
      )
    );
  } catch (_error) {
    return res.status(500).send(
      renderResult(
        "error",
        { message: "OAuth request failed" },
        expectedOrigin,
        nonce
      )
    );
  }
};
