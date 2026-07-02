const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./router/auth.routes");

const uploadRoutes = require("./router/upload.routes");
const cmsPages = require("./router/cmsPages.routes");
const contactRoutes = require("./router/contact.routes");
const notificationsRoutes = require("./router/notifications.routes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({
    message: "ByteCH CMS API is running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRoutes);
app.use("/api/cms-pages", cmsPages);
app.use("/api/contact", contactRoutes);
app.use("/api/notifications", notificationsRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
