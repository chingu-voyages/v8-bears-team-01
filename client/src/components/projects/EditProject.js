import React from 'react';

const EditProject = (props) => (
  <div>
    <p>Deadline: </p> 
    <input id="deadline" type="date" defualtValue={props.deadline}></input>
    <p>
      Description: 
    </p>
    <textarea id="description" className="form-control d-block mb-3" defaultValue={props.description}></textarea>
    <button 
      type="submit"
      className="btn btn-sm btn-outline-success mb-2" 
      onClick={e => {
        e.preventDefault();
        let deadline = document.getElementById("deadline").value;
        let description = document.getElementById("description").value;
        props.handleSaveProject(deadline, description);
        console.log("new deadline : ", deadline);
      }}
      >Save</button>
  </div>
);

export default EditProject;

