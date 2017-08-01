import React, { Component } from "react";
import { Container, Col, Row, Media, Button } from "reactstrap";
//import "bootstrap/dist/css/bootstrap.css";
//import "./styles/App.css";
import KPIWidget from "react-kpiwidgetdata";
import MTWidget from "react-markettrendswidget";

export default class KPI_Trends extends Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <Container id="widget-container" fluid={false} className="px-0">
        <KPIWidget widgetselections={this.props.widgetoptions} assets="" {...this.props}/>
      </Container>
    );
  }
}
