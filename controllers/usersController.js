import User from "../models/User.js";

//GET USERS
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
    
    console.log("Admin loggedIn")
  } catch (err) {
    next(err);
  }
};

//GET USER BY ID
export const getUser = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//UPDATE USER
export const updateUser = async (req, res, next) => {
  try {
    //const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

//DELETE USER
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};
