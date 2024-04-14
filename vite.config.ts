import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import CONFIG from './gitprofile.config';
import { createHtmlPlugin } from 'vite-plugin-html';

CONFIG.clarity.id = process.env.CLARITY_ID
  ? process.env.CLARITY_ID
  : CONFIG.clarity.id;
// https://vitejs.dev/config/
export default defineConfig({
  base: CONFIG.base || '/',
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          metaTitle: CONFIG.seo.title,
          metaDescription: CONFIG.seo.description,
          metaImageURL: CONFIG.seo.imageURL,
          schemaScript: `<script type="application/ld+json">` +
            JSON.stringify(CONFIG.seo.schema)+
            `</script>`,
          clarityScript: `<!-- Clarity tracking code for https://sorkhpar.dev/ -->
                          <script>    (function(c, l, a, r, i, t, y) {
                            c[a] = c[a] || function() {
                              (c[a].q = c[a].q || []).push(arguments);
                            };
                            t = l.createElement(r);
                            t.async = 1;
                            t.src = 'https://www.clarity.ms/tag/' + i + '?ref=bwt';
                            y = l.getElementsByTagName(r)[0];
                            y.parentNode.insertBefore(t, y);
                          })(window, document, 'clarity', 'script', '` + CONFIG.clarity.id + `');</script>`,
        },
      },
    }),
    ...(CONFIG.enablePWA
      ? [
          VitePWA({
            registerType: 'autoUpdate',
            workbox: {
              navigateFallback: undefined,
            },
            includeAssets: ['logo.png'],
            manifest: {
              name: 'Portfolio',
              short_name: 'Portfolio',
              description: 'Personal Portfolio',
              icons: [
                {
                  src: 'logo.png',
                  sizes: '64x64 32x32 24x24 16x16 192x192 512x512',
                  type: 'image/png',
                },
              ],
            },
          }),
        ]
      : []),
  ],
  define: {
    CONFIG: CONFIG,
  },
});
