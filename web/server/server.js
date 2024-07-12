const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const dbConnection = require("./config/dbConnection");
const cron = require("./jobs/saleGameCron");
dbConnection();
cron();
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routes/authRoute");
const gameRouter = require("./routes/gameRoute");
const genreRouter = require("./routes/genreRoute");
const featureRouter = require("./routes/featureRoute");
const cartRouter = require("./routes/cartRoute");
const wishlistRouter = require("./routes/wishlistRoute");
const transactionRouter = require("./routes/transactionRoute");
const languageRouter = require("./routes/languageRoute");
const reviewRouter = require("./routes/reviewRoute");
const newsRouter = require("./routes/newsRoute");
const midtransRouter = require("./routes/midtrans");

app.use(morgan("combined"));

const allowedOrigins = ["https://admin-alvitogamestore.vercel.app", "https://api-alvitogamestore.vercel.app", "http://localhost:3000", "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Please enter the specific route. example: {{base_url}}/api/game");
});

app.use("/api/user", authRouter);
app.use("/api/game", gameRouter);
app.use("/api/genre", genreRouter);
app.use("/api/feature", featureRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/language", languageRouter);
app.use("/api/review", reviewRouter);
app.use("/api/news", newsRouter);
app.use("/api/midtrans", midtransRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
