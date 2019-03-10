import React, { Component } from 'react';

import { SearchView } from '../containers/SearchView'
import { TopicSmall } from './TopicSmall';

import '../styles/Resource.scss'

export class Profile extends Component {

    render() {

        const { topicsLearned, results, updateQuery } = this.props
        return (
            <div className="profile">
                <div className="searchWrapper">
                    <SearchView results={results} updateQuery={updateQuery} />
                </div>
                {topicsLearned.map(topic => (
                    <TopicSmall title={topic.title} id={topic.id}/>
                ))}

            </div>
        );
    }
}
