const PORT = 8000;
const cors = require("cors");
const express = require("express");
const app = express();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/teste", (request, response) => {
  response.send("Hello World!");
});

app.get("/listpost", async (request, response) => {
  try {
    const posts = await prisma.content.findMany();
    return response.json({
      error: false,
      posts,
    });
  } catch (error) {
    return response.json({ message: error.message });
  }
});

app.post("/create", async (request, response) => {
  try {
    const { title, subTitle } = request.body;

    const post = await prisma.content.create({
      data: {
        title,
        subTitle,
      },
    });

    if (!post) {
      return response.json({
        error: true,
        message: "Houve um erro",
      });
    }

    return response.json({
      error: false,
      post,
    });
  } catch (error) {
    return response.json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
