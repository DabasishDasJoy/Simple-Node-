const express = require("express");
const app = express();
const cors = require("cors");

const { MongoClient, ServerApiVersion } = require("mongodb");
app.use(cors());

app.use(express.json());

const port = process.env.PORT || 5000;

const users = [
  {
    name: "Dabsaish",
    email: "dab@gmail.com",
  },
  {
    name: "Joy",
    email: "joy@gmail.com",
  },
  {
    name: "pritu",
    email: "pritu@gmail.com",
  },

  {
    name: "shuvo",
    email: "shuvo@gmail.com",
  },
];

app.get("/", (req, res) => {
  res.send("App is running");
});

app.listen(port, () => {
  console.log("App is listening to the", port);
});

/* 
 userName : dbUser1
 password: 6qcJkzJxc5pHEUkp

*/

const uri =
  "mongodb+srv://dbUser1:6qcJkzJxc5pHEUkp@cluster0.mj0nqa8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const collections = client.db("simpleNode").collection("users");

    // const result = await collection.insertOne(user);

    app.get("/users", async (req, res) => {
      const cursor = collections.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await collections.insertOne(newUser);
      res.send(newUser);
      console.log(newUser);
    });
  } finally {
  }
}

run().catch(console.dir);
