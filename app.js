require("dotenv").config();
require("express-async-errors");

const path = require("path");
// extra security packages
const cors = require("cors");
const xss = require("xss-clean");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/auth");
const teamsRouter = require("./routes/teams");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());

app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/teams", teamsRouter);

app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 80;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
