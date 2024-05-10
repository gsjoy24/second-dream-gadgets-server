import config from '../config';
import User from '../modules/User/user.model';

const seedSuperAdmin = async () => {
  const adminData = {
    name: 'super admin',
    email: config.super_admin_email,
    password: config.super_admin_password,
    role: 'admin',
  };

  // check if the user exists
  const isUserExits = await User.isUserExists(adminData.email as string);
  if (!isUserExits) {
    await User.create(adminData);
    return;
  }
};

export default seedSuperAdmin;
