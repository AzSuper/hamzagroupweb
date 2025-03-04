import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { UserData, UsersFile } from '@/types/users';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function addUser(email: string, password: string, role: string = 'admin'): Promise<UserData> {
  const hashedPassword = await hashPassword(password);
  const usersFilePath = path.join(process.cwd(), 'src/data/users.json');
  
  // Create directory if it doesn't exist
  const dir = path.dirname(usersFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Create or read users file
  let usersData: UsersFile = { users: [] };
  if (fs.existsSync(usersFilePath)) {
    const fileContent = fs.readFileSync(usersFilePath, 'utf8');
    usersData = JSON.parse(fileContent) as UsersFile;
  }
  
  // Check if user already exists
  const existingUser = usersData.users.find(user => user.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser: UserData = {
    id: String(usersData.users.length + 1),
    email,
    password: hashedPassword,
    role
  };
  
  usersData.users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));
  return newUser;
}

// Function to delete a user by email
export async function deleteUser(email: string): Promise<void> {
  const usersFilePath = path.join(process.cwd(), 'src/data/users.json');

  if (!fs.existsSync(usersFilePath)) {
    throw new Error('Users file does not exist');
  }

  const fileContent = fs.readFileSync(usersFilePath, 'utf8');
  let usersData: UsersFile = JSON.parse(fileContent);

  const userIndex = usersData.users.findIndex(user => user.email === email);
  if (userIndex === -1) {
    throw new Error('User not found');
  }

  // Remove the user
  usersData.users.splice(userIndex, 1);
  fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));
  console.log(`User with email ${email} deleted successfully.`);
}

// Function to get user data by email
export function getUserData(email: string): UserData | undefined {
  const usersFilePath = path.join(process.cwd(), 'src/data/users.json');

  if (!fs.existsSync(usersFilePath)) {
    throw new Error('Users file does not exist');
  }

  const fileContent = fs.readFileSync(usersFilePath, 'utf8');
  const usersData: UsersFile = JSON.parse(fileContent);

  const user = usersData.users.find(user => user.email === email);
  if (!user) {
    throw new Error('User not found');
  }

  return user;
}
