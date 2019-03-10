import React, { Component } from 'react';
import * as API from '../apifunctions';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"


import { Review } from './Review'

import '../styles/Resource.scss'

export class Reviews extends Component {
  constructor(props){
    super(props)

    this.state = {
      resource: {url: "", title: "", id:""},
      reviews: []
    }
  }
    async componentWillMount(){
      console.log(this.props)
      const resourceData = await API.getReviews(this.props.location.params.id)
      if(resourceData !== undefined && resourceData.reviews !== undefined){
        this.setState({
          resource: resourceData,
          reviews: resourceData.reviews
        })
      }

    }

    render() {
        const reviews = this.state.reviews
        const resource = this.state.resource
        const link = "/resource/"+resource.id+"/addReview"
        return (
            <div style={{textAlign:"center"}}>
            <a href={resource.url} target="_blank"><h3>{resource.title}</h3></a>
            <Link to={link}><button className="btn-submit"> Add Review </button></Link>
                {reviews.map(review => (
                    <Review data={review} />
                ))}
            </div>
        );
    }
}
