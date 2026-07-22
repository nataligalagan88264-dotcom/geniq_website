from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse


ROOT = Path(__file__).resolve().parent / "build"


class SpaHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        url_path = unquote(urlparse(path).path).lstrip("/")
        requested = (ROOT / url_path).resolve()
        if requested.is_file():
            return str(requested)
        if requested.is_dir() and (requested / "index.html").is_file():
            return str(requested / "index.html")
        return str(ROOT / "index.html")


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 4174), SpaHandler)
    print(f"Serving {ROOT} at http://localhost:4174/")
    server.serve_forever()
