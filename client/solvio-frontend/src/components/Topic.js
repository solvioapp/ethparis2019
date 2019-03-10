import React, { Component } from 'react';
import * as API from '../apifunctions';

import { Resource } from './Resource'

import '../styles/Resource.scss'

export class Topic extends Component {
  constructor(props){
    super(props)

    //

  }
  componentDidMount(){

  }
    render() {
        var { resources, setResource } = this.props
        resources = API.getTopic(this.props.location.params.id)
        return (
            <div>
                {resources.map((resource, i) => (
                    <Resource key={i} data={resource} setResource={setResource} />
                ))}
            </div>
        );
    }
}
