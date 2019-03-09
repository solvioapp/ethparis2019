import React, { Component } from 'react';

import { Resource } from './Resource'

export class Path extends Component {
    render() {
        const { path } = this.props
        return (
            <div>
                {path.map(resource => (
                    <Resource data={resource} />
                ))}
            </div>
        );
    }
}
