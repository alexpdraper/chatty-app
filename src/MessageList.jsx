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
          return (
            <Message
              key={message.id}
              username={message.username}
              content={message.content} />
          );
        })}
      </div>
    );
  }
});

export default MessageList;
