import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'

import Sidebar from './Sidebar';
import Content from './Content';

class Profile extends Component {
  state = {
    about: true,
    myProject: false,
    collaborators: false,
    myContacts: false,
    currentInput: 'about',
  };

  componentDidMount(){
   this.props.history.push('/profile/uu/about')
  }

  updateState = name => {
    let currentInput = this.state.currentInput;
    this.setState (prevState => ({[currentInput]: !prevState[currentInput]}));

    this.setState (prevState => ({
      [name]: !prevState[name],
      currentInput: name,
    }));
  };

  render () {
    return (
      <div>
        <Sidebar
          {...this.state}
          updateState={this.updateState}
        />
        <Content />
      </div>
    );
  }
}

export default withRouter(Profile);
