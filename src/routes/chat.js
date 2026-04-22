const express = require('express');
const { userAuth } = require('../middleware/auth');
const Chatrouter = express.Router();
const Chat = require("../model/Chat")



Chatrouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
    try{
           const loginedUserId = req.user._id;
           const targetUserId = req.params.targetUserId; 

           let chat = await Chat.findOne({participants:{$all:[loginedUserId,targetUserId]}}).populate({
            path:"messages.senderId",
            select:"firstName lastName" 
           })

           if(!chat){
                chat = new Chat({
                    participants:[loginedUserId,targetUserId],
                    messages: []
                })
                
                await chat.save();

            }

            res.json(chat)


    }
    catch(err){
      res.status(500).json({ error: "Error fetching chat history: " + err.message });

    }


    


});

module.exports = Chatrouter;