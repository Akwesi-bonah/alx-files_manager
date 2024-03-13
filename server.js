import router from "./routes/index";

const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
const env = process.env.npm_lifecycle_event || "dev";

router(app);
app.use(express.json({ limit: "200mb" }));
app.listen(port, () => {
  console.log(`[${env}] API has started listening at port:${port}`);
});
