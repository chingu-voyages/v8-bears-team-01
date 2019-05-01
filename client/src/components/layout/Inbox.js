import React, {Component} from 'react';
import moment from "moment";

export class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      receivedMessages: [],
      sentMessages: [],
      displaySentMessages: false,
      displayMessageList: true,
      selectedMessage: {}
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
  displaySentMessages = (value) => {
    if(value){
      this.setState({
        displayMessageList: true,
        displaySentMessages : true
      })
    } else {
      this.setState({
        displayMessageList: true,
        displaySentMessages : false
      })
    }
  }
  componentDidMount() {
    this.getReceivedMessages();
    this.getSentMessages();
  }
  renderSingleMessage = () => {
    return (
      <div>
        <button 
        onClick={() => this.setState ({displayMessageList: true})}
        className="btn back-btn text-light"><i class="fas fa-angle-left"></i> Back</button>
        <div className="message-wrapper">
          <p>{this.state.selectedMessage.messageBody}</p>
        </div>
        <div className="message-wrapper">
          <textarea className="form-control" placeholder="reply"></textarea>
          <button className="btn btn-success form-control">Send</button>
        </div>
      </div>
    )
  }
  renderMessageList = () => {
    let messages;
    if(this.state.displaySentMessages){
      messages = this.state.sentMessages
    } else {
      messages = this.state.receivedMessages
    }
    return(
      <div>
        {messages.length === 0 && <p className="pb-5 pt-4">No messages to display.</p>}
        {messages.map(message => (
          <div 
            className="message-wrapper" 
            key={message._id}>
            <div className="row message-row text-light mb-2 mt-2">
              <div className="col-md-12 text-left">
                <div
                onClick={() => this.setState ({displayMessageList: false, selectedMessage:message})}
                >
                  <span className="user-name message-list-info">{this.state.displaySentMessages ? message.recipient.name : message.sender.name}
                  <span className="inbox-date text-secondary"> {moment(message.date).fromNow()}</span></span>
                  <p className="message message-list-info">{message.messageBody}</p>
                </div>
                  <button 
                  onClick={() => this.handleDeleteMessage (message._id)}
                  className="btn delete-message-btn">
                  <i class="text-light fas fa-times-circle"></i>
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  render() {
    return (
      <div className="inbox-container">
      <div className="inbox-header bg-dark">
          <p className="text-light font-weight-bold">Inbox</p>
        <ul className="inbox-nav nav">
            <button 
              onClick={() => this.displaySentMessages (false)}
              className={this.state.displaySentMessages ? "btn" : "btn active"}>Received</button>
            <button 
              onClick={() => this.displaySentMessages (true)}
              className={this.state.displaySentMessages ? "btn active" : "btn"}>Sent</button>
        </ul>
      </div>
        <div className="messages-container">
          {this.state.displayMessageList && this.renderMessageList()}
          {!this.state.displayMessageList && this.renderSingleMessage()}
        </div>
    </div>
    )
  }
}

export default Inbox;
