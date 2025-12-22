import express from "express";
import "dotenv/config";
const app = express();
import fileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbconnect from "./config/dbconnect";
import cloudinary from "./config/cloudinary";

//routes
import userRoutes from "./routes/User";
import courseRoutes from "./routes/Course";
// import paymentRoutes from './routes/Payments'
import profileRoutes from "./routes/Profile";

const PORT = process.env.PORT || 5000;

cloudinary();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cors());

//routes
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/auth", userRoutes);
// app.use('/api/v1/payment',paymentRoutes)

app.get("/", (req, res) => {
  console.log("working fine");
  res.send("hello from studyPath");
});

app.listen(PORT, async () => {
  await dbconnect();
  console.log(`app is listning at port ${PORT}`);
});
