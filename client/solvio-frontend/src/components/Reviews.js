import React, { Component } from 'react';
import * as API from '../apifunctions';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"


import { Review } from './Review'

import '../styles/Resource.scss'

export class Reviews extends Component {
  constructor(props){
    super(props)

    this.state = {
      reviews: []
    }
  }
    async componentWillMount(){
      console.log(this.props)
      this.setState({
        reviews: await API.getReviews(this.props.location.params.id)
      })
    }

    render() {
        const reviews = this.state.reviews
        const link = "/resource/"+this.state.id+"/addReview"
        return (
            <div style={{textAlign:"center"}}>
            <Link to={link}><button className="btn-submit"> Add Review </button></Link>
                {reviews.map(review => (
                    <Review data={review} />
                ))}
            </div>
        );
    }
}
