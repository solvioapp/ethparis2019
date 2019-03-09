import React, { Component } from 'react';

import { Resource } from './Resource'

import '../styles/Resource.scss'

export class Path extends Component {
    render() {
        const { path, setResource } = this.props
        return (
            <div className="flex">
                <div>
                    <button className="button" onClick={this.props.decPathIndex}> <strong> &lt; </strong> </button>
                </div>
                <div>
                {path.map(resource => (
                    <Resource data={resource} setResource={setResource} />
                ))}
                </div>
                <div>
                    <button className="button" onClick={this.props.incPathIndex}> <strong> &gt; </strong> </button>
                </div>
            </div>
        );
    }
}
