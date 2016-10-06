import React from 'react';
import Message, {SystemMessage} from './Message.jsx';

const MessageList = React.createClass({
  getDefaultProps() {
    return {messages: []};
  },

  render() {
    return (
      <div id='message-list'>
        {this.props.messages.map(message => {
          switch(message.type) {
            case 'message':
              return (
                <Message
                  key={message.id}
                  username={message.username}
                  content={message.content} />
              );
              break;
            case 'notification':
              return (
                <SystemMessage
                  key={message.id}
                  content={message.content} />
              );
              break;
          }
        })}
      </div>
    );
  }
});

export default MessageList;
