import React, { Component } from "react";
import { Container, Col, Row, Media, Button } from "reactstrap";
//import "bootstrap/dist/css/bootstrap.css";
import "./styles/App.css";
import KPIWidget from "react-kpiwidgetdata";
import MTWidget from "react-markettrendswidget";

export default class Market_Trends extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {
    return (
        <Container id="widgetChartContainer" className="text-center" fluid={false}>
          <Row>
            <Col sm={{ size: 12 }}>
              <MTWidget
                {...this.props}
                widgetselections={this.props.widgetoptions}
                assets=""
              >{this.props.children}</MTWidget>
            </Col>
          </Row>
        </Container>
    );
  }
}
