import React, {Component} from 'react';

export class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      receivedMessages: [],
      sentMessages: [],
      toggleSent: false
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
      <section className="inbox-container">
      <div className="inbox-header bg-dark">
          <p className="text-light font-weight-bold">Inbox</p>
        <ul className="nav">
          <li className="nav-item">
            <button className="btn inbox-btn text-light active">Received</button>
          </li>
          <li className="nav-item">
            <button className="btn inbox-btn text-light disabled">Sent</button>
          </li>
        </ul>
      </div>
      <div className="messages-container">
        {messages.map(message => (
          <div className="message-wrapper">
            <div className="row message-row text-light mb-2 mt-2" key={message._id}>
              <div className="col-md-3">
                <label>
                  <span className="user-name">UserName</span>
                </label>
              </div>
              <div className="col-md-9 text-left">
                <p className="message">{message.messageBody}</p>
                <button className="btn delete-message-btn">
                  <i class="text-light fas fa-times-circle"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    )
  }
}

export default Inbox;
