import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

import { resolve } from "path";
import { normalizePath } from "vite";

import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
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
