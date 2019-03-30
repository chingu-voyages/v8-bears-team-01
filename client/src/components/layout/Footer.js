import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-dark text-center mt-4">
  <div className="footer-container">
    <div className="footer-top">
      <div className="row">
        <div className="col-lg-4 col-sm-12 p-0 footer-brand">
          <h4 className="title">
          <span>CodeCollab</span>
          </h4>
        </div>
        <div className="col-lg-8 col-sm-12 p-0 footer-brand">
          <div className="row">
            <div className="col-sm-4 col-md-4 col-lg-4">
              <h5 className="title">Explore</h5>
                <ul className="list-unstyled footer-list">
                  <li><Link className="footer-link" to="/browse">Trending</Link></li>
                  <li><Link className="footer-link" to="/browse">Latest</Link></li>
                  <li><Link className="footer-link" to="/browse">Browse</Link></li>
                </ul>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <h5 className="title">Share</h5>
              <ul className="list-unstyled footer-list">
                <li>
                  <Link 
                    className="footer-link" 
                    to="//twitter.com/intent/tweet?source=http%3A%2F%2Fwww.codecollab.io&text=Check%20out%20CodeCollab:%20http%3A%2F%2Fwww.codecollab.io" 
                    target="_blank" >
                    <i className="fab fa-twitter footer-icon"></i> Twitter
                  </Link>
                </li>
                <li>
                  <Link 
                    className="footer-link" 
                    to="//www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.codecollab.io&quote=Check%20out%20Codecollab" 
                    target="_blank">
                    <i className="fab fa-facebook footer-icon"></i> Facebook
                  </Link>
                </li>
                <li>
                  <Link 
                    className="footer-link" 
                    to="//www.reddit.com/submit?url=http%3A%2F%2Fwww.codecollab.io&title=Check%20out%20CodeCollab" 
                    target="_blank" >
                    <i className="fab fa-reddit footer-icon"></i> Reddit
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <h5 className="title">Contact</h5>
              <ul className="list-unstyled footer-list">
                <li><Link className="footer-link" to="/">Email</Link></li>
                <li><Link className="footer-link" to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>  
          </div>      
        </div>
      </div>
      </div>
        <div className="footer-bottom">
          <div className="row">
          <div className="col-md-12">
            <p className="copyright">Copyright &copy; {new Date().getFullYear()} CodeCollab</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer;
