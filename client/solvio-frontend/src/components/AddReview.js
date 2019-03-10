import React, { Component } from 'react';
import Input from '@material-ui/core/Input';

import { submitReview, submit } from '../apifunctions'

export class AddReview extends Component {
    constructor(props){
        super(props)
    
        this.state = {
            topic: 'Hello',
            quality: '',
            length: '',
            content: '',
            dependencies: [{
                topic: '',
                weight: ''
            }]
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

    async submit() {
        // Call metamask
        // If successful:
        await submitReview(this.props.id, this.state)
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="form-container">
                <div className="form-review">
                    <div className="form-field">
                        <h3>Topic</h3>
                        <p>Which topic does the resource address?</p>
                        <Input className="form-textbox"/>
                    </div>
                    <div className="form-field">
                        <h3>Quality</h3>
                        <p>Number between 1 and 100</p>
                        <Input className="form-textbox"/>
                    </div>
                    <div className="form-field">
                        <h3>Length</h3>
                        <p>Time you spent studying the resource in minutes</p>
                        <Input className="form-textbox"/>
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
                        <Input className="form-textbox"/>
                    </div>
                    <div className="form-submit">
                        <button className="btn-submit" onClick={this.submit}> Submit </button>
                    </div>
                </div>
            </div>
        );
    }
}