// const { subDays, startOfDay, endOfDay } = require("date-fns");
// const cron = require("node-cron");
// const connectionRqst = require("../model/connectionrqst");




// cron.schedule('* * * * *', async () => {

//     try{
//            const yesterday = subDays(new Date() , 1)
//            const yesterdayStart  = startOfDay(yesterday) 
//            const yesterdayEnd = endOfDay(yesterday)
 
//           const pendingRequest = await connectionRqst.find({
//         status:"interested",
//         createdAt : {
//             $gte : yesterdayStart,
//             $lt: yesterdayEnd
//         },
//     }).populate("fromUserid toUserId")

//     const listOfEmail = [
//         ...new Set(pendingRequest.map((req) => req.toUserId.emailId))

//     ]
//     for(const email of listOfEmail){
//         try{
//             const res = await sendEmail.run( 
//                 email,
//                 `New request pending for ${email} . Please Login..`
//             )
//             console.log("Email sent")
          

//         }catch(err){
//             throw new Error("Something went wrong" + err.message)

//         }
//     }
//        console.log("ajay")


//     }catch(err){
//          console.error("Cron error:", err)
//     }

    

// });


// module.exports = cron
