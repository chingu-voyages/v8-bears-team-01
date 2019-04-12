import React from "react";

const RecentMessages = () => {
  return (
    <>
      <h4 className="content-header ">Recent Messages</h4>
      <div
        className="row pb-5 justify-content-start"
        style={{ marginTop: "40px" }}
      >
        <div className="col-8 d-flex flex-row" style={{ marginTop: "20px" }}>
          <i className="far fa-user fa-4x" />
          <div className="container">
            <p className="text-left text-wrap font-weight-normal">
              lorem ipsum asdfadfasdfasdfsdadfasssssssssssssss
              asdfadfasdfasdfsdadfasssssssssssssss
              asdfadfasdfasdfsdadfassssssssssssssssssssssssssssssfsfasdf
              asdfasdfasdfasd
            </p>
            <button className="btn btn-outline-success btn-sm" type="button">
              Reply
            </button>{" "}
            <button className="btn btn-outline-info btn-sm" type="button">
              Archive
            </button>
          </div>
        </div>

        <div className="col-8 d-flex flex-row" style={{ marginTop: "20px" }}>
          <i className="far fa-user fa-4x" />
          <div className="container">
            <p className="text-left text-wrap font-weight-normal">
              lorem ipsum asdfadfasdfasdfsdadfasssssssssssssss
              asdfadfasdfasdfsdadfasssssssssssssss
              asdfadfasdfasdfsdadfassssssssssssssssssssssssssssssfsfasdf
              asdfasdfasdfasd
            </p>
            <button className="btn btn-outline-success btn-sm " type="button">
              Reply
            </button>{" "}
            <button className="btn btn-outline-info btn-sm" type="button">
              Archive
            </button>
          </div>
        </div>
      </div>

      <button className="btn btn-outline-primary btn-sm " type="button">
        View More
      </button>
    </>
  );
};

export default RecentMessages;
