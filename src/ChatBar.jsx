import React from 'react';

function validColor(stringToTest) {
  if (stringToTest === "") { return false; }
  if (stringToTest === "inherit") { return false; }
  if (stringToTest === "transparent") { return false; }

  var image = document.createElement("img");
  image.style.color = "rgb(0, 0, 0)";
  image.style.color = stringToTest;
  if (image.style.color !== "rgb(0, 0, 0)") { return true; }
  image.style.color = "rgb(255, 255, 255)";
  image.style.color = stringToTest;
  return image.style.color !== "rgb(255, 255, 255)";
}

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
      let message = {color: false};
      if (/^colou?r/i.test(this.state.messageValue)) {
        let messageArr = this.state.messageValue.split(' ');
        if (messageArr.length >= 2 && validColor(messageArr[1])) {
          console.log('New colour', messageArr[1]);
          message.color = messageArr[1];
        }
      }
      this.props.updateUsername(this.state.username);
      message.type = 'message';
      message.username = this.state.username || 'Anonymous';
      message.content = this.state.messageValue;
      this.props.submitMessage(message);
      this.setState({messageValue: ''});
    }
  },

  render() {
    return (
      <footer style={{backgroundColor: this.props.color}}>
        <input
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          value={this.state.username}
          onChange={(e) => {this.setState({username: e.target.value});}} />
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