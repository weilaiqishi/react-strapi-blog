module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '44c01ebec8e58243df1f6730adf22c19'),
  },
});
