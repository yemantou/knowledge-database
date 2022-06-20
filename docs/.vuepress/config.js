const webpack = require('webpack')

module.exports = {
  title: '胖虎拽的知识库',
  host: 'localhost',
  description: '个人知识沉淀平台',
  port: 8090,
  base: '/knowledge-database/',
  themeConfig: {
    searchPlaceholder: '输入进行搜索',
    subSidebar: 'auto',
    nav: [
      {
        text: '文档指南',
        link: '/guide/'
      },
      { 
        text: '自动构建',
        link: '/auto-build/'
      },
      {
        text: '前端学习',
        items: [
          {
            text: 'JS',
            link: '/web-learning/js/',
          },
          {
            text: 'CSS',
            link: '/web-learning/css/',
          }
        ]
      },
      { 
        text: 'GitHub',
        link: 'https://github.com/yemantou/knowledge-database'
      },
    ]
  },
  plugins: [
    [
      'vuepress-plugin-auto-sidebar',
      {
        sort: {
          readmeFirstForce: true
        },
        title: {
          mode: 'titlecase',
          map: {
            '/guide/': '指南 🤖',
            '/auto-build/': '自动构建 🐭',
            '/web-learning/css/': 'CSS 🙂',
            '/web-learning/js/': 'JS 🙃'
          }
        }
      }
    ]
  ],
  configureWebpack: {
    node: {
      global: true,
      process: true
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser'
      })
    ]
  },
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  }
}