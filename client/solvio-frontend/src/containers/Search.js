import React from 'react'
import ReactDOM from 'react-dom'

// Css
import '../styles/Search.css'

export class Search extends React.Component<any,any> {
  constructor(props: any){
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
    this.props.updateQuery(query)
    }

    render() {
        return (
          <div id="Search">
            <form>
                <div className="search_wrapper">
                  <input className="input"
                      id="SearchBox"
                      placeholder="Search"
                      value={this.state.query}
                      onChange={(e) => this.handleChange(e)} />
                  <span className="underline"></span>
                </div>
            </form>
          </div>
        )
    }
}
