const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./router/auth.routes");
const pagesRouter = require("./router/pages.routes");
const sectionsRouter = require("./router/pageSections.routes");
const blocksRouter = require("./router/blocks.routes");
const uploadRoutes = require("./router/upload.routes");

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
app.use("/api/page-sections", sectionsRouter);
app.use("/api/blocks", blocksRouter);
app.use("/api/upload", uploadRoutes);
app.use("/api/cms-pages", require("./router/cmsPages.routes"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
