import bcrypt from 'bcryptjs';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  verified: boolean;
}

// Create a fixed admin user with a known password
const hashedPassword = bcrypt.hashSync("889966554477@hamza", 10);

export const adminUsers: AdminUser[] = [
  {
    id: 1,
    name: "Admin",
    email: "hamzagroup145@gmail.com",
    password: hashedPassword,
    role: "admin",
    verified: true,
  },
];

// Helper function to verify user
export const verifyUser = async (email: string, password: string) => {
  const user = adminUsers.find(u => u.email === email);
  if (!user) {
    console.log('User not found:', email);
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  console.log('Password validation:', isValid);
  
  if (!isValid) {
    return null;
  }

  return user;
};