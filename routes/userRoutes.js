import express from 'express';
import User from '../../../mod-14/lab-2/notes-app/models/User.js';


const router = express.Router();

//POST /api/users/register
router.post('/register', async (req,res)=>{
    try{
     const existingUser = await User.findOne(req.body.email);
     if(existingUser){
        res.status(400).json({message:`User with the same ${existingUser} already exists!`});
     }
  const newUser = await User.create(req.body);
  console.log(newUser);
  res.status(201).json(newUser);
    }catch(e){
  res.status(400).json({message: e})
    }
    }
)


//POST /api/users/login
router.post('/login', async (req,res)=> {
    try{
    const user = await User.findOne({email: req.body.email});

    if(!user){
        res.status(400).json({message: "can't find the user"})
    }
    const correctPassword = await user.isCorrectPassword(req.body.password);
    if(!correctPassword){
        res.status(400).json({message: "wrong password!"})
    }
  const token = signToken(user);
  res.status(200).json({token,user});
    }catch(e){

  res.status(400).json({message: e})

    }
});


export default router;