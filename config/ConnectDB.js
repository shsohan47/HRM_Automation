const mongoose = require("mongoose");

async function connectToDB ()
{
    try{
        await mongoose.connect(process.env.db_link);
        console.log("connected successfully");
    }
    catch(err)
    {
        console.log("error:",err); 
 
}
}

module.exports = connectToDB;