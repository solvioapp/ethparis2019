import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import * as API from '../apifunctions';

export class AddResource extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          url: atob(props.location.params.id),
          title: "",
          topic: ""
        }
    }

    updateForm(type, e){
      e.preventDefault()
      this.setState({[type]: e.target.value})
    }

    async handleSubmit(e){
      e.preventDefault();
      console.log(this.state)
      const result = await API.addResource(this.state)
      alert("Added Resource: "+result.id)
      this.props.history.push("/")
    }

    render() {
        return (
            <div className="form-container">
             <form method="post" onSubmit={(e) => this.handleSubmit(e)}>
                <div className="form-review">
                    <div className="form-field">
                        <h3>Url</h3>
                        <Input placeholder="url"
                          value={this.state.url}
                          onChange={(e) => this.updateForm("url", e)}
                          name="url" className="form-textbox" type="text" />
                    </div>
                    <div className="form-field">
                        <h3>Title</h3>
                        <Input placeholder="title"
                          value={this.state.title}
                          onChange={(e) => this.updateForm("title", e)}
                          name="title" className="form-textbox" type="text" />
                    </div>
                    <div className="form-field">
                        <h3>Topic</h3>
                        <Input placeholder="topic"
                          value={this.state.topic}
                          onChange={(e) => this.updateForm("topic", e)}
                          name="topic" className="form-textbox" type="text" />
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
