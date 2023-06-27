import express from "express";

import { getAllHotels,getHotelById,createHotel,updateHotel,deleteHotel } from "../controllers/hotelsController.js";
const router = express.Router();

//GET ALL
router.get("/", getAllHotels);

//GET BY ID

router.get("/:id", getHotelById);

//CREATE HOTEL

router.post("/", createHotel);

//UPDATE HOTEL

router.put("/:id", updateHotel);

//DELETE HOTEL

router.delete("/:id", deleteHotel);

export default router;
