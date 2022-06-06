"use strict";
const path = require("path");
const { defineConfig } = require("@vue/cli-service");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: "8888",
    open: false,
    proxy: {
      "/api": {
        target: "http://192.168.4.124:8150/",
        changOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  // http://192.168.4.124:8150/
  chainWebpack: (config) => {
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
  lintOnSave: false,
  productionSourceMap: true,
});
