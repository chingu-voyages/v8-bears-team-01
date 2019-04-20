import React from 'react';

const Currentproject = () => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8];
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

export default Currentproject;
