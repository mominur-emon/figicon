const mongoose = require("mongoose");
const config = require("./config");

const dburl = config.db.url;

mongoose
.connect(dburl)
.then(()=>{
    console.log('mongodb atlas is connected')
}) 
.catch((err)=>{
    console.log(err);
    process.exit(1);
})