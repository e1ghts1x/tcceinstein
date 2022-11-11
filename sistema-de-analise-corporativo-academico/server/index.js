const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const rateLimit = require("express-rate-limit")
const cors = require("cors");

app.use(express.json());
app.use(cors());

const router = require('./routes/router.js');

app.use(
    rateLimit({
        windowMs: 12 * 60 * 60 * 1000,
        max: 2000,
        message: "Você fez muitas requisições",
        headers: true,
    })
)

app.use("/api", router);

app.listen(PORT, () =>{
    console.log(`Server em http://localhost:${PORT}`);
});