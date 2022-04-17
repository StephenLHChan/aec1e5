import React from 'react';
import { Box , Badge} from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
}));

const Chat = ({ conversation, setActiveChat, readMessages}) => {
  const classes = useStyles();
  const { otherUser, unreadMessagesCount } = conversation;

  const handleClick = async (conversation) => {
    await setActiveChat(conversation.otherUser.username);
    if (conversation?.unreadMessagesCount > 0){
      await readMessages(conversation);
    }
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />

      <Badge 
        color="primary" 
        badgeContent={unreadMessagesCount}
      />
       
    </Box>
  );
};

export default Chat;
