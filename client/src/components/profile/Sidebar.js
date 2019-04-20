import React from 'react'
import "./profile.css"

const SideBar = () => {
  return (
    <div className="wrapper">
      <nav className="sidebar ">
       <div className="d-flex flex-column text-center">
        <div className="sidebar-picture">
         <i className="fas fa-user-circle fa-7x"></i>
        </div>
        <p className="h5" style={{marginBottom: "0"}}><strong>John Doe</strong></p>
        <p>Los Angeles</p>
        <p>Front End Developer</p>
        
        </div>


        <ul className="list-unstyled components">
          
        
          <li className="active">
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Home</a>
            
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">My Projects</a>
          </li>
          <li>
            <a href="#">Collaborators</a>
          </li> 
          <li>
            <a href="#">My Contacts</a>
          </li>               
        </ul>
      
      </nav>
    </div>
  )
}

export default SideBar
