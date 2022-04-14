const Sequelize = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {
  conversationType: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// find conversation given group Ids

Conversation.findConversation = async function (groupId) {
  const conversation = await Conversation.findOne({
    where: {
      groupId: groupId
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
