import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import * as API from '../apifunctions';

export class AddResource extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        var params_id = props.location.params.id
        var topic = ""
        var resource_id = ""
        if(params_id.substring(0,3) == "tp_"){
          topic = params_id.substring(3)
        } else {
          resource_id = atob(params_id)
        }
        this.state = {
          url: resource_id,
          title: "",
          topic: topic
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
      const link = "/resource/"+result.id+"/reviews"
      this.props.history.push(link)
    }

    render() {
        return (
            <div className="form-container">
             <form method="post" onSubmit={(e) => this.handleSubmit(e)}>
                <div className="form-review">
                <h3 style={{textAlign:"center"}}>Add Resource</h3>
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
