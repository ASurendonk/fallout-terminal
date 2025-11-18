import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const root = resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "components": resolve(root, "components"),
      "helpers": resolve(root, "helpers"),
      "store": resolve(root, "store"),
      "assets": resolve(root, "assets"),
      "types": resolve(root, "types"),
      "hooks": resolve(root, "hooks"),
    }
  }
})
