const { auth } = require("../utils/firebase");

const registerUser = async (email, password) => {
  const user = await auth.createUser({
    email,
    password,
  });
  return user;
};

const loginUser = async (email, password) => {
  const user = await auth.getUserByEmail(email);
  if (user) {
    return user;
  }
  throw new Error("User not found");
};

module.exports = {
  registerUser,
  loginUser,
};
