/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user.model';

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = await User.find({
      username: req.body.username,
    });
    if (user.length > 0) {
      res.send({ error: 'Username taken' });
      return;
    }
    const newUser = await User.create({
      userId: req.body.id,
      username: req.body.username,
      fname: req.body.fname,
      lname: req.body.lname,
      password: req.body.password,
    });

    return res.send({ user: newUser });
  } catch (error:any) {
    return res.send({ error: error.message });
  }
};
export const logIn = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (user) {
      const token = jwt.sign(JSON.stringify(user), '1adsa2-asdc4-12');
      res.send({ user: token });
    } else {
      res.send({ error: 'The account cannot be found' });
    }
    return;
  } catch (error:any) {
    res.send({ error: error.message });
  }
};
