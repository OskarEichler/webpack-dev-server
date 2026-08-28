# `app` Option

Serve using [`hono`](https://github.com/honojs/hono) as an application.

**webpack.config.js**

```js
import { createAdaptorServer } from "@hono/node-server";
import { Hono } from "hono";
import wdm from "webpack-dev-middleware";

export default {
  // ...
  devServer: {
    app: () => new Hono(),
    server: (_, app) => createAdaptorServer({ fetch: app.fetch }),
    setupMiddlewares: (_, devServer) => [
      { middleware: wdm.honoWrapper(devServer.compiler) },
    ],
  },
};
```

## What Should Happen

1. The script should open `http://localhost:8080/` in your default browser.
2. You should see the text on the page itself change to read `Success!`.
