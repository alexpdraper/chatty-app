import React from 'react';

const Message = React.createClass({
  render() {
    const re = /(https?:\/\/\S*\.(?:png|jpe?g|gif))/i;
    let content = this.props.content.split(re);
    console.log(content);

    return (
      <div className='message'>
        <span className='username' style={{color: this.props.color}}>{this.props.username}</span>
        <span className='content'>
          {content.map((word, index) => {
            if (re.test(word)) {
              return (
                <a key={index} className='thumbnail' href={word} target='_blank'>
                  <img src={word} />
                </a>
              );
            } else {
              return (word);
            }
          })}
        </span>
      </div>
    );
  }
});

const SystemMessage = React.createClass({
  render() {
    return (
      <div className='message system'>
        <span className='content'>{this.props.content}</span>
      </div>
    );
  }
});

export {Message as default, SystemMessage};