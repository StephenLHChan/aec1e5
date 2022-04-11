const router = require("express").Router();
const { Op } = require("sequelize");
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const conversation = await Conversation.findOne({
        where: { 
          id: conversationId,
        },
      });

      const message = await Message.create({ senderId, text, conversationId });

      if (recipientId === conversation.user1Id) {
        conversation.user1UnreadCount += 1;
      } else {
        conversation.user2UnreadCount += 1;
      }

      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
        user2UnreadCount: 1,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put('/updateReadStatus/:senderId', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    
    const { senderId } = req.params;
    const userId = req.user.id;

    const conversation = await Conversation.findConversation(userId, senderId);

    if (!conversation){
      return res.sendStatus(404);
    }

    await Message.update(
      { readStatus: true },
      {
        where: {
          [Op.and]: {
            senderId,
            conversationId: conversation.id,
            readStatus: false,
          },
        },
      }
    );

    res.sendStatus(204);

  } catch(error) {
    next(error);
  }
});

module.exports = router;
