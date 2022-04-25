'use strict'

/**
 *  comment controller
 */

const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController('api::comment.comment', ({ strapi }) => ({
    async create (ctx) {
        // some logic here
        const response = await super.create(ctx)
        // some more logic

        const {
            nickName,
            email,
            content,
            avatar,
            replyId,
            titleEng,
            article
        } = ctx.request.body.data

        const promiseArr = [strapi.entityService.findOne('api::article.article', article.id)]
        if (replyId) {
            promiseArr.push(strapi.entityService.findOne('api::comment.comment', replyId))
        }
        const res = await Promise.all(promiseArr)
        const { title } = res[0]

        await strapi
            .plugin('email')
            .service('email')
            .send({
                to: replyId ? res[1].email : '925577835@qq.com',
                subject: `${title}评论回复提醒`,
                html: `${nickName}: ${content}`,
            })
        return response
    }
}))
