'use strict'

/**
 * pageview router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories

module.exports = {
    routes: [
        { // Path defined with a URL parameter
            method: 'POST',
            path: '/pageview/count',
            handler: 'pageview.count',
            config: {
                auth: false,
            },
        }
    ]
}