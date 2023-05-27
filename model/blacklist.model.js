const mongoose=require('mongoose');

const blacklist=mongoose.Schema({
   token:String
})



const blacklistModel=mongoose.model('blacklist',blacklist);
module.exports={blacklistModel}