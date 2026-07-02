const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middlewares/errorHandler");
const notesRoutes = require("./routes/notes.routes");
// Load environment variables
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

connectDB();


app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);
const authMiddleware = require("./middlewares/auth")


app.get("/", (req, res) => {   
    console.log("Hello from the backend!");
    return res.status(200).json({ message: "Hello from the backend!" });
})





app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})