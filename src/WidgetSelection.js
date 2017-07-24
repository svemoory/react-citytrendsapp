import React, { Component } from "react";
import { Container, Col, Row, Media, Button } from "reactstrap";
import { observer } from "mobx-react";
import Background from "./Images/demo_hero.png";
import aculistlogo from "./Images/aculist_logo.png";
// import "bootstrap/dist/css/bootstrap.css";
// import "./styles/App.css";
import WidgetView1 from "./w1";
import WidgetView2 from "./w2";
import WidgetView3 from "./w3";

export default class WidgetSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGeo: "",
      btnactive: "1",
     // btnsnapshotactive: "",
      geo: ""
    };
    this._onGeoSelect = this._onGeoSelect.bind(this);
    this._onTrendsSelect = this._onTrendsSelect.bind(this);
  }
  _onGeoSelect(e) {
    var selectedGeo = e.target.value;
    var btnactive = this.state.btnactive;
   // var btnsnapshotactive = "1";
    var geo = this.state.geo;
    selectedGeo.toLowerCase() == "sunnyvale"
      ? (geo = "City:Sunnyvale,Zip:94086,Area:Sunnyvale")
      : selectedGeo.toLowerCase() == "mountain view"
        ? (geo = "City:Mountain View,Zip:94043,Area:Downtown Mountain View")
        : selectedGeo.toLowerCase() == "los altos"
          ? (geo = "City:Los Altos,Zip:94022,County:Santa Clara")
          : selectedGeo.toLowerCase() == "san jose"
            ? (geo = "City:San Jose,Zip:95112,County:San Mateo")
            : (geo = "");
    this.setState({
      selectedGeo,
      btnactive,
      
      geo
    });
  }

  _onTrendsSelect(trend) {
    var btnactive = trend;
    this.setState({ btnactive });
  }

  render() {
    const assets = "";

    var selectGeovalue = (
      <select
        id="geo-select"
        className="custom-select w-50"
        value={this.state.selectedGeo}
        onChange={this._onGeoSelect}>
        <option value="">Select properties listed in the city...</option>
        <option key="1" value="Sunnyvale">
          Sunnyvale
        </option>
        <option key="2" value="San Jose">
          San Jose
        </option>
        <option key="3" value="Los Altos">
          Los Altos
        </option>
        <option key="4" value="Mountain View">
          Mountain View
        </option>
      </select>
    );

    var sectionStyle = {
      width: "100%",
      height: "180px",
      verticalalign: "middle",
      backgroundImage: `url(${Background})`
    };

    var widget =
      this.state.btnactive == "1"
        ? <WidgetView1 geo={this.state.geo} />
        : this.state.btnactive == "2"
          ? <WidgetView2 geo={this.state.geo} />
          : this.state.btnactive == "3"
            ? <WidgetView3 geo={this.state.geo} />
            : "";

    return (
      <div className="widget-page full-height pos-relative">
        <div className="container-fluid mx-0 px-0">
          <div className="bi-logo1">
            <Media left>
              <Media object src={aculistlogo} alt="Logo" />
            </Media>
          </div>
        </div>
        <div style={sectionStyle}>
          <center className="pt-3">
            <div className="justify-content-center bi-bannertop1 pt-3 pb-0">
              Real Estate Business Intelligence
            </div>
            <div className="justify-content-center bi-bannerbottom1 pt-0">
              Neighborhood trends and stats updated daily
            </div>
          </center>
        </div>
        <div className="bi-geoselection mb-0">
          {selectGeovalue}
        </div>

        <div>
          <Container
            fluid={true}
            className={this.state.selectedGeo === "" ? "hidden" : "px-0"}>
            <Row className="bi-widgetselection justify-content-center mb-0 mx-0">
              <Button
                active={this.state.btnactive === "1"}
                color="secondary"
                onClick={() => this._onTrendsSelect("1")}>
                Trends Across Multiple KPIs
              </Button>
              <Button
                active={this.state.btnactive === "2"}
                color="secondary"
                onClick={() => this._onTrendsSelect("2")}>
                Trends Across Geography Types
              </Button>
              <Button
                active={this.state.btnactive === "3"}
                color="secondary"
                onClick={() => this._onTrendsSelect("3")}>
                Pie Chart for Inventory Count
              </Button>
            </Row>

            <div>
              {widget}
            </div>
          </Container>
        </div>
      </div>
    );
  }
}
