import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/google-maps-panel/', // must match your GitHub repo name
  plugins: [react()]
});
