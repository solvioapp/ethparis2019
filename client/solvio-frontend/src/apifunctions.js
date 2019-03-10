import axios from 'axios';
import * as statfunctions from './staticfunctions'
import sha256 from 'js-sha256'

const MIN_SEARCH_CHARS = 2

//const API_HOST = 'http://localhost:8090'
const API_HOST = 'http://178.62.16.66:8090'

export async function searchRequest(query){
  const requestIsUrl = statfunctions.validURL(query)

  if(requestIsUrl) {
  return axios.get(API_HOST + '/resources/'+sha256(query))
    .catch(function (error) {
      return "empty"
    })
    .then(function (res) {
      if(res.status !== undefined
         && res.status == 200
         && res.data !== undefined){
        const results = res.data
        console.log(results)
        return results
      } else {
        return "empty"
      }
      //var results = res.data.filter(topic => topic.title.trim().includes(query.trim()))
    });
  } else if(query.length > MIN_SEARCH_CHARS) {
    // Make a request for a user with a given ID
    return axios.get(API_HOST + '/search?q='+query)
      .catch(function (error) {
        console.log(error);
        return ""
      })
      .then(function (res) {
        if(res.data !== undefined) {
          const results = res.data
          return results
        }
      });
    } else {
      return ""
    }
}

export async function getTopic(topic_id){
  const endpoint = API_HOST + '/topics/'+topic_id+'/resources'
  console.log(endpoint)
  return axios.get(endpoint)
    .catch(function (error) {
      console.log(error)
      return ""
    })
    .then(function(res){
      if(res.data !== undefined){
        return res.data
      } else {
        return ""
      }
    })
}

export async function getReviews(resource_id){
  const endpoint = API_HOST + '/resources/'+resource_id
  console.log(endpoint)
  return axios.get(endpoint)
    .catch(function (error) {
      console.log(error)
      return ""
    })
    .then(function(res){
      if(res.data !== undefined){
        return res.data
      } else {
        return ""
      }
    })
}

export async function addResource(resource){
  console.log(resource)
  const endpoint = API_HOST + '/resources'
  return axios.post(endpoint, resource)
  .catch((error) => console.log(error))
  .then((res) => {
    if(res.data !== undefined){
      return res.data
    } else {
      return ""
    }
  })
}

export async function submitReview(id, hash, review) {
  return axios.post(API_HOST + `/resources/${id}/reviews/${hash}`, review)
}

export async function getLearningPath(topic_id){
  const endpoint = API_HOST + '/topics/'+topic_id+'/learning_paths?length=100'
  return axios.get(endpoint)
    .catch(function (error) {
      console.log(error)
      return ""
    })
    .then(function(res){
      if(res.data !== undefined){
        return res.data
      } else {
        return ""
      }
    })
}
