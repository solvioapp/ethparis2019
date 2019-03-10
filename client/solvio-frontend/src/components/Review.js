import React, { Component } from 'react';

import '../styles/Resource.scss'

import web3 from 'web3'

import { challengeReview } from '../apifunctions'

const reviewControllerAbi = require('./ReviewController').abi
const reviewControllerAddress = '0xcda376b1d49cec896778b7099fb7754bc4bc883f'

export class Review extends Component {

    challenge() {
        const { web3 } = window
        const { data }  = this.props

        console.log('window.web3', web3)
        console.log('web3', web3)

        const account = web3.eth.accounts[0]
        const reviewController = web3.eth.contract(reviewControllerAbi).at(reviewControllerAddress)
        reviewController
            .challenge(data.id, {
                from: account,
                value: web3.toWei(0.02)
            }, (res) => {
                console.log('res', res)
            })
    }

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
                        {data.dependencies.length > 0 ? (
                            <div>
                                <p className="title-dep"><strong>Dependencies</strong></p>
                                <span className="row">
                                    <p className="dependencies">Topic</p>
                                    <p className="dependencies">Weight</p>
                                </span>
                            </div>
                        ): null}
                        
                        {data.dependencies.map((dep) => (
                            <div>
                                <span className="row">
                                    <p className="dependencies">{dep.topic}</p>
                                    <p className="dependencies">{dep.weight}</p>
                                </span>
                            </div>
                        ))}
                        <button className="btn btn-challenge" onClick={this.challenge.bind(this)}>Challenge</button>

                    </div>
                </div>
            </div>
        );
    }
}
