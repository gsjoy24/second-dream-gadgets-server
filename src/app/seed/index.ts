import bcrypt from 'bcrypt';
import config from '../config';
import { User } from '../modules/Auth/Auth.model';

const seedSuperAdmin = async () => {
  const password = await bcrypt.hash(
    'AdminPr0',
    Number(config.bcrypt_salt_round),
  );
  const adminData = {
    name: 'super admin',
    email: 'admin@example.com',
    password,
    role: 'admin',
  };
  // check if the user exists
  const isUserExits = await User.isUserExists(adminData.email);
  if (!isUserExits) {
    await User.create(adminData);
    return;
  }
};

export default seedSuperAdmin;
