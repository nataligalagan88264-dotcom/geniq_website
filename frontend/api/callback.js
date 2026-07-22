const parseCookies = (header = "") =>
  Object.fromEntries(
    header
      .split(";")
      .map((item) => item.trim().split("="))
      .filter(([key, value]) => key && value)
  );

const renderResult = (status, content) => `<!doctype html>
<html lang="ru">
  <head><meta charset="utf-8"><title>GENIQ CMS</title></head>
  <body>
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          ${JSON.stringify(`authorization:github:${status}:`)} + ${JSON.stringify(JSON.stringify(content))},
          message.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      };
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
  </body>
</html>`;

module.exports = async function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const { code, state } = req.query;
  const cookies = parseCookies(req.headers.cookie);
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const redirectUri = `${protocol}://${host}/api/callback`;

  if (!clientId || !clientSecret) {
    return res.status(500).send("GitHub OAuth environment variables are not configured");
  }
  if (!code || !state || state !== cookies.decap_oauth_state) {
    return res.status(401).send(renderResult("error", { message: "Invalid OAuth state" }));
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
      "decap_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
    );
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (!response.ok || result.error || !result.access_token) {
      return res.status(401).send(renderResult("error", result));
    }

    return res.status(200).send(
      renderResult("success", {
        token: result.access_token,
        provider: "github"
      })
    );
  } catch (error) {
    return res.status(500).send(
      renderResult("error", { message: error.message || "OAuth request failed" })
    );
  }
};
