import { Router } from "express";
import Github from './lib/github';

const router = Router();

router.get("/repositories/:username", async (req, res) => {
  const result = await Github.getRepositories(req.params.username)
  return res.json(result)
});

router.get("/userinfo/:username", async (req, res) => {
  const result = await Github.getUserInfo(req.params.username)
  return res.json(result)
})

export default router;
