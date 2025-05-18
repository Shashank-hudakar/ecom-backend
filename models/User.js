const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")

const userSchema = new mongoose.Schema({
      email:{
        type: String,
        require:true,
      },
      password:{
        type:String,
        require:true,
      }
});
userSchema.pre("save",async function(next) {
  if(!this.isModified("password")){next();

  }
  this.password = await bcrypt.hash(this.password,10);


  next();
})

const User = mongoose.model("User",userSchema);

module.exports=User;