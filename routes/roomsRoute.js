import express from "express";

import { getAllRooms,getRoomById,createRoom,updateRoom,deleteRoom } from "../controllers/roomsController.js";
const router = express.Router();

import { verifyAdmin } from "../utils/verifyToken.js";

//GET ALL
router.get("/", getAllRooms);

//GET BY ID

router.get("/:id", getRoomById);

//CREATE ROOM

router.post("/:hotelId", verifyAdmin, createRoom);

//UPDATE ROOM

router.put("/:id", verifyAdmin, updateRoom);

//DELETE ROOM

router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

export default router;
