const mongoose=require("mongoose")

mongoose.connect('mongodb+srv://dhruvipatel:Kavita0808@myshope.b0qaj5a.mongodb.net/')
.then(()=>{
    console.log("mongo connected")
})
.catch(()=>{
    console.log("error")
})

const Schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    }
})

const Collection=new mongoose.model("AuthCollection",Schema)

module.exports=Collection