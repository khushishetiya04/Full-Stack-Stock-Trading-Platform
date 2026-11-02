require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

if (!uri) {
  console.error("MONGO_URL is missing from environment variables.");
  process.exit(1);
}

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB connected");

    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });