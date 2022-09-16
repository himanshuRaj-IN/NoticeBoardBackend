const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Notice = require('../models/noticeModel');
const User = require('../models/userModel');
const {signAccessToken} = require('../helpers/generateAccessToken')
const {verifyAccessToken} = require('../helpers/verifyAccessToken')

router.post('/login', async (req, res, next) => {
    try {
        const userid = req.body.UserId;
        const user = await User.findOne({UserId:userid});
        if(!user) throw createError.NotFound('Not A Registered User')
        if(user.Password !== req.body.Password) throw createError.Unauthorized('Either User Id/ Password is Not Valid')
        const token = await signAccessToken(user.UserId);
        res.cookie("ACCESS_TOKEN" , token,{httpOnly:true, maxAge:600000});
        res.status(200).send({message : "Login Sucessfully"});
    } catch (error) {
        res.send(error)
    }
  
})

router.post('/notice',verifyAccessToken, async (req, res, next)=>{
    try {
        res.status(200).send({message : "Authrorised user"});
    } catch (error) {
        res.send(error)
    }
} )
module.exports = router