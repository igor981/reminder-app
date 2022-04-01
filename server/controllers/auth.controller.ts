import { Request, Response, NextFunction } from "express";
import User from '../models/user.model'

export const signUp = async (req: Request, res: Response) => {
    try {
        const user = await User.find({
            username: req.body.username
        })

        console.log(user, req.body.username);
        
        if (user.length >= 1) { res.send({error: 'Username taken'}) } 
        else {
            const newUser = await User.create({
                userId: req.body.id,
                username: req.body.username,
                fname: req.body.fname,
                lname: req.body.lname,
                password: req.body.password,
                
            })
            return res.send({user: newUser})

        }


        
    } catch (error:any) {
        return res.send({error: error.message})
        
    }
    
}
export const logIn = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            name: req.body.username,
            password: req.body.password
        })
        if(user){
            res.send({user: user})
            return
        } else {
            res.send({error: 'The account cannot be found'})
            return
        }
        
    } catch (error:any) {
        res.send({error: error.message})
        
    }
    
}
