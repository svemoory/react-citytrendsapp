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
      <div>
        <Container fluid={true}>
          <Row>
            <Col sm={{ size: 6, push: 2, pull: 2, offset: 1 }}>
              <MTWidget
                {...this.props}
                widgetselections={this.props.widgetoptions}
                assets=""
              >{this.props.children}</MTWidget>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
