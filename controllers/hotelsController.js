import Hotel from "../models/Hotel.js";

//GET ALL

export const getAllHotels = async (req, res, next) => {
  try {
    const getHotels = await Hotel.find();
    res.send(getHotels);
  } catch (error) {
    next(error);
  }
};

//GET BY ID

export const getHotelById = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const getHotelByID = await Hotel.findById({ _id });
    res.send(getHotelByID);
  } catch (error) {
    next(error);
  }
};

//CREATE HOTEL
export const createHotel = async (req, res, next) => {
  const createHotel = new Hotel(req.body);
  try {
    const savedHotel = await createHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

//UPDATE HOTEL

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

//DELETE HOTEL

export const deleteHotel = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const deleteHotel = await Hotel.findByIdAndDelete({ _id });
    res.status(200).json(deleteHotel);
  } catch (error) {
    next(error);
  }
};
