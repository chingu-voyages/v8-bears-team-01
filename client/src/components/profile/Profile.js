import React, {Component, Suspense} from 'react';
import {connect} from 'react-redux';
import {fetchUser} from './../../actions/auth';


import Sidebar from './Sidebar';
// import Content from './Content';
const Content = React.lazy(()=>import('./Content.js'))

class Profile extends Component {
  state = {
    about: true,
    myProject: false,
    collaborators: false,
    myContacts: false,
    currentInput: 'about',
    loading: false
  };

  componentDidMount(){
    this.setState({loading:true})
    this.props.fetchUser()
        .then(()=>{
          this.setState({loading:false})
        })
   //this.props.history.push('/profile/uu/about')
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
        <Suspense fallback={<div>Loading...</div>}>
        <Content />
        </Suspense>
      </div>
    );
  }
}

export default connect(null,{fetchUser})(Profile);
