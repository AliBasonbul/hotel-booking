import prisma from "../config/db";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config/config";

class UserService {
  async authenticateUser({ email, password }: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid email or password");

    if (!config.jwtSecret) {
      throw new Error("JWT Secret is not defined in the environment variables");
    }

    const signOptions: SignOptions = {
        expiresIn: config.jwtExpiration as any 
    };

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwtSecret,
      signOptions
    );

    return { token };
  }

  async createUser({ name, email, password }: { name: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  }

}

export default new UserService();
