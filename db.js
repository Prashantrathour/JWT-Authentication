const mongoose = require('mongoose');
const env=require('dotenv').config()

const connection=mongoose.connect(process.env.ATLS_CLUSTER_URL)



module.exports={connection}