import React, { Component } from "react";
import { Container, Col, Row, Media, Button } from "reactstrap";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.css";

import PWidget from "react-piewidget";

export default class WidgetView3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widgetselections: {
        geographytype: "",
        geographyvalue: "",      
        
      }
    };
  }

  componentWillMount() {
    let widgetselections = { ...this.state.widgetselections };
    widgetselections.geo=this.props.geo.split(",");
/*     this.props.geo.split(',').forEach(function(geosplit){
geosplit.split(':')[0].toLowerCase()=='zip'?widgetselections.geographytype=geosplit.split(':')[0]:'';
geosplit.split(':')[0].toLowerCase()=='zip'?widgetselections.geographyvalue=geosplit.split(':')[1]:'';
} 
)*/
    this.setState({ widgetselections });
  }

  componentWillReceiveProps(nextProps) {
    let widgetselections = { ...this.state.widgetselections };
    widgetselections.geo=nextProps.geo.split(",");
/*     nextProps.geo.split(',').forEach(function(geosplit){
geosplit.split(':')[0].toLowerCase()=='zip'?widgetselections.geographytype=geosplit.split(':')[0]:'';
geosplit.split(':')[0].toLowerCase()=='zip'?widgetselections.geographyvalue=geosplit.split(':')[1]:'';
} 
)*/
    this.setState({ widgetselections });
  }

  render() {
    console.log(this.state.widgetselections);
    return (
      <div>
        <Container fluid={true}>
          <PWidget widgetselections={this.state.widgetselections} assets="" />
        </Container>
      </div>
    );
  }
}
