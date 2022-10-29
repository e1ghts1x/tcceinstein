const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors());

const router = require('./routes/router.js');
app.use("/api", router);

/*app.post("/api/admin" , (req, res)=>{
    const user = req.body.user;
    const password = req.body.password;
    console.log(user, password)
})

app.post("/api/login" , (req, res)=>{
    const user = req.body.user;
    const password = req.body.password;
    console.log(user, password)
})*/

app.listen(PORT, () =>{
    console.log(`Server em http://localhost:${PORT}`);
});