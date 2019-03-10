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
      console.log(this.props)
        return (
            <div id="SearchView">
              <Search onPress={(e) => this.props.onPress(e)} updateQuery={(query) => this.updateQuery(query)}/>
              {(queryDefined) ? (<Dropdown results={this.props.results} query={this.state.query}/>) : ""}
            </div>

        );
    }
}
