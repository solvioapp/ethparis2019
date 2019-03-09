import React, { Component } from 'react';

import { Resource } from './Resource'

import '../styles/Resource.scss'

export class Path extends Component {
    render() {
        const { path } = this.props
        return (
            <div className="flex">
                <div>
                    <button className="button" onClick=""> <strong> &lt; </strong> </button>
                </div>
                <div>
                {path.map(resource => (
                    <Resource data={resource} />
                ))}
                </div>
                <div>
                    <button className="button"> <strong> &gt; </strong> </button>
                </div>
            </div>
        );
    }
}
