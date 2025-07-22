export default () => ({
  jwt_secret: process.env.JWT_SECRET,
  refresh_jwt_secret: process.env.REFRESH_JWT_SECRET,
});
