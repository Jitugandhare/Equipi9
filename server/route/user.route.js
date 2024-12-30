const express=require('express');
const userRouter=express.Router();
const userController=require("../controller/user.controller.js")


userRouter.post('/register',userController.register);
userRouter.post('/login',userController.login);
userRouter.patch('/update/:id',userController.update)
userRouter.delete('/delete/:id',userController.delete)


module.exports=userRouter;