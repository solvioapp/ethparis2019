import React, { Component } from 'react';

import "../styles/Dropdown.css"

export class Dropdown extends Component {
  render() {
    const query = this.props.query || ""
    return (
      <div id="Dropdown">

        <div className="aoyue-select animated zoomIn">
            <label className="option">
              <span className="title animated fadeIn"><span className="label-bordered"><i class="fab fa-leanpub"></i> Learn</span> {query}</span>
            </label>
            <label className="option">
              <span className="title animated fadeIn"><span className="label-bordered"><i class="fas fa-plus"></i> Add Topic</span> Linear Algebra Advanced</span>
            </label>
            <label className="option">
              <span className="title animated fadeIn"><span className="label-bordered"><i class="far fa-file"></i> Add Resource</span> Linear Algebra Book 1</span>
            </label>
            <label className="option">
              <span className="title animated fadeIn"><span className="label-bordered"><i class="fas fa-pen-square"></i> Add Review</span>  Linear Algebra Book 2</span>
            </label>
        </div>

      </div>
    );
  }
}
