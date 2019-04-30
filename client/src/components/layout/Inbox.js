import React, {Component} from 'react';

export class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      receivedMessages: [],
      sentMessages: [],
      toggleSentMessages: false
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
  handleDeleteMessage = (id) => {
    const messageId = id;
    if (window.confirm("Are you sure you want to delete this message?")) {
      fetch(`/api/messages/${messageId}`, {
        method: "DELETE"
      })
        .then(
          response =>
            response.status === 200 &&
            this.setState(prevState => ({
              receivedMessages: prevState.receivedMessages.filter(
                message => messageId !== message._id
              )
            }))
        )
        .catch(err => console.log(err));
    }
  }
  toggleSentMessages = (value) => {
    if(value){
      this.setState({toggleSentMessages : true})
    } else {
      this.setState({toggleSentMessages : false})
    }
  }
  componentDidMount() {
    this.getReceivedMessages();
    this.getSentMessages();
  }
  render() {
    let messages;
    if(this.state.toggleSentMessages){
      messages = this.state.sentMessages
    } else {
      messages = this.state.receivedMessages
    }
    return (
      <div className="inbox-container">
      <div className="inbox-header bg-dark">
          <p className="text-light font-weight-bold">Inbox</p>
        <ul className="inbox-nav nav">
            <button 
              onClick={() => this.toggleSentMessages (false)}
              className={this.state.toggleSentMessages ? "btn" : "btn active"}>Received</button>
            <button 
              onClick={() => this.toggleSentMessages (true)}
              className={this.state.toggleSentMessages ? "btn active" : "btn"}>Sent</button>
        </ul>
      </div>
      <div className="messages-container">
        {messages.length === 0 && <p className="pb-5 pt-4">No messages to display.</p>}
        {messages.map(message => (
          <div className="message-wrapper" key={message._id}>
            <div className="row message-row text-light mb-2 mt-2">
              <div className="col-md-3">
                <label>
                  <span className="user-name">UserName</span>
                </label>
              </div>
              <div className="col-md-9 text-left">
                <p className="message">{message.messageBody}</p>
                {!this.state.toggleSentMessages &&
                  <button 
                  onClick={() => this.handleDeleteMessage (message._id)}
                  className="btn delete-message-btn">
                  <i class="text-light fas fa-times-circle"></i>
                  </button>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    )
  }
}

export default Inbox;
