import React, { Component } from 'react';
import Input from '@material-ui/core/Input';

export class AddReview extends Component {
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
                        <p>In minutes</p>
                        <Input className="form-textbox"/>
                    </div>
                    <div className="form-field">
                        <h3>Dependencies</h3>
                    </div>
                    <div className="form-field">
                        <h3>Review</h3>
                        <p>Write a review for the resource in a human language. Take your time! This will be used to check if your review is real 🤘🏾</p>
                        <Input className="form-textbox"/>
                    </div>
                    <div className="form-submit">
                        <button className="btn-submit"> Add </button>
                    </div>
                </div>
            </div>
        );
    }
}