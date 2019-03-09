import React, { Component } from 'react';
import { Search } from '../components/Search'
import { Dropdown } from '../components/Dropdown'

export class SearchView extends Component {

    updateQuery(e){

    }

    render() {
        return (
            <div>
              <Search updateQuery={(query) => this.updateQuery(query)}/>
              <Dropdown />
            </div>

        );
    }
}
