const {Schema,model} = require("mongoose");


// Schema for worldchat
const chatSchema = new Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  time:{type:String}
});
// Model for worldChat
const Chats = model("chat", chatSchema);


module.exports = Chats;
