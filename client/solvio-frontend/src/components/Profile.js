import React, { Component } from 'react';

import { SearchView } from '../containers/SearchView'
import { TopicSmall } from './TopicSmall';

import '../styles/Resource.scss'

export class Profile extends Component {

    constructor(props){
      super(props)
      this.state = {
        topicsLearned: this.props.topicsLearned
      }
    }

    onPress(e){
      e.preventDefault()
      const value = e.target.value
      console.log(value)
      const self = this
      this.setState({
        topicsLearned: [].concat([{id:999, title: value}], self.state.topicsLearned)
      })
    }

    render() {
        var { topicsLearned, results, updateQuery } = this.props
        topicsLearned = this.state.topicsLearned
        console.log(topicsLearned)
        return (
            <div className="profile">
                <div className="searchWrapper profileWrapper">
                    <SearchView onPress={(e) => this.onPress(e)} results={results} updateQuery={updateQuery} />
                </div>
                <div id="customBoxes">
                {topicsLearned.map((topic,i) => (
                  <div className="customBox">{topic.title}</div>
                ))}
                </div>
            </div>
        );
    }
}
