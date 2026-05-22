const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const types = {
  ".html": "text/html; charset=utf-8",
  ".php": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8"
};

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const clean = path.normalize(pathname).replace(/^([/\\])+/, "");
  const file = path.join(root, clean || "index.html");

  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end("forbidden");
    return;
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "text/plain; charset=utf-8"
    });
    res.end(data);
  });
});

server.listen(4173, "127.0.0.1");
