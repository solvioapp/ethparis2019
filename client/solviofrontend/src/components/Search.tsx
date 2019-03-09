import React from 'react'
import ReactDOM from 'react-dom'

// Css
import './Search.css'

export class Search extends React.Component {
    state = {
        query: '',
    }

    handleChange = (query: any) => {
        this.setState({
            query
        })
    }

    render() {
        return (
            <form>
                <input
                    placeholder="Search for..."
                    value={this.state.query}
                    onChange={this.handleChange}
                />
                <p>{this.state.query}</p>
            </form>
        )
    }
}

// class Search extends React.Component {
//     render() {
//         return (

//             <div>
//                 <input type="text" placeholder="" />
//             </div>
//         //     <div id="DIV_1">
//         //         <div id="DIV_2">
//         //             <form action="/s/all" method="get" id="FORM_3">
//         //                 <div id="DIV_4">
//         //                     <div id="DIV_5">
//         //                         <label 
//         //                         // for="Koan-via-HeaderController__input" 
//         //                         id="LABEL_6">
//         //                             <span id="SPAN_7">Search</span>
//         //                         </label>
//         //                         <div id="DIV_8">
//         //                             <svg id="svg_9">
//         //                                 <path id="path_10">
//         //                                 </path>
//         //                             </svg>
//         //                         </div>
//         //                         <div id="DIV_11">
//         //                             <div id="DIV_12">
//         //                                 <input type="text" id="INPUT_13" name="query" placeholder="Try “Costa Brava”" />
//         //                             </div>
//         //                         </div>
//         //                     </div>
//         //                 </div>
//         //             </form>
//         //         </div>
//         //         <div id="DIV_14">
//         //             <button type="button" id="BUTTON_15">
//         //                 Cancel
// 		// </button>
//         //         </div>
//         //     </div>
//         )
//     }
// }