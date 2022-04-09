'use strict'

/**
 *  pageview controller
 */

const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController('api::pageview.pageview', ({ strapi }) => ({
    async count (ctx) {
        //    // 事务
        //    const knex = strapi.db.connection
        //    await knex.transaction(async trx => {
        //      // 减库存
        //      await strapi.db.queryBuilder('api::lucky-item.lucky-item').getKnexQuery()
        //        .where({ id: endGood.id }).increment({ stock: 1 }).transacting(trx)
        //      // 减抽奖次数
        //      await strapi.db.queryBuilder('api::lucky-user.lucky-user').getKnexQuery()
        //        .where({ id: luckyUser.id }).decrement({ ['lucky_user_count']: 1 }).transacting(trx)
        //      // 生成抽奖记录
        //      await strapi.db.queryBuilder('api::lucky-record.lucky-record').getKnexQuery()
        //        .insert(luckyRecord).transacting(trx)
        //    })

        await strapi.db.queryBuilder('api::pageview.pageview').getKnexQuery()
            .where({ id: 1 }).increment({ num: 1 })

        const entity = await strapi.service('api::pageview.pageview').find()
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx)
        return this.transformResponse(sanitizedEntity)
    }
}))
