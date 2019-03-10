import React from 'react'
import ReactDOM from 'react-dom'

// Css
import '../styles/Search.css'

export class Search extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        query: '',
    }
  }


  handleChange = (e: any) => {
    e.preventDefault()
    const query = e.target.value
    this.setState({
            query
      })
    this.props.updateQuery(query.toLowerCase().trim())
    }

    render() {
        return (
          <div id="Search">
´                <div className="search_wrapper">
                  <input className="input"
                      id="SearchBox"
                      placeholder="Solvio for ..."
                      value={this.state.query}
                      onKeyPress={event => {
                        if (event.key === 'Enter') {
                          this.props.onPress(event)
                        }
                      }}
                      onChange={(e) => this.handleChange(e)} />
                  <span className="underline"></span>
                </div>
          </div>
        )
    }
}
