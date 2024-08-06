import { spawn } from "child_process";
import { MongoClient, ObjectId } from "mongodb";
import { Request, Response } from "express";
const uri =
  "mongodb+srv://amos1:amo11063@cluster0.mn9t1br.mongodb.net/bc-labs?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
let db: any;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db("llm_conversations");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1);
  }
}

connectToDatabase();

export class ConversationController {
  static async query(req: Request, res: Response) {
    const { model, question } = req.body;

    const pythonProcess = spawn("python", ["main.py"]);

    pythonProcess.stdin.write(`${model}\n`);
    pythonProcess.stdin.write(`${question}\n`);
    pythonProcess.stdin.end();

    let response = "";
    pythonProcess.stdout.on("data", (data) => {
      response += data.toString();
    });

    pythonProcess.on("close", async (code) => {
      if (code === 0) {
        try {
          const result = await db.collection("conversations").insertOne({
            model,
            question,
            response,
            createdAt: new Date(),
          });
          res.json({ response, id: result.insertedId });
        } catch (error) {
          console.error("Error saving to database", error);
          res.status(500).json({ error: "Database error" });
        }
      } else {
        res.status(500).json({ error: "Python script execution failed" });
      }
    });
  }

  static async getConversations(req: Request, res: Response) {
    try {
      const conversations = await db
        .collection("conversations")
        .find()
        .sort({ createdAt: -1 })
        .toArray();
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations", error);
      res.status(500).json({ error: "Database error" });
    }
  }

  static async getConversationById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const conversation = await db
        .collection("conversations")
        .findOne({ _id: new ObjectId(id) });
      if (conversation) {
        res.json(conversation);
      } else {
        res.status(404).json({ error: "Conversation not found" });
      }
    } catch (error) {
      console.error("Error fetching conversation", error);
      res.status(500).json({ error: "Database error" });
    }
  }
}
