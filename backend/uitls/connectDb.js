
import mongoose from "mongoose"
const connectDb =()=> mongoose.connect("mongodb+srv://gk3334394:9334727375@apnagrocery.l75f1.mongodb.net/?retryWrites=true&w=majority&appName=ApnaGrocery").then(()=>console.log("Mongodb succesful connected")).catch((err)=>{
    console.log(err)
})





export default connectDb