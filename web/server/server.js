const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const cron = require("node-cron");
const dbConnection = require("./config/dbConnection");
dbConnection();
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routes/authRoute");
const gameRouter = require("./routes/gameRoute");
const genreRouter = require("./routes/genreRoute");
const featureRouter = require("./routes/featureRoute");
const cartRouter = require("./routes/cartRoute");
const wishlistRouter = require("./routes/wishlistRoute");
const checkoutRouter = require("./routes/checkoutRoute");
const transactionRouter = require("./routes/transactionRoute");
const promotionRouter = require("./routes/promotionRoute");
const languageRouter = require("./routes/languageRoute");
const reviewRouter = require("./routes/reviewRoute");
const newsRouter = require("./routes/newsRoute");
// const Promotion = require("./models/promotionModel");

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/game", gameRouter);
app.use("/api/genre", genreRouter);
app.use("/api/feature", featureRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/promotion", promotionRouter);
app.use("/api/language", languageRouter);
app.use("/api/review", reviewRouter);
app.use("/api/news", newsRouter);

// Cron job untuk menghapus diskon yang telah berakhir
cron.schedule("0 0 * * *", async () => {
  try {
    // Menghapus data diskon yang sudah melewati batas akhir waktu
    await Promotion.deleteMany({ endDate: { $lt: new Date() } });
  } catch (error) {
    console.error("Error deleting expired discounts:", error);
  }
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
