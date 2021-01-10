import express from "express";

import api from "./lib/api";
import cache from "./lib/cache";

const app = express();

app.get("/repositories/:username", async (req, res) => {
  const { username } = req.params;

  const cached = await cache.get(username);

  if (cached) {
    return res.json(cached);
  }

  const { data } = await api.get(`${username}/repos`);

  const response = data.map((repo) => {
    return {
      name: repo.name,
      fullname: repo.full_name,
    };
  });

  cache.set(username, response)

  return res.json(response);
});

export default app;
