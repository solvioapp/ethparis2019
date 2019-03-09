import React, { Component } from 'react';
import axios from 'axios';

import "../styles/Dropdown.css"

export class Dropdown extends Component {

 validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

  renderDropdownElements(results){
    console.log(results)
    var title_query = this.props.query

    if(this.validURL(title_query)){
      return (
        <label className="option">
          <span className="title animated fadeIn">
          <span className="label-bordered">
          <i class="far fa-file"></i>
           Add Resource</span>
           {" " + title_query}</span>
        </label>
      )
    } else if(results.topics !== undefined){
      const topicNonExistent = results.topics.length == 0
      if(topicNonExistent) {
        return (<label className="option">
          <span className="title animated fadeIn">
            <span className="label-bordered">
              <i class="fas fa-plus"></i> Add Topic</span>
             {" " + title_query.charAt(0).toUpperCase() + title_query.slice(1)}</span>
        </label>)
      } else {
        const resultsMerged = [].concat(results.topics.map(el => ({...el, type:"topic"})), results.resources.map(el => ({...el, type:"resource"})))
        return resultsMerged.map(result => {
          //result.title.charAt(0).toUpperCase() + result.title.slice(1)
          const title = result.title
          var title_split = title.split(this.props.query)
          if(title_split[0]) {
            title_split[0] = title_split[0].charAt(0).toUpperCase() + title_split[0].slice(1)
          } else {
            title_query = title_query.charAt(0).toUpperCase() + title_query.slice(1)
          }
          return (
            <label className="option">
              <span className="title animated fadeIn">
              <span className="label-bordered">
                <i class="fab fa-leanpub"></i> {(result.type == "topic") ? "Learn" : "Add Review" }
                </span>
              &nbsp;{title_split[0]}<span style={{fontWeight:"bold"}}>{title_query}</span>{title_split[1]}
              </span>
            </label>
          )
        })
      }
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
              <span className="title animated fadeIn"><span className="label-bordered"><i class="fas fa-pen-square"></i> Add Review</span>  Linear Algebra Book 2</span>
            </label>
        </div>

      </div>
    );
  }
}
