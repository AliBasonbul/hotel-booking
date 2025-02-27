import { Request, Response } from "express";
import userService from "../services/userServices";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const token = await userService.authenticateUser(req.body);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  
}

export default new UserController();
