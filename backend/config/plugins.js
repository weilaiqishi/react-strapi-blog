module.exports = ({ env }) => ({
    //
    graphql: {
        config: {
            endpoint: '/graphql',
            shadowCRUD: true,
            playgroundAlways: false,
            depthLimit: 7,
            amountLimit: 100,
            apolloServer: {
                tracing: false,
            },
        },
    },
    upload: {
        config: {
            provider: 'strapi-provider-upload-oss',
            providerOptions: {
                accessKeyId: env('OSS_ACCESS_KEY_ID'),
                accessKeySecret: env('OSS_ACCESS_KEY_SECRET'),
                region: env('OSS_REGION'),
                bucket: env('OSS_BUCKET'),
                uploadPath: env('OSS_BASE_DIR'),
                baseUrl: env('OSS_BASE_URL'),
                autoThumb: 'no',
                timeout: 3600,
            }
        },
    },
})
