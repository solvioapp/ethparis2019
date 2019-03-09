import React, { Component } from 'react';

import "../styles/Dropdown.css"

export class Dropdown extends Component {

  renderDropdownElements(results){
    console.log(results)
    if(results.length > 0){
      return results.map(result => {
        //result.title.charAt(0).toUpperCase() + result.title.slice(1)
        const title = result.title
        var title_split = title.split(this.props.query)
        var title_query = this.props.query
        console.log(title_split)
        if(title_split[0]) {
          title_split[0] = title_split[0].charAt(0).toUpperCase() + title_split[0].slice(1)
        } else {
          title_query = title_query.charAt(0).toUpperCase() + title_query.slice(1)
        }
        return (
          <label className="option">
            <span className="title animated fadeIn">
            <span className="label-bordered">
              <i class="fab fa-leanpub"></i> Learn
              </span>
            &nbsp;{title_split[0]}<span style={{fontWeight:"bold"}}>{title_query}</span>{title_split[1]}
            </span>
          </label>
        )
      })
    } else {
      return ""
    }
  }

  render() {
    const query = this.props.query || ""
    const results = this.props.results || ""

    return (
      <div id="Dropdown">

        <div className="aoyue-select animated zoomIn">
          {this.renderDropdownElements(results)}
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
