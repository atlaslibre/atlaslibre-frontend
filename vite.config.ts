import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

import { resolve } from "path";
import { normalizePath } from "vite";

import tailwindcss from '@tailwindcss/vite'

import packageConfig from "./package.json";
import * as child from "child_process";

const commitHash = child.execSync("git rev-parse --short HEAD").toString();
const commitDate = child.execSync("git --no-pager log -1 --format='%ai'").toString();

// https://vite.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(packageConfig.version),
    __COMMIT_HASH__: JSON.stringify(commitHash),
    __COMMIT_DATE__: JSON.stringify(commitDate),
  },
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(resolve(__dirname, "./extension/**")),
          dest: "./",
        },
      ],
    }),
  ],
});
