import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div id="Header">
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <header className="masthead mb-auto">
              <div className="inner">
                <h3 className="masthead-brand">SolvioLearn</h3>
                <nav className="nav nav-masthead justify-content-center">
                  <a className="nav-link active" href="#">Learn</a>
                  <a className="nav-link" href="#">About</a>
                  <a className="nav-link" href="#">Join Us</a>
                </nav>
              </div>
            </header>
          </div>
        </div>
    );
  }
}

export default Header;
