import express from "express";
import conversationRoutes from "./routes/app.routes";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use("/", conversationRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
