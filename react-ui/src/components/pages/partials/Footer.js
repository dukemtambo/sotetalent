import React from "react";

const Footer = () => (
  <footer className="footer section-dark">
    <div className="container">
      <div className="row">
        <nav className="footer-nav">
          <ul>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/license">Legal</a>
            </li>
          </ul>
        </nav>
        <div className="credits ml-auto">
          <span className="copyright">
            © {new Date().getFullYear()}, Sote Talent, ltd
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

