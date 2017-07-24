import React, { Component } from "react";
import { Container, Col, Row, Media, Button,ButtonGroup } from "reactstrap";
import Market_Trends from "./Market_Trends";
import KPI_Trends from "./KPI_Trends";


export default class WidgetView2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnGEOactive: ""
      ,
      widgetselectionsKPI: {
        measure: "SoldMedListPrice,SoldAvgDOM,AvgSalePricePerSqft",
        geo: ""
      },
      widgetselectionsMT: {
        geographytype: "",
        geographyvalue: "",
        measure: "SoldMedListPrice",
        measurelabel: "Median Sale Price",
        isnum: "true",
        periodtype: "Month",
        period: "12",
        geo: ""
      }
    };
    this._onKPISelect = this._onKPISelect.bind(this);
    this._onsetPeriod = this._onsetPeriod.bind(this);
  }

        _onsetPeriod(rpSelected) {
       let widgetselectionsMT={...this.state.widgetselectionsMT};
      
     rpSelected=='1'? widgetselectionsMT.periodtype='Month':widgetselectionsMT.periodtype='Year';
     widgetselectionsMT.period=rpSelected;

    this.setState({ widgetselectionsMT });
  }

    _onKPISelect(geo) {     
    var selectedGEO =geo;   
    let widgetselectionsMT = { ...this.state.widgetselectionsMT };
    let widgetselectionsKPI = { ...this.state.widgetselectionsKPI };
    var btnGEOactive= selectedGEO;
     var geofilter='';
this.props.geo.split(',').forEach(function(geosplit){
geosplit.split(':')[0].toLowerCase()==selectedGEO.toLowerCase()? geofilter=[geosplit]:''
})
    widgetselectionsKPI.geo = geofilter;
    widgetselectionsMT.geo = geofilter;
    this.setState({ widgetselectionsKPI, widgetselectionsMT,btnGEOactive });
  }



  componentWillMount() {
    
    let widgetselectionsMT = { ...this.state.widgetselectionsMT };
    let widgetselectionsKPI = { ...this.state.widgetselectionsKPI };
    var btnGEOactive= 'City';
    var geofilter='';
this.props.geo.split(',').forEach(function(geosplit){
geosplit.split(':')[0].toLowerCase()=='city'? geofilter=[geosplit]:''
})

    widgetselectionsKPI.geo = geofilter;
    widgetselectionsMT.geo = geofilter;
    this.setState({ widgetselectionsKPI, widgetselectionsMT,btnGEOactive });
  }

  componentWillReceiveProps(nextProps) {
    let widgetselectionsMT = { ...this.state.widgetselectionsMT };
    let widgetselectionsKPI = { ...this.state.widgetselectionsKPI };
   // var geosplit = this.props.geo.split(",");

var geofilter='';
nextProps.geo.split(',').forEach(function(geosplit){
geosplit.split(':')[0].toLowerCase()=='city'? geofilter=[geosplit]:''
})

    widgetselectionsKPI.geo = geofilter;
    widgetselectionsMT.geo = geofilter;
    var btnGEOactive= 'City';
    this.setState({ widgetselectionsKPI, widgetselectionsMT,btnGEOactive });
  }

  render() {

let geotype=this.state.btnGEOactive;
  
 
    return (
      <div>
        <Container id="widgetChartContainer" fluid={true} className="px-0 mt-4">
          <Row className="justify-content-center title mx-0">
            Median Sale Price for {geotype} by Year
          </Row>

          <div className="widgetContainer pos-relative">
            <div className="widgetHolder">
              <Market_Trends widgetoptions={this.state.widgetselectionsMT} assets="" />
            </div>
            <Container fluid={true} className="px-0">
            <Row className="mx-0">
              <Col className="col-sm-6 push-sm-2 pull-sm-2 offset-sm-1">
                <ButtonGroup className="pos-absolute btn-group-period">
                  <Button onClick={() => this._onsetPeriod('12')}>1 Year</Button>
                  <Button onClick={() => this._onsetPeriod('2')}>2 Years</Button>
                  <Button onClick={() => this._onsetPeriod('5')}>5 Years</Button>
                </ButtonGroup>
              </Col>
            </Row>
            </Container>
          </div>

          <Row className="bi-widgetselection justify-content-center mx-0">
            <Button
              active={this.state.btnGEOactive === 'City'} onClick={() => this._onKPISelect('City')}
              color="secondary">
              City
            </Button>
            <Button
              active={this.state.btnGEOactive === 'Zip'} onClick={() => this._onKPISelect('Zip')}
              color="secondary">
              Zip
            </Button>
            <Button
              active={this.state.btnGEOactive === 'Area'} onClick={() => this._onKPISelect('Area')}
              color="secondary">
              Area
            </Button>
          </Row>
                    <Row className="justify-content-center title mx-0">
            Key Performance Indicators by {geotype}
          </Row>
         <KPI_Trends widgetoptions={this.state.widgetselectionsKPI} assets="" />
        </Container>


      </div>
    );
  }
}
