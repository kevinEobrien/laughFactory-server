require("dotenv").load();
const express = require("express");
const app = express();
const database = require("./database_connection");
const bodyParser = require("body-parser");
const queries = require("./queries");
const commqueries = require("./queries_comments");
const cors = require("cors");
const devMode = process.env.NODE_ENV !== "production";
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const multer = require("multer");

app.use(cors());
app.use(bodyParser.json());

const s3 = new aws.S3({
  apiVersion: "2006-03-01",
  region: "us-east-1",
  credentials: {
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID
  }
});
    
const upload = multer({
  storage: multerS3({
    s3,
    bucket: "tactbook",
    key: (request, file, next) => {
      next(null, `${Date.now()}_${file.originalname}`);
    }
  })
});

app.get("/upload", (request, response, next) => {
  response.json({
    message: "Testing out the upload route"
  });
});

app.post("/upload", upload.array("image", 1), (request, response) => {
  response.json({
    imgUrl: `${request.files[0].location}`
  });
});

app.get("/", (request, response, next) => {
  queries
    .list()
    .then(laughs => {
      response.json({ laughs });
    })
    .catch(next);
});
app.get("/comments", (request, response) => {
  database("comments")
    .select()
    .then(comments => {
      response.send({ comments });
    });
});

app.post("/", (request, response, next) => {
  console.log ("body is   ",request.body);
  queries
    .create(request.body)
    .then(laugh => {
      response.status(201).json({ laugh });
    })
    .catch(next);
});

app.post("/comments", (request, response, next) => {
  commqueries
    .create(request.body)
    .then(comment => {
      response.status(201).json({ comment });
    })
    .catch(next);
});

app.put("/:id", (request, response, next) => {
  database("laughs")
    .select("likes")
    .where("id", request.params.id)
    .then(currentLikes => queries.update(request.params.id, currentLikes[0].likes))
    .then(comment => {
      response.send(comment);
    })
    .catch(next);
});

app.delete("/:id", (request, response, next) => {
  queries
    .delete(request.params.id)
    .then(() => {
      response.sendStatus(200).json({ Message: "deleted" });
    })
    .catch(next);
});

app.delete("/comments/:id", (request, response, next) => {
  commqueries
    .delete(request.params.id)
    .then(() => {
      response.sendStatus(200).json({ Message: "deleted" });
    })
    .catch(next);
});

app.use(notFound);
app.use(errorHandler);

app
  .listen(process.env.PORT || 3000)
  .on("error", console.error.bind(console))
  .on("listening", console.log.bind(console, "Listening on " + (process.env.PORT || 3000)));

function notFound(req, res, next) {
  const url = req.originalUrl;
  if (!/favicon\.ico$/.test(url) && !/robots\.txt$/.test(url)) {
    console.error("[404: Requested file not found] ", url);
  }
  res.status(404).send({ error: "Url not found", status: 404, url });
}

function errorHandler(err, req, res, next) {
  console.error("ERROR", err);
  const stack = devMode ? err.stack : undefined;
  res.status(500).send({ error: err.message, stack, url: req.originalUrl });
}
