import React, { Component } from "react";
import { Container, Col, Row, Media, Button } from "reactstrap";
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
    this.setState({ widgetselections });
  }

  componentWillReceiveProps(nextProps) {
    let widgetselections = { ...this.state.widgetselections };
    widgetselections.geo=nextProps.geo.split(",");
    this.setState({ widgetselections });
  }

  render() {
    return (
      <Container id="widgetPieContainer" fluid={true} className="px-0 mt-4">
        <PWidget title="Inventory Count" widgetselections={this.state.widgetselections} assets="" />
      </Container>
    );
  }
}