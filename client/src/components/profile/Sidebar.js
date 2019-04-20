import React from 'react'
import {Link} from 'react-router-dom'
import "./profile.css"

const SideBar = (props) => {
  return (
    <>
      <nav className="sidebar ">
       <div className="d-flex flex-column text-center"> 
        <div className="sidebar-picture">
         <i className="fas fa-user-circle fa-7x"></i>
        </div>
        <p className="h5" style={{marginBottom: "0"}}><strong>John Doe</strong></p>
        <p>Los Angeles</p>
        <p>Front End Developer</p>
        
        </div>


        <div className="components">
              
        
            <Link className={props.about ?'active': undefined} onClick={()=>props.updateState('about')} to="/profile/uu/about">About</Link>
        
        
            <Link className={props.myProject ?'active':undefined} onClick={()=>props.updateState('myProject')} to="/profile/uu/myprojects">My Projects</Link>
        
       
            <Link className={props.collaborators ?'active':undefined} onClick={()=>props.updateState('collaborators')} to="/profile/uu/collaborators">Collaborators</Link>
         
         
            <Link className={props.myContacts ? 'active':undefined} onClick={()=>props.updateState('myContacts')} to="/profile/uu/contact">My Contacts</Link>
                       
        </div>
      
      </nav>
    </>
  )
}

export default SideBar
