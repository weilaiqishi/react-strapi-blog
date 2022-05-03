# REACT-STRAPI-BLOG

一个博客系统

我的博客地址<https://miku01.cn/Blog/index.html>

前端修改自[飞鸟小站](https://github.com/lzxjack/react-blog),使用 `React` + `Mobx` + `Ant Design` 开发

后端使用Node.js 服务端框架 [strapi v4](https://github.com/strapi/strapi) 开发

![请多多star](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUtDe8bJD9qRSq1XDbUMZ1T5D7okvEwdPjTQ&usqp=CAU)

## strapi介绍

![strapi admin](https://raw.githubusercontent.com/strapi/strapi/0bcebf77b37182fe021cb59cc19be8f5db4a18ac/public/assets/administration_panel.png)

![strapi-contentTypeBuild-article](https://cdn.jsdelivr.net/gh/weilaiqishi/mymarkdownpicture/react-strapi-blog/strapi-contentTypeBuild-article.png)
![strapi-contentTypeBuild-article-field](https://cdn.jsdelivr.net/gh/weilaiqishi/mymarkdownpicture/react-strapi-blog/strapi-contentTypeBuild-article-field.png)

Strapi 是一款免费的开源无头 CMS

- **现代管理面板：** 自带一个优雅、完全可定制且完全可扩展的管理面板。在后台中可以进行可视化数据库建表并进行内容管理。
- **默认安全：** 可重用策略、CORS、CSP、P3P、Xframe、XSS 等。
- **面向插件：** 在几秒钟内安装身份验证系统、内容管理、自定义插件等。
- **快速：**建立在 Node.js 之上，Strapi 提供了惊人的性能。
- **强大的 CLI：** 动态的脚手架项目和 API。
- **SQL 数据库：** 适用于 PostgreSQL、MySQL、MariaDB 和 SQLite。

大佬的介绍<https://www.zhihu.com/question/446613186/answer/1819375500>

## 使用本项目

### 前置准备

- MySQL数据库，图方便的话可以购买[腾讯云轻量数据库服务](https://buy.cloud.tencent.com/lighthousedb)
- [阿里云OSS](https://oss.console.aliyun.com/overview)，用于图片视频上传
- 开通SMTP的邮箱，用于留言板评论回复邮件提醒

### 启动strapi后端

1. env配置准备。进入backend目录，复制 `.env.example` 到 新文件 `.env`
**第一部分**是 [strapi管理面板配置](./backend/config/admin.js)
[指南](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/admin-panel.html#available-options)
APP_KEYS=随机字符串
JWT_SECRET=字符串 someSecretKey
API_TOKEN_SALT=随机字符串 someRandomLongString
**第二部分**是 [MySql 配置](./backend/config/database.js)
DATABASE_HOST=数据库域名（需要确保数据库参数 `character_set_server` 为 utf8mb4）
DATABASE_PORT=数据库端口
DATABASE_NAME=给 strapi 用的DATABASE（需要提前创建，并且默认字符集要为 utf8mb4。如果没有合适的可视化工具管理数据库，这里推荐 使用vscode 插件 MySQL (作者是cweijan)）
**第三部分**是 [阿里云OSS 配置](./backend/config/plugin.js)
**第四部分**是 [邮箱SMTP 配置](./backend/config/plugin.js)
**第五部分**是 [CORS 配置](./backend/config/middlewares.js)，可以在部署上线确定地址后再配置
URL_STRAPI_PROD=线上strapi地址
URL_BLOG_PROD=线上博客前端地址

2. 依赖安装。执行命令 `yarn` （部分库安装容易失败，最好使用VPN）

3. dev环境启动。执行命令 `npm run develop` or `yarn run develop`
访问<http://localhost:1337/admin>，首次进入需要创建账号
![admin](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcb7dc1acf5b433f82705e0215d303ce~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

4. 本项目使用一遍文章作为留言板，所以需要建一个titleEng为 `message board` 的文章
![strapi-article-messageBoard](https://cdn.jsdelivr.net/gh/weilaiqishi/mymarkdownpicture/react-strapi-blog/strapi-article-messageBoard.png)
其他内容管理
![strapi-content-introduce](https://cdn.jsdelivr.net/gh/weilaiqishi/mymarkdownpicture/react-strapi-blog/strapi-content-introduce.png)

5. 权限配置
![strapi-role](https://cdn.jsdelivr.net/gh/weilaiqishi/mymarkdownpicture/react-strapi-blog/strapi-role.png)
![strapi-role-article](https://cdn.jsdelivr.net/gh/weilaiqishi/mymarkdownpicture/react-strapi-blog/strapi-role-article.png)
![strapi-role-category](https://cdn.jsdelivr.net/gh/weilaiqishi/mymarkdownpicture/react-strapi-blog/strapi-role-category.png)
![strapi-role-comment](https://cdn.jsdelivr.net/gh/weilaiqishi/mymarkdownpicture/react-strapi-blog/strapi-role-comment.png)
![strapi-role-gallery](https://cdn.jsdelivr.net/gh/weilaiqishi/mymarkdownpicture/react-strapi-blog/strapi-role-gallery.png)
![strapi-role-img](https://cdn.jsdelivr.net/gh/weilaiqishi/mymarkdownpicture/react-strapi-blog/strapi-role-img.png)
![strapi-role-notice](https://cdn.jsdelivr.net/gh/weilaiqishi/mymarkdownpicture/react-strapi-blog/strapi-role-notice.png)
![strapi-role-site](https://cdn.jsdelivr.net/gh/weilaiqishi/mymarkdownpicture/react-strapi-blog/strapi-role-site.png)
![strapi-role-tag](https://cdn.jsdelivr.net/gh/weilaiqishi/mymarkdownpicture/react-strapi-blog/strapi-role-tag.png)

### 启动前端

1. 全局安装rush。执行命令 `npm install -g @microsoft/rush`。
本项目[参考教程](https://juejin.cn/post/7034475702309093407)使用rush去做monorepo，但是在strapi项目上运行不顺利，遂只管理了前端项目。

2. 依赖安装。进入blog目录，执行命令 `rush update`。

3. 启动项目。执行命令 `npm run start`。

4. 按需调整配置
[页面配置](./blog/src/utils/constant.ts)
[后端api地址](./blog/start.js)

### 部署strapi

推荐使用docker部署strapi后端项目
参考资料[docker-with-strapi-v4](https://blog.dehlin.dev/docker-with-strapi-v4)

可以使用[腾讯云云托管](https://console.cloud.tencent.com/tcb/service?rid=4)，进入backend项目执行命令 `npm run compress` （需要提前全局安装 `ts-node`） 在CD目录获得 `backend.zip`
在腾讯云云托管中先创建按量计费环境![strapi-deploy-createServer](https://cdn.jsdelivr.net/gh/weilaiqishi/mymarkdownpicture/react-strapi-blog/strapi-deploy-createServer.png)
再新建版本，上传zip包按下图配置并点击开始部署，即获得一个可用https访问的服务端
![strapi-deploy](https://cdn.jsdelivr.net/gh/weilaiqishi/mymarkdownpicture/react-strapi-blog/strapi-deploy.png)
