import express from "express";
import registerRouter from "./routes/register.ts";

const app= express();
app.use(express.json());
app.use("/register", registerRouter);

const PORT=3000;
app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`);
})