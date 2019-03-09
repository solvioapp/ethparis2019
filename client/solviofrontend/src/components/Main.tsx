import React, { Component } from 'react';


class Main extends Component<any, any>  {
  constructor(props: any) {
    super(props);
  }

  generateTree() {
    let simple_chart_config = {
        chart: {
            container: "#tree-simple"
        },

        nodeStructure: {
            text: { name: "Parent node" },
            children: [
                {
                    text: { name: "First child" }
                },
                {
                    text: { name: "Second child" }
                }
            ]
        }
    };
    let my_chart = new ((window as any).Treant)(simple_chart_config);
  }

  componentDidMount(){
    this.generateTree()

  }

  render() {
    return (
      <div id="Main">
        <main id="Main-Container" className="inner cover text-center">
          <div id="tree-simple" style={{width:335, height: 160}}></div>
        </main>
        </div>
    );
  }
}

export default Main;
