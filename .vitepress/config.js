import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Empostor',
  description: 'Among Us Private Server Documentation',

  base: '/',

  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Empostor Tool', link: 'https://empostor.github.io/Empostor' },
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
            text: 'API Reference',
            items: [
              { text: 'Server Monitoring', link: '/Server-monitoring' },
              { text: 'Privacy Policy API', link: '/Privacy-api' },
              { text: 'Game Listing API', link: '/Game-api' }
            ]
          },
          {
            text: 'Plugins',
            items: [
              { text: 'Boot.Codes', link: '/Boot-code' },
              { text: 'Message (Leave a Message)', link: '/Message-plugin' },
              { text: 'Player Channel', link: '/Player-channel-plugin' },
              { text: 'Chat Manager', link: '/Chat-plugin' }
            ]
          },
          {
            text: 'Development',
            items: [
              { text: 'Writing a Plugin', link: '/Writing-a-plugin' },
              { text: 'Hello Page', link: '/Hello-page' },
              { text: 'About', link: '/About' }
            ]
          }
        ],

        socialLinks: [
          { icon: 'github', link: 'https://github.com/Empostor/Empostor' }
        ],

        footer: {
          message: '<a href="https://dsc.gg/empostor" target="_blank">Discord</a> | <a href="https://qm.qq.com/q/GeX3Q0Ft0k" target="_blank">QQ 群</a> | <a href="https://github.com/Empostor/Empostor" target="_blank">GitHub</a>',
          copyright: 'Empostor ©2026'
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: 'Empostor Tool', link: 'https://empostor.github.io/Empostor' },
          { text: 'GitHub', link: 'https://github.com/Empostor/Empostor' }
        ],

        sidebar: [
          {
            text: '入门指南',
            items: [
              { text: '运行服务器', link: '/zh/Running-the-server' },
              { text: '服务器配置', link: '/zh/Server-configuration' },
              { text: '从源码构建', link: '/zh/Building-from-source' },
              { text: 'HTTP 服务器 (反向代理)', link: '/zh/Http-server' },
              { text: '升级指南', link: '/zh/Upgrading' },
              { text: '常见问题', link: '/zh/FAQ' },
              { text: '故障排除', link: '/zh/TROUBLESHOOTING' }
            ]
          },
          {
            text: '功能特性',
            items: [
              { text: '管理面板', link: '/zh/Admin-panel' },
              { text: '聊天过滤', link: '/zh/Chat-filtering' },
              { text: 'Discord 通知', link: '/zh/Discord-webhook' },
              { text: '玩家统计', link: '/zh/Player-statistics' },
              { text: '插件市场', link: '/zh/Plugin-marketplace' }
            ]
          },
          {
            text: 'API 参考',
            items: [
              { text: '服务器监控', link: '/zh/Server-monitoring' },
              { text: '隐私政策 API', link: '/zh/Privacy-api' },
              { text: '游戏列表 API', link: '/zh/Game-api' }
            ]
          },
          {
            text: '插件',
            items: [
              { text: 'Boot.Codes', link: '/zh/Boot-code' },
              { text: '留言系统', link: '/zh/Message-plugin' },
              { text: '玩家频道', link: '/zh/Player-channel-plugin' },
              { text: '聊天管理', link: '/zh/Chat-plugin' }
            ]
          },
          {
            text: '开发',
            items: [
              { text: '编写插件', link: '/zh/Writing-a-plugin' },
              { text: 'Hello 页面', link: '/zh/Hello-page' },
              { text: '关于项目', link: '/zh/About' }
            ]
          }
        ],

        socialLinks: [
          { icon: 'github', link: 'https://github.com/Empostor/Empostor' }
        ],

        footer: {
          message: '<a href="https://dsc.gg/empostor" target="_blank">Discord</a> | <a href="https://qm.qq.com/q/GeX3Q0Ft0k" target="_blank">QQ 群</a> | <a href="https://github.com/Empostor/Empostor" target="_blank">GitHub</a>',
          copyright: 'Empostor ©2026'
        }
      }
    }
  },

  themeConfig: {
    search: {
      provider: 'local'
    }
  }
})
