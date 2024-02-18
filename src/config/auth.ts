export const auth = {
  secretKey: process.env.SECRET_KEY || "secret",
  expiresIn: process.env.EXPRES_IN || "1d",
};
