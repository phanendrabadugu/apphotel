import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";
import {  verifyToken, verifyUser, verifyAdmin  } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//GET ALL
router.get("/", verifyAdmin, getUsers);

//GET
router.get("/:id", verifyUser, getUser);

//UPDATE
router.put("/:id",verifyUser, updateUser);

//DELETE
router.delete("/:id",verifyUser, deleteUser);

export default router;
