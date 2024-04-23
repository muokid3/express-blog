const express = require("express");
const crypto = require("crypto");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const sequelize = require("./util/database");

const assocs = require("./util/assocs");
assocs();

const app = express();

require("dotenv").config({ path: __dirname + "/.env" });
const PORT = process.env.PORT || 5000;
//console.log(crypto.randomBytes(32).toString('hex'));

app.use(express.json());

app.use(blogRoutes);
app.use(authRoutes);

//catch 404, then forward to error handler
app.use((req, res, next) => {
  const error = new Error(
    "Sorry mate, the resource you are looking for could not be found"
  );
  error.status = 404;
  next(error);
});

//catch all error handler. should always be the last
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "A fatal server error occcured";
  res.status(status).json({
    success: false,
    message,
  });
});

//sync db and start server
(async () => {
  try {
    await sequelize.sync({
      alter: true,
    });
    app.listen(PORT, (err) => {
      console.log("Server is up. Running on port " + PORT);
    });
  } catch (err) {
    console.log("error caught:" + err);
  }
})();
