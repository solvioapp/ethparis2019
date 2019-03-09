import React, { Component } from 'react';
import { Search } from '../components/Search'
import { Dropdown } from '../components/Dropdown'

export class SearchView extends Component {

    constructor(props){
      super(props)
      this.state = {
        query: ""
      }
    }
    updateQuery(query){
      if(query !== undefined){
        this.setState({query:query})
        this.props.updateQuery(query)
      }
    }

    render() {
      const query = this.state.query
      const queryDefined = (query !== undefined && query !== "")
        return (
            <div>
              <Search updateQuery={(query) => this.updateQuery(query)}/>
              {(queryDefined) ? (<Dropdown query={this.state.query}/>) : ""}
            </div>

        );
    }
}
