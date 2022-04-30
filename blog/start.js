/* eslint-disable max-nested-callbacks */
// https://juejin.cn/post/6974171023025389576

const inquirer = require('inquirer')
const promiseExeca = import('execa')

async function run () {
  const execa = await promiseExeca
  inquirer.prompt([
    {
      type: 'rawlist',
      name: 'action',
      message: '选择动作-Select Action',
      default: 'webpack-dev-server',
      choices: ['webpack-dev-server', 'webpack build']
    }
  ]).then((res) => {
    const { action } = res
    inquirer
      .prompt([
        {
          type: 'rawlist',
          name: 'strapiHost',
          message: '选择strapi后端地址-Select Strapi Host',
          default: 'http://localhost:1337',
          choices: ['http://localhost:1337', 'https://strapi-1882446-1259550831.ap-shanghai.run.tcloudbase.com']
        }
      ])
      .then(({ strapiHost }) => {
        console.log(action, strapiHost)
        const actionMap = {
          'webpack-dev-server': 'cross-env NODE_ENV=development webpack-dev-server --config ./scripts/config/webpack.dev.js',
          'webpack build': 'cross-env NODE_ENV=production webpack --config ./scripts/config/webpack.prod.js'
        }
        process.env.baseUrl = strapiHost
        const commands = [`${actionMap[action]}`]
        commands.forEach(item => {
          execa.execaCommandSync(item, {
            stdio: 'inherit'
          })
        })

      })
  })
}

run()