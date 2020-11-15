const express = require("express");
const morgan = require("morgan");

const meetings = require("./src/router/meeting");

const cors = require("cors");


const MongoClient = require("mongodb").MongoClient;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//Cors Definition Options
const options = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "http://localhost:8000",
};

app.use(cors(options));

const PORT = process.env.PORT || 8000;

// ROUTE meeting
app.use("/meetings", meetings);

const uri = `mongodb+srv://indra:berhasil@cluster0.umzh2.mongodb.net/Cluster0?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  client.close();
});

// Error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: server start on ${PORT} `);
});
