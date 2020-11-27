import express from "express";
import bodyParser from "body-parser";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//     express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
// );

export default app;