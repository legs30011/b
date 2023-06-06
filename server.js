const bodyParser = require("body-parser");
var express = require("express"),
  cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
//const cors = require("cors");

const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: true,
  credentials: true,
};
app.options("*", cors(corsOptions)); // preflight OPTIONS; put before other routes

//log request
app.use(morgan("tiny"));
//mongodb conection
connectDB();

//parse request to body-parser
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:80" && "http://localhost:8100");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//set view engine
app.set("view engine", "ejs");
//app.set("views",path.resolve(__dirname,"views/ejs"))

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/imj")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

//load routers

app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
