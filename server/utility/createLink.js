import Token from '../models/Token.js';
import createJWT from './createJWT.js';

const createLink = async (userId, reason, jwt_exp) => {
  // Previous token remove
  await Token.findOneAndRemove({ userId, reason });

  // Create token
  const token = createJWT({ userId }, jwt_exp);

  // Sent token
  await Token.create({ userId, reason, token });

  // Send activation email
  return `${reason}/${token}`;
};

export default createLink;
