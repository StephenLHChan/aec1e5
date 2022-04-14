const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Group = require("./group");

// associations

User.belongsToMany(Group, { through: 'usersInGroup' });
Group.belongsToMany(User, { through: 'usersInGroup' });
Group.hasOne(Conversation);
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Group,
  Conversation,
  Message
};
