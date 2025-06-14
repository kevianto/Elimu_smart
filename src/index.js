import express from "express";
import cors from "cors";
import ConnectToDB from "./config/db.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import PlanRoutes from "./routes/PlanRoutes.js";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(
  cors({
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/auth", AuthRoutes);
app.use("/plan", PlanRoutes);

app.listen(PORT, async () => {
  await ConnectToDB();
  console.log(`app running at http://localhost:${PORT}`);
});
