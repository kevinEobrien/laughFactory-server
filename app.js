require("dotenv").load();
const express = require("express");
const app = express();
const database = require("./database_connection");
const bodyParser = require("body-parser");
const queries = require("./queries");
const commqueries = require("./queries_comments");
const cors = require("cors");
const devMode = process.env.NODE_ENV !== "production";

app.use(cors());
app.use(bodyParser.json());

app.get("/", (request, response) => {
  queries
    .list()
    .then(laughs => {
      response.json({ laughs });
    })
    .catch(console.error);
});
app.get("/comments", (request, response) => {
  database("comments")
    .select()
    .then(comments => {
      response.send({ comments });
    });
});

app.post("/", (request, response, next) => {
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
