import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['poludoro.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'Poludoro Pomodoro Zamanlayıcı',
        short_name: 'Poludoro',
        description: 'Odaklanmak ve ders çalışmak için minimalist Pomodoro zamanlayıcı.',
        theme_color: '#1E293B',
        background_color: '#1E293B',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
