//import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
//export default defineConfig({
  //plugins: [react()],
  //optimizeDeps: {
    //exclude: ['lucide-react'],
  //},
//});

import { defineConfig } from "vite";
//import react from "@vitejs/plugin-react-swc";
import path from "path";
//import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
plugins: [react()],
  optimizeDeps: {
  exclude: ['lucide-react'],
  },
}));

