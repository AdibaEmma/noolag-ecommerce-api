export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  auth: {
    bcrypt: {
      saltOrRounds: parseInt(process.env.SALT_LEVEL),
    },
  },
});
