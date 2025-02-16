import { Router, type Request, type Response } from "express"
import { UserModel } from "../models/user"

const router = Router()

router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.getAll()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

router.post("/", async (req: Request, res: Response) => {
  try {
    const userId = await UserModel.create(req.body)
    res.status(201).json({ usuario: userId })
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

export default router

