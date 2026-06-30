const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./router/auth.router");
const pagesRouter = require("./router/pages.router");
const sectionsRouter = require("./router/sections.router");
const blocksRouter = require("./router/blocks.router");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({
    message: "ByteCH CMS API is running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/pages", pagesRouter);
app.use("/api/sections", sectionsRouter);
app.use("/api/blocks", blocksRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
