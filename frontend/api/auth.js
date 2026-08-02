const crypto = require("crypto");
const {
  getOAuthRedirectUri,
  setOAuthResponseHeaders,
} = require("../lib/oauth-security");

module.exports = function handler(req, res) {
  setOAuthResponseHeaders(res);

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).send("Method Not Allowed");
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return res.status(500).send("GitHub authentication is unavailable");
  }

  const state = crypto.randomBytes(24).toString("hex");
  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");

  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", getOAuthRedirectUri());
  authorizeUrl.searchParams.set("scope", "public_repo");
  authorizeUrl.searchParams.set("state", state);

  res.setHeader(
    "Set-Cookie",
    `decap_oauth_state=${state}; Path=/api/callback; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
  );
  res.redirect(302, authorizeUrl.toString());
};
