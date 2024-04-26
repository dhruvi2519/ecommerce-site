const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/config.env" });
const UserRouter = require("./routes/user/index.routes");
const SellerRouter = require("./routes/Seller/index.routes");
const { default: mongoose } = require("mongoose");
const { notFound, errorHandler } = require("./middleware/asyncErrorHandler");
const DB =
  "mongodb+srv://dhruvipatel:Kavita0808@myshope.b0qaj5a.mongodb.net/MyShope?retryWrites=true&w=majority";
const cors = require("cors");
const multer = require("multer");
const path = require("path");
//lets takle cors
const corsOptions = {
  origin: "http://localhost:3000",

  methods: " GET , POST , PUT ,DELETE , PATCH, HEAD ",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully");
  })
  .catch((err) => console.log("aaaaaa", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    return callback(null, "../backend/utils/mongo/images");
  },
  filename: function (req, file, callback) {
    return callback(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });
app.use(express.static(path.join(__dirname, "backend/utils/mongo/images")));

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
});

app.use("/user", UserRouter);
app.use("/seller", SellerRouter);

app.use(notFound);
app.use(errorHandler);
