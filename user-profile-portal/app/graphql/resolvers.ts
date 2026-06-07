import { prisma } from "../lib/prisma";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../lib/auth";

export const resolvers = {
  Query: {
    students: async () => {
      return await prisma.student.findMany();
    },
  },

  Mutation: {
    signup: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return generateToken(user.id);
    },

    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const validPassword = await comparePassword(
        password,
        user.password
      );

      if (!validPassword) {
        throw new Error("Invalid password");
      }

      return generateToken(user.id);
    },
    addStudent: async (
  _: any,
  {
    name,
    age,
    department,
    email,
  }: {
    name: string;
    age: number;
    department: string;
    email: string;
  }
) => {
  return await prisma.student.create({
    data: {
      name,
      age,
      department,
      email,
    },
  });
},
updateStudent: async (
  _: any,
  {
    id,
    name,
    age,
    department,
    email,
  }: {
    id: string;
    name: string;
    age: number;
    department: string;
    email: string;
  }
) => {
  return await prisma.student.update({
    where: { id },
    data: {
      name,
      age,
      department,
      email,
    },
  });
},
deleteStudent: async (
  _: any,
  { id }: { id: string }
) => {
  await prisma.student.delete({
    where: { id },
  });

  return "Student deleted successfully";
},
  },
};