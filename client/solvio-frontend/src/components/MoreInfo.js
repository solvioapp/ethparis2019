import React, { Component } from 'react';

import '../styles/styles.scss'

export class MoreInfo extends Component {

    render() {
        return (
            <div className="about">
                <h2>More info about Solvio...</h2>
                <p>Solvio will be a decentralized education system. We're building technology to enable students to engage in any form of learning that they choose and get credentials for it. We host regular calls as well as a <a href="https://solvio.discourse.group" className="link">Discourse</a>. Join us!</p>
            </div>
        );
    }
}
