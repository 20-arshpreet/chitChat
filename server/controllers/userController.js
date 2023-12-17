const User=require("../model/userModel");
const bcrypt= require("bcrypt");

module.exports.register=async (req, res, next)=>{
 try{
    const {username,email,password}=req.body;
    const usernameCheck =await User.findOne({username});
    if(usernameCheck)
    return res.json({msg:"Username already used", status:false});
 const emailCheck=await User.findOne({email});
 if(usernameCheck)
 return res.json({msg: "Username already used", status:false});
 const hashedPassword= await bcrypt.hash(password,10);
 const user= await User.create({
     email, username,password:hashedPassword,
 });
 delete user.password;
 return res.json({status:true,user});
 } catch(e){
    next(e);
 }
};

module.exports.login=async (req, res, next)=>{
   try{
      const {username,password}=req.body;
      const user =await User.findOne({username});
      if(!user)
      return res.json({msg:"Incorrect username or password.", status:false});
   const isPasswordvalid= await bcrypt.compare(password,user.password);
   if(!isPasswordvalid)
      return res.json({msg:"Incorrect username or password.", status:false});
   delete user.password;
   return res.json({status:true,user});
   } catch(e){
      next(e);
   }
};

module.exports.avatar=async (req, res, next)=>{
try{
   const userId = req.params.id;
   const avatarImage = req.body.image;
   const userData = await User.findByIdAndUpdate(
     userId,
     {
       isAvatarImageSet: true,
       avatarImage,
     },
     { new: true }
   );
   return res.json({
     isSet: userData.isAvatarImageSet,
     image: userData.avatarImage,
   });
}catch(e){
   next(e)
}
}
module.exports.getAllUsers=async (req, res, next)=>{
try{
const users=await User.find({id:{$ne:req.params.id}}).select([
   "email","username","avtarImage","_id",
]);
return res.json(users);
}catch(e){
   next(e);
}
}