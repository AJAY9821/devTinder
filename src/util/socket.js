const { Server} = require("socket.io")
const crypto  = require("crypto")
const Chat = require("../model/Chat")


const getSecretRoomID = (userId, targetUserId) => {
    return crypto.createHash("sha256").update([userId,targetUserId].sort().join("_")).digest("hex")
}


const initaialSocket =  (server) => {
    const io =  new Server(server,{
        cors:{
            origin:"http://localhost:5173",
        },
    })

    io.on("connection",(socket) =>{
        socket.on("joinChat",({ firstName, userId, targetUserId })=>{
            const roomId  = getSecretRoomID(userId, targetUserId)

            console.log( firstName + " joined chat:" + roomId)
            socket.join(roomId)
        })

        socket.on("sendMessage", async ({ firstName, userId, targetUserId, text })=>{

            try{
                const roomId = getSecretRoomID(userId, targetUserId)
               let chat = await Chat.findOne({participants : {$all:[userId,targetUserId]}})

               if(!chat){
                     chat = new Chat({
                    participants:[userId,targetUserId],
                    messages:[],

                })
               }
               chat.messages.push({senderId:userId, text});
                await chat.save();
                
            io.to(roomId).emit("receiveMessage", { firstName, text })


            }catch(err){

                console.error("Error sending message:", err)
            }


           

        })

        socket.on("disconnect",()=>{})
    })
}

module.exports = initaialSocket