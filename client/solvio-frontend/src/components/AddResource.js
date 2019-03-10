import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import * as API from '../apifunctions';

export class AddResource extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e){
      e.preventDefault();
      console.log(e)
      const data = new FormData(e.target);
      const result = await API.addResource(data)
      //this.props.location = "/"
    }

    render() {
        return (
            <div className="form-container">
             <form onSubmit={this.handleSubmit}>
                <div className="form-review">
                    <div className="form-field">
                        <h3>Url</h3>
                        <Input name="url" className="form-textbox" type="text" />
                    </div>
                    <div className="form-field">
                        <h3>Title</h3>
                        <Input name="title" className="form-textbox" type="text" />
                    </div>
                    <div className="form-submit">
                        <button className="btn-submit"> Submit </button>
                    </div>
                </div>
                </form>
            </div>
        );
    }
}
