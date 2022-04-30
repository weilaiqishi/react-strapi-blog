module.exports = ({ env }) => ([
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'img-src': ['https:', 'http:'],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      header: '*',
      origin: ['http://localhost:8080', 'http://localhost:1337', env('URL_STRAPI_PROD', 'URL_STRAPI_PROD.com'), env('URL_BLOG_PROD', 'URL_BLOG_PROD.com')]
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
])
