import React, { Component } from 'react';

import "./Dropdown.css"

export class Dropdown extends Component {
  render() {
    return (
      <div id="Dropdown">

        <div className="aoyue-select animated zoomIn">
            <label className="option">
              <span className="title animated fadeIn"><i className="icon icon-speedometer"></i>Learn Linear Algebra</span>
            </label>
            <label className="option">
              <span className="title animated fadeIn"><i className="icon icon-fire"></i>Learn Linear Algebra Advanced</span>
            </label>
            <label className="option">
              <span className="title animated fadeIn"><i className="icon icon-handbag"></i>Resource: Linear Algebra Book 1</span>
            </label>
            <label className="option">
              <span className="title animated fadeIn"><i className="icon icon-badge"></i>Resource: Linear Algebra Book 2</span>
            </label>
        </div>

      </div>
    );
  }
}
