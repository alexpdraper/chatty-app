import React from 'react';

const ChatBar = React.createClass({
  getInitialState() {
    return {
      messageValue: '',
      username: this.props.initialUsername,
    };
  },

  handleMessageChange(event) {
    this.setState({messageValue: event.target.value});
  },

  sendMessage(event) {
    const enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) {
      this.props.updateUsername(this.state.username);
      this.props.submitMessage({
        type: 'message',
        username: this.state.username || 'Anonymous',
        content: this.state.messageValue
      });
      this.setState({messageValue: ''});
    }
  },

  sendUsername() {
    // this.props.updateUsername(this.state.username);
  },

  render() {
    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          value={this.state.username}
          onChange={(e) => {this.setState({username: e.target.value});}}
          onBlur={this.sendUsername} />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          value={this.state.messageValue}
          onChange={(e) => {this.setState({messageValue: e.target.value});}}
          onKeyDown={this.sendMessage} />
      </footer>
    );
  }
});

export default ChatBar;