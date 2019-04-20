import React from 'react';

const Completedproject = () => {
  let arr = [1, 2, 3];
  return (
    <div className="allproject-wrapper">
      <div className="allproject-items ">
        {arr.map ((elem, index) => (
          <div key={index} className="allproject-item" />
        ))}
      </div>
    </div>
  );
};

export default Completedproject;
