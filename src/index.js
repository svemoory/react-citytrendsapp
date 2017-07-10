import React, { Component } from "react";
import { Container, Col, Row, Media, Button } from "reactstrap";
import { observer } from "mobx-react";
import Background from "./Images/demo_hero.png";
import aculistlogo from "./Images/aculist_logo.png";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.css";
import KPIWidget from "react-kpiwidget";
import MTWidget from "react-markettrendswidget";
import YYWidget from "react-yeartoyearwidget";
import KPI_Trends from "./KPI_Trends";


export default class WidgetSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGeo: "",
      btnactive: "",
      geo:""

    };
   this._onGeoSelect = this._onGeoSelect.bind(this); 
  }
  _onGeoSelect(e) {
     var selectedGeo=e.target.value;
     var btnactive="1";
     var geo=this.state.geo;
     
   selectedGeo.toLowerCase()=='sunnyvale'?geo='Zip:94086,City:Sunnyvale,County:Santa Clara':
selectedGeo.toLowerCase()=='mountainview'?geo='Zip:94043,City:Mountain View,County:Santa Clara':
selectedGeo.toLowerCase()=='losaltos'?geo='Zip:94022,City:Los Altos,County:Santa Clara':
selectedGeo.toLowerCase()=='sanjose'?geo='Zip:95112,City:San Jose,County:San Mateo':geo='';
    this.setState({
  selectedGeo,btnactive,geo
    });

  }


  render() {
   
    const assets = "";

    var selectGeovalue = (
      <select id="geo-select"
        className="custom-select w-50"
        value={this.state.selectedGeo}
        onChange={this._onGeoSelect}>
        <option value="">Select properties listed in the city...</option>
        <option key="1" value="Sunnyvale">Sunnyvale</option>
        <option key="2" value="San Jose">San Jose</option>
        <option key="3" value="Santa Clara">Santa Clara</option>
        <option key="4" value="Los Altos">Los Altos</option>
        <option key="5" value="Mountain View">Mountain View</option>
      </select>
    );

    var sectionStyle = {
      width: "100%", 
      backgroundImage: `url(${Background})`
    };

    var w1=this.state.btnactive=="1"?<KPI_Trends geo={this.state.geo} />:"";

    return (
      <div className="">
        <div className="container-fluid mx-0 px-0">
          <div className="bi-logo1">
            <Media left>
              <Media object src={aculistlogo} alt="Logo" />
            </Media>
          </div>
        </div>
        <div style={sectionStyle}>
          <center>
            <div className="justify-content-center bi-bannertop">
              Real Estate Business Intelligence
            </div>
            <div className="justify-content-center bi-bannerbottom">
              Neighborhood trends and stats updated daily
            </div>
          </center>
        </div>
        <div className="bi-geoselection">
          {selectGeovalue}
        </div>

        <div>
          <Container fluid={true} className={this.state.selectedGeo === "" ? "hidden" : ""}>
            <Row className="bi-widgetselection justify-content-center">   
      
              <Button  active={this.state.btnactive === '1'} color="secondary">Trends Across Multiple KPIs</Button>
              <Button  active={this.state.btnactive === '2'} color="secondary">Trends Across Geography Types</Button>
              <Button  active={this.state.btnactive === '3'} color="secondary">Pie Chart for Inventory Count</Button>
            </Row>
            <Row className="justify-content-center">
              Median Sale Price by Year
            </Row>

            
           
          </Container>
{w1}
         
        </div>
      </div>
    );
  }
}
