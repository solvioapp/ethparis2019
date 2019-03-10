import React, { Component } from 'react';
import * as API from '../apifunctions';

import { Resource } from './Resource'

import '../styles/Resource.scss'

export class Path extends Component {
  constructor(props){
    super(props)

    this.state = {
      resources: []
    }

  }

    async componentWillMount(){
      this.setState({
        resources: await API.getLearningPath(this.props.location.params.id)
      })
    }

    render() {
        var { setResource } = this.props
        var paths = this.state.resources
        const path = (paths.length > 0) ? paths[paths.length - 1] : []

        return (
          <div>
            <h3 style={{ textAlign: "center" }}>Learning path</h3>

          <div className="flex">
            <div>
              <button className="button" onClick={this.props.decPathIndex}> <strong> &lt; </strong> </button>
            </div>
            <div>
                {path.map((resource, i) => (
                  <Resource key={i} data={resource} setResource={setResource} />
                ))}
              </div>
            <div>
              <button className="button" onClick={this.props.incPathIndex}> <strong> &gt; </strong> </button>
            </div>
          </div>
          </div>
        );
    }
}
