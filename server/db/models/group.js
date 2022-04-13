const Sequelize = require("sequelize");
const db = require("../db");

const Group = db.define("group", {
    groupName: {
      type: Sequelize.STRING,
    },
    iconUrl: {
        type: Sequelize.STRING
      },
  });
  
  module.exports = Group;