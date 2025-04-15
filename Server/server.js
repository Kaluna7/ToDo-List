import express from "express";
import { StatusCodes } from 'http-status-codes';
import cors from "cors";
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.get('/' , (req , res) =>{
    res.status(StatusCodes.OK)
    res.send("Server Active");
});

app.post('/signup' , (req , res) =>{
    res.status(StatusCodes.OK)
    res.send("Sign Up");
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost: ${PORT}`);
});