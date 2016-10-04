import React from 'react';

const ChatBar = React.createClass({
  getInitialState() {
    return {messageValue: ''};
  },

  handleMessageChange(event) {
    this.setState({messageValue: event.target.value});
  },

  handleKeyDown(event) {
    const enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) {
      this.props.submitMessage({
        username: this.props.username ? this.props.username : 'Anonymous',
        content: this.state.messageValue
      });
      this.setState({messageValue: ''});
    }
  },

  render() {
    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          value={this.props.username}
          onChange={(e) => {this.props.handleUsernameChange(e.target.value);}} />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          value={this.state.messageValue}
          onChange={this.handleMessageChange}
          onKeyDown={this.handleKeyDown} />
      </footer>
    );
  }
});

export default ChatBar;