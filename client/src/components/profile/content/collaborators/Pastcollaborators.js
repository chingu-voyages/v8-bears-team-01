import React from 'react';
import {pastArr} from './model';

const Pastcollaborators = () => {
  return (
    <div className="allproject-wrapper">
      <div className="collaborators-wrapper">
        {pastArr.map ((element, index) => (
          <div key={index}>
            <div className="collaborators-project-title">
              <p className="font-weight-bold">{element.title}</p>
            </div>
            <div className="collaborators-details-wrapper">
              {element.collaborators.map ((ele, index) => (
                <div key={index} className="collaborators-item">
                  <div>
                    <div className="collaborators-image">
                      <i className="fas fa-user-circle fa-7x" />
                    </div>

                    <div className="collaborators-details">
                      <p>{ele.name}</p>
                      <p>{ele.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pastcollaborators;
