'use strict';

/**
 * pageview service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pageview.pageview');
