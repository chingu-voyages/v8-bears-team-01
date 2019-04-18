import React from 'react'
import "./profile.css"

const SideBar = () => {
  return (
    <div className="wrapper">
      <nav className="sidebar">
        <div className="sidebar-picture">
         <i className="fas fa-user-circle fa-6x"></i>
        </div>

        <ul className="list-unstyled components">
        <p>Joe Doe</p>
        <p>Los Angeles</p>
        <p>Front End Developer</p>

          <li className="active">
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Home</a>
            
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Portfolio</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>                
        </ul>
      
      </nav>
    </div>
  )
}

export default SideBar
