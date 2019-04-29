import React, {Component} from 'react';

export class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      receivedMessages: [],
      sentMessages: [],
      toggleSent: true
    };
  }
  getReceivedMessages = () => {
    fetch('/api/messages/received')
      .then(response => response.json())
      .then(json => this.setState({ receivedMessages: json }))
      .catch(err => console.log(err));
  }
  getSentMessages = () => {
    fetch('/api/messages/sent')
      .then(response => response.json())
      .then(json => this.setState({ sentMessages: json }))
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.getReceivedMessages();
    this.getSentMessages();
  }
  render() {
    let messages;
    if(this.state.toggleSent){
      messages = this.state.sentMessages
    } else {
      messages = this.state.receivedMessages
    }
    return (
      <section>
      <h4 className="dropdown-item">Inbox</h4>
        <div className="dropdown-divider"></div>
        <div className="inbox-container dropdown-item">
          {messages.map(message => (
            <div className="row message-row" key={message._id}>
              <div className="col-md-4">
                <label>
                  <span className="user-name">User Name</span>
                </label>
              </div>
              <div className="col-md-8">
                <p>{message.messageBody}</p>
              </div>
            </div>
          ))}
        </div>
    </section>
    )
  }
}

export default Inbox;
