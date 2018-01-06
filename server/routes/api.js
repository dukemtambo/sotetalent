import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.set("Content-Type", "application/json");
  res.send('{"message":"Hello from the sote talent server!"}');
});

export default router;
