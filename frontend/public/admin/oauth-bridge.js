(() => {
  if (!("BroadcastChannel" in window)) return;

  const authorizationChannel = new BroadcastChannel("geniq-cms-oauth-v1");

  authorizationChannel.addEventListener("message", (event) => {
    const isAuthorizationMessage =
      typeof event.data === "string" &&
      (event.data === "authorizing:github" ||
        event.data.startsWith("authorization:github:"));

    if (!isAuthorizationMessage) {
      return;
    }

    window.postMessage(event.data, window.location.origin);
  });

  window.addEventListener(
    "beforeunload",
    () => authorizationChannel.close(),
    { once: true }
  );
})();
