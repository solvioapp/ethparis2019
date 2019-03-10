import React, { Component } from 'react';

import '../styles/Resource.scss'

export class Review extends Component {
    render() {
        const { data } = this.props

        let duration

        if (data.length > 60) {
            duration = Math.floor(data.length / 60)
            if (duration === 1) {
                duration += ' hour'
            } else {
                duration += ' hours'
            }
        } else {
            duration = data.length

            if (duration === 1) {
                duration += ' minute'
            } else {
                duration += ' minutes'
            }
        }

        const quality = data.quality / 20

        return (
            <div className="resource">
                <div className="titleAndTopic">
                    <span className="title">{data.topic}</span>
                    <span ref="description" className="content">{data.content}</span>
                </div>
                <div className="top">
                    <div className="durationAndQuality">
                        <div className="duration">
                            <img src="https://image.flaticon.com/icons/svg/59/59252.svg" className="icon" /> {duration}
                        </div>
                        <div className="quality">
                            <img src="https://image.flaticon.com/icons/svg/118/118669.svg" className="icon" /> {quality}
                        </div>
                    </div>
                    <div className="bottom">
                        <p className="title-dep">Dependencies</p>
                        <span className="row">
                            <p>Topic</p>
                            <p>Weight</p>
                        </span>
                        {data.dependencies.map((dep) => (
                            <span className="row">
                                <p className="dependencies">{dep.topic}</p>
                                <p className="dependencies">{dep.weight}</p>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
