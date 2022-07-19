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
      // {
      //   text: '文档指南',
      //   link: '/guide/'
      // },
      // { 
      //   text: '自动构建',
      //   link: '/auto-build/'
      // },
      {
        text: '前端学习',
        items: [
          {
            text: 'JS',
            link: '/web-learning/js/'
          },
          {
            text: 'CSS',
            link: '/web-learning/css/'
          },
          {
            text: 'Vue',
            link: '/web-learning/vue/'
          }
        ]
      },
      {
        text: '计算机基础知识',
        items: [
          {
            text: '计算机网络',
            link: '/basic-knowledge/computer-networks/'
          },
          {
            text: '数据结构',
            link: '/basic-knowledge/data-structure/'
          },
          {
            text: '算法',
            link: '/basic-knowledge/algorithm/'
          }
        ]
      },
      { 
        text: '笔记',
        items: [
          {
            text: '读书笔记',
            link: '/note/book/'
          },
          {
            text: '前端学习笔记',
            link: '/note/web/'
          },
          {
            text: '后端学习笔记',
            link: '/note/backend/'
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
    resolve: {
      alias: {
        '@assets': '/docs/.vuepress/assets'
      }
    },
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