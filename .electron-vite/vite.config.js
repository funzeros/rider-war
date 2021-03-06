const { join } = require("path");
const vuePlugin = require("@vitejs/plugin-vue");
const { defineConfig } = require("vite");
const userConfig = require("../config");
const IsWeb = process.env.BUILD_TARGET === "web";

function resolve(dir) {
  return join(__dirname, "..", dir);
}

const root = resolve("src/renderer");

const config = defineConfig({
  mode: process.env.NODE_ENV,
  root,
  define: {
    "process.env":
      process.env.NODE_ENV === "production"
        ? userConfig.build.env
        : userConfig.dev.env,
    "process.env.IS_WEB": IsWeb,
  },
  resolve: {
    alias: {
      "@renderer": root,
    },
  },
  base: "./",
  build: {
    outDir: IsWeb ? resolve("dist/wepb") : resolve("dist/electron/renderer"),
    emptyOutDir: true,
  },
  plugins: [vuePlugin()],
  optimizeDeps: {
    include: ["axios", "md5", "vue", "animejs"],
  },
  publicDir: resolve("static"),
});

module.exports = config;
