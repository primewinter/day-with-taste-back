import express from "express";
import dotenv from "dotenv";
import app from "./app";
import db from "./db";

dotenv.config();

const PORT = process.env.PORT || 3000;
const handleListening = () => {
  console.log(`✅ Listening on : http://localhost:${PORT}`);
};
app.listen(PORT, handleListening);
