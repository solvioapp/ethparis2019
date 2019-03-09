import React, { Component } from 'react';

import '../styles/Resource.scss'

export class Resource extends Component {
    render() {
        const { data } = this.props

        let duration

        if (data.duration > 60) {
            duration = Math.floor(data.duration / 60) + ' hours'
        } else {
            duration = duration + ' min'
        }

        const quality = data.quality / 20

        return (
            <div className="resource">
                <div className="nameAndTopic">
                    <span className="name">{data.title}</span>
                    <span ref="description" className="topic">{data.topic}</span>
                </div>
                <div className="durationAndQuality">
                    <div className="duration">
                        <img src="https://image.flaticon.com/icons/svg/59/59252.svg" className="icon"/> {duration}
                    </div>
                    <div className="quality">
                        <img src="https://image.flaticon.com/icons/svg/118/118669.svg" className="icon"/> {quality}
                    </div>
                </div>
            </div>
        );
    }
}
