import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

//GET ALL ROOMS

export const getAllRooms = async (req, res, next) => {
  try {
    const getAllRooms = await Room.find();
    res.send(getAllRooms);
  } catch (error) {
    next(error);
  }
};

//GET ROOM BY ID

export const getRoomById = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const getRoomByID = await Room.findById({ _id });
    res.send(getRoomByID);
  } catch (error) {
    next(error);
  }
};

//CREATE ROOM

export const createRoom = async (req, res, next) => {
  const HotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    console.log("savedRoom", savedRoom);
    await Hotel.findByIdAndUpdate(HotelId, { $push: { rooms: savedRoom.id } });
    res.status(200).json(savedRoom);
  } catch (error) {
    next(err);
  }
};

//UPDATE ROOM

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

//DELETE ROOM

export const deleteRoom = async (req, res, next) => {
  const HotelId = req.params.hotelId;
  const _id = req.params.id;
  try {
    const deleteRoom = await Room.findByIdAndDelete({ _id });
    await Hotel.findByIdAndUpdate(HotelId, { $pull: { rooms: req.params.id } });
    res.status(200).json(deleteRoom);
  } catch (error) {
    next(error);
  }
};
