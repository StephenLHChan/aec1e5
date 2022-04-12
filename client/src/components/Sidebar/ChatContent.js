import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: (unreadMessagesCount) => unreadMessagesCount > 0 ? "black" : "#9CADC8",
    fontWeight: (unreadMessagesCount) => unreadMessagesCount > 0 ? "bold" : "regular",
    letterSpacing: -0.17,
  },
}));

const ChatContent = ({ conversation }) => {
  

  const { otherUser } = conversation;
  const unreadMessagesCount = conversation.unreadMessagesCount;
  const latestMessageText = conversation.id && conversation.latestMessageText;
  const classes = useStyles(unreadMessagesCount);
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
