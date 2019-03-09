import React, { Component } from 'react';

import { Resource } from './Resource'

import '../styles/Resource.scss'

export class Topic extends Component {
    render() {
        const { resources, setResource } = this.props
        return (
            <div>
                {resources.map(resource => (
                    <Resource data={resource} setResource={setResource} />
                ))}
            </div>
        );
    }
}
