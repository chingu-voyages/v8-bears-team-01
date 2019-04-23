import React from 'react';
import {Switch, Route} from 'react-router-dom';
import About from './content/About';
import Project from './content/project/Project';
import Collaborators from './content/collaborators/Collaborators';
import Contact from './content/Contact';

const Content = () => {
  return (
    <div className="profile-content">
      <Switch>
        <Route path="/profile/uu/about" component={About} />
        <Route path="/profile/uu/myprojects" component={Project} />
        <Route path="/profile/uu/collaborators" component={Collaborators} />
        <Route path="/profile/uu/contact" component={Contact} />
      </Switch>
    </div>
  );
};

export default Content;
