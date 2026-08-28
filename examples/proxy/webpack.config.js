import express from "express";
// our setup function adds behind-the-scenes bits to the config that all of our
// examples need
import { setup } from "../util.js";

/**
 *
 */
function listenProxyServer() {
  const proxyApp = express();

  proxyApp.get("/proxy", (req, res) => {
    res.send("response from proxy");
  });

  return proxyApp.listen(0, "127.0.0.1");
}

let proxyServer;

export default setup(
  {
    context: import.meta.dirname,
    entry: "./app.js",
    devServer: {
      onListening: (devServer) => {
        proxyServer = listenProxyServer();
        devServer.server.once("close", () => {
          proxyServer.close();
          proxyServer.closeAllConnections();
        });
      },
      proxy: [
        {
          context: "/proxy",
          target: "http://127.0.0.1",
          router: () => {
            const address = proxyServer.address();
            return `http://127.0.0.1:${address.port}`;
          },
        },
      ],
    },
  },
  import.meta.url,
);
