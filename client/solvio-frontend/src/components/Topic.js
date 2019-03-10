import React, { Component } from 'react';
import * as API from '../apifunctions';

import { Resource } from './Resource'

import '../styles/Resource.scss'

export class Topic extends Component {
  constructor(props){
    super(props)

    this.state = {
      resources: []
    }

  }

  async componentWillMount(){
    this.setState({
      resources: await API.getTopic(this.props.location.params.id)
    })
  }

  render() {
        const { setResource } = this.props
        const resources = this.state.resources
        return (
            <div>
                {
                (resources!== undefined && resources.length > 0) ?
                  resources.map((resource, i) => (
                    <Resource key={i} data={resource} setResource={setResource} />
                  )) : "No entries"
              }
            </div>
        );
    }
}
