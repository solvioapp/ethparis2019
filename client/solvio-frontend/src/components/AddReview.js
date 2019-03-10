import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import { submitReview, submit } from '../apifunctions'

import web3 from 'web3'
import sha256 from 'js-sha256'

const reviewControllerAbi = require('./ReviewController').abi
const reviewControllerAddress = '0xaB3F66C8C39e0DE9db45400EEDe08237FCBdA779'

export class AddReview extends Component {
    constructor(props){
        super(props)

        this.state = {
            topic: '',
            quality: '',
            length: '',
            content: '',
            dependencies: []
        }
    }

    addDependency() {
        this.setState(prevState => ({
            dependencies: [...prevState.dependencies, {topic: '', weight: ''}]
        }))
    }

    removeDependency(i) {
        this.setState(prevState => ({
            dependencies: prevState.dependencies.filter((value, index) => index != i)
        }))
    }

    onDependencyTopicChange(i, event) {
        let topic = event.target.value
        this.setState(prevState => ({
            dependencies: prevState.dependencies.map((value, index) => {
                if (index == i) {
                    return {
                        topic: topic,
                        weight: value['weight']
                    }
                } else {
                    return value
                }
            })
        }))
    }

    onDependencyWeightChange(i, event) {
        let weight = event.target.value
        this.setState(prevState => ({
            dependencies: prevState.dependencies.map((value, index) => {
                if (index == i) {
                    return {
                        topic: value['topic'],
                        weight: weight
                    }
                } else {
                    return value
                }
            })
        }))
    }

    onTopicChange(event) {
        this.setState({
            topic: event.target.value
        })
    }

    onQualityChange(event) {
        this.setState({
            quality: event.target.value
        })
    }

    onLengthChange(event) {
        this.setState({
            length: event.target.value
        })
    }

    onContentChange(event) {
        this.setState({
            content: event.target.value
        })
    }

    async submit() {
        const { web3 } = window
        const review = this.state
        const hash = sha256(JSON.stringify(review) + new Date())

        console.log('window.web3', web3)
        console.log('web3', web3)

        const account = web3.eth.accounts[0]
        const reviewController = web3.eth.contract(reviewControllerAbi).at(reviewControllerAddress)
        reviewController
            .submit(hash, {
                from: account,
                value: web3.toWei(0.02)
            }, (res) => {
                console.log('res', res)
            })
        await submitReview(this.props.location.params.id, hash, review)
    }

    render() {
        return (
            <div className="form-container">
                <div className="form-review">
                    <div className="form-field">
                        <h3>Topic</h3>
                        <p>Which topic does the resource address?</p>
                        <Input className="form-textbox" value={this.state.topic} onChange={this.onTopicChange.bind(this)}/>
                    </div>
                    <div className="form-field">
                        <h3>Quality</h3>
                        <p>Number between 1 and 100</p>
                        <Input className="form-textbox" value={this.state.quality} onChange={this.onQualityChange.bind(this)}/>
                    </div>
                    <div className="form-field">
                        <h3>Length</h3>
                        <p>Time you spent studying the resource in minutes</p>
                        <Input className="form-textbox" value={this.state.length} onChange={this.onLengthChange.bind(this)}/>
                    </div>
                    <div className="form-field">
                        <h3>Dependencies</h3>
                        <p>Which topics are prerequisites for understanding of this resource?</p>
                        {this.state.dependencies.map((dependency, i) => {
                            return (
                                <div class="flex" key={i}>
                                    <Input className="form-textbox form-textbox-dep-topic"
                                        placeholder="Topic"
                                        value={dependency.topic}
                                        onChange={this.onDependencyTopicChange.bind(this, i)} />
                                    <Input className="form-textbox form-textbox-dep-weight"
                                        placeholder="Weight"
                                        value={dependency.weight}
                                        onChange={this.onDependencyWeightChange.bind(this, i)} />
                                    <button onClick={this.removeDependency.bind(this, i)}> Remove </button>
                                </div>
                            )
                        })}
                        <div className="form-submit">
                            <button onClick={this.addDependency.bind(this)}> Add </button>
                        </div>
                    </div>
                    <div className="form-field">
                        <h3>Review</h3>
                        <p>Write a review for the resource in a human language. Take your time! This will be used to check if your review is real 🤘🏾</p>
                        <Input className="form-textbox" value={this.state.content} onChange={this.onContentChange.bind(this)}/>
                    </div>
                    <div className="form-submit">
                        <Link to='/'>
                            <button className="btn-submit" onClick={this.submit.bind(this)}> Submit </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
