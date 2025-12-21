import { defineConfig } from 'vite';

export default defineConfig({
  // REPLACE 'repo-name' WITH YOUR ACTUAL REPOSITORY NAME
  base: '/WebLLMWithVoice/',
  server: {
    port: 3000,
    open: true,
    // These headers are required for SharedArrayBuffer support needed by WebGPU and WASM
    // Note: These strict CORS policies prevent embedding in iframes from different origins
    // For production deployments requiring iframe embedding, consider using a service worker
    // based approach or relaxing to 'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    }
  },
  optimizeDeps: {
    exclude: ['@mlc-ai/web-llm']
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          'transformers': ['@xenova/transformers'],
          'webllm': ['@mlc-ai/web-llm']
        }
      }
    }
  }
});
