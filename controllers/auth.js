import User from '../modles/user';

export const signup = async (req, res, next) => {
  const credentials = req.body;
  console.log(credentials);
  let user;

  try {
    user = await User.create(credentials);
  } catch (e) {
    return next(e);
  }

  res.json(user);
}

export const signin = async (req, res, next) => {
  res.json('signin');
}