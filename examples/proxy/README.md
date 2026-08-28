# proxy

Proxying some URLs can be useful when you have a separate API backend development server and you want to send API requests on the same domain.

**webpack.config.js**

```js
module.exports = {
  // ...
  devServer: {
    proxy: [
      {
        context: "/proxy",
        target: "http://localhost:5000",
      },
    ],
  },
};
```

To run this example use the following command:

```console
npx webpack serve --open
```

## What Should Happen

1. The script starts a backend on an available loopback port and opens `http://localhost:8080/` in your default browser. The example's `router` function directs proxy requests to that backend, avoiding conflicts with services already using port 5000.
2. You should see the text on the page itself change to read `Success! Now visit /proxy`.
3. Now visit the `/proxy` route by clicking on the `/proxy` text, you should see the text on the page itself change to read `response from proxy`.
