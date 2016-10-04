import React from 'react';
import Message, {SystemMessage} from './Message.jsx';

const MessageList = React.createClass({
  render() {
    return (
      <div id='message-list'>
        <Message
          username='Anonymous1'
          content='I won&rsquo;t be impressed with technology until I can download food.' />
        <SystemMessage content='Anonymous1 changed their name to nomnom.' />
      </div>
    );
  }
});

export default MessageList;
