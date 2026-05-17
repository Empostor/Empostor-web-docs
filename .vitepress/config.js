import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Empostor',
  description: 'Among Us Private Server Documentation',

  // Clean URLs without .html extension
  cleanUrls: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Impostor Tool', link: '/impostor/' },
      { text: 'GitHub', link: 'https://github.com/Empostor/Empostor' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Running the Server', link: '/Running-the-server' },
          { text: 'Server Configuration', link: '/Server-configuration' },
          { text: 'Building from Source', link: '/Building-from-source' },
          { text: 'HTTP Server (Reverse Proxy)', link: '/Http-server' },
          { text: 'Upgrading', link: '/Upgrading' },
          { text: 'FAQ', link: '/FAQ' },
          { text: 'Troubleshooting', link: '/TROUBLESHOOTING' }
        ]
      },
      {
        text: 'Features',
        items: [
          { text: 'Admin Panel', link: '/Admin-panel' },
          { text: 'Chat Filtering', link: '/Chat-filtering' },
          { text: 'Discord Webhook', link: '/Discord-webhook' },
          { text: 'Player Statistics', link: '/Player-statistics' },
          { text: 'Plugin Marketplace', link: '/Plugin-marketplace' }
        ]
      },
      {
        text: 'Development',
        items: [
          { text: 'Writing a Plugin', link: '/Writing-a-plugin' },
          { text: 'Hello Page', link: '/Hello-page' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Empostor/Empostor' }
    ],

    footer: {
      message: 'Empostor — An Among Us private server implementation',
      copyright: 'Licensed under GPL-3.0'
    },

    search: {
      provider: 'local'
    }
  }
})
