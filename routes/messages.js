const Message = require ('../models/Message');

module.exports = app => {

    app.post("/api/messages", async (req, res) => {
      if (req.session && req.session.user){
        const senderId = req.session.user._id;
        const message = await new Message({
          messageBody : req.body.messageBody,
          role: req.body.role,
          senderId: senderId,
          recipientId: req.body.recipientId,
          projectId: req.body.projectId
        }).save();
      }
    });

    //get all messages in database
    //DEVELOPMENT ONLY
    app.get ('/api/messages', async (req, res) => {
      try {
        const messages = await Message.find ();
        res.json (messages);
      } catch (err) {
        // console.log("api error", err);
        res.status (422).send (err);
      }
    });

    // Get the logged in user's sent messages
    app.get("/api/messages/sent", async (req, res) => {
      const id = req.session.user._id;
      const messages = await Message.find({ "senderId": id });
      res.json(messages);
      //res.send({ messages });
    });

    // Get the logged in user's received messages
    app.get("/api/messages/received", async (req, res) => {
      const id = req.session.user._id;
      const messages = await Message.find({ "recipientId": id });
      res.json(messages);
      //res.send({ messages });
    });

    //Delete single message 
    //Todo: Check message ownership before deletion
    app.delete("/api/messages/:messageId", function(req, res) {
      Message.findByIdAndRemove(req.params.messageId, function(err) {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          res.status(200).json({ msg: "Successfully deleted message." });
        }
      });
    });

};
