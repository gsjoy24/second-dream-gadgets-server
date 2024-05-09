import { TUser } from './user.interface';
import User from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.create({ ...payload, role: 'user' });
  return user;
};

const createAdminAndManagerIntoDB = async (payload: TUser) => {
  const user = await User.create(payload);
  return user;
};

const UserServices = {
  createUserIntoDB,
  createAdminAndManagerIntoDB,
};

export default UserServices;
