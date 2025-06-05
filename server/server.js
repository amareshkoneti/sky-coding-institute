const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const apiRoutes = require("./routes/api");
const certificateRouter = require('./routes/certificateRoutes');
const pingRouter = require('./routes/ping')

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);

const contactRoute = require('./routes/contact');
app.use('/api/contact', contactRoute);

app.use('/api/certificates', certificateRouter);

app.use('/api/ping',pingRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));