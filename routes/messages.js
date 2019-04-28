const Message = require ('../models/Message');

module.exports = app => {

  app.post("/api/messages", async (req, res) => {
    if (req.user){
      const senderId = req.user.id;
      console.log('message route')
      const message = await new Message({
        messageBody : req.body.messageBody,
        role: req.body.role,
        senderId: senderId,
        recipientId: req.body.user,
        projectId: req.body._id
      }).save();
    }
  });

  //get all messages
  app.get ('/api/messages', async (req, res) => {
    try {
      const messages = await Message.find ();
      res.json (messages);
    } catch (err) {
      // console.log("api error", err);
      res.status (422).send (err);
    }
  });

};
