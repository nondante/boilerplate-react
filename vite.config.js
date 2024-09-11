import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

function stringToBoolean(str) {
  return str.toLowerCase() === "true";
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: env.PORT, // specify the port number you want
    },
    envPrefix: ["VITE_", "CLIENT_"],
    build: {
      // dont minify for debug builds
      minify: stringToBoolean(env.DEBUG) ? false : "esbuild",
      // produce sourcemaps for debug builds
      sourcemap: stringToBoolean(env.DEBUG),
    },
  };
});
