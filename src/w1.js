import React, { Component } from "react";
import { Container, Col, Row, Media, Button,ButtonGroup } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/App.css";
import Market_Trends from "./Market_Trends";
import KPI_Trends from "./KPI_Trends";


export default class WidgetView1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnKPIactive: ""
      ,
      widgetselectionsKPI: {
        measure: "SoldMedListPrice",
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

    componentWillReceiveProps(nextProps) {
    let widgetselectionsMT = { ...this.state.widgetselectionsMT };
    let widgetselectionsKPI = { ...this.state.widgetselectionsKPI };
    var geosplit = nextProps.geo.split(",");
    widgetselectionsKPI.geo = geosplit;
    widgetselectionsMT.geo = geosplit;
    var btnKPIactive= 'SoldMedListPrice';
    this.setState({ widgetselectionsKPI, widgetselectionsMT,btnKPIactive });
  }


        _onsetPeriod(rpSelected) {
       let widgetselectionsMT={...this.state.widgetselectionsMT};
      
     rpSelected=='1'? widgetselectionsMT.periodtype='Month':widgetselectionsMT.periodtype='Year';
     widgetselectionsMT.period=rpSelected;

    this.setState({ widgetselectionsMT });
  }



    _onKPISelect(kpi) {
     
    var selectedKPI =kpi;   
    let widgetselectionsMT = { ...this.state.widgetselectionsMT };
    let widgetselectionsKPI = { ...this.state.widgetselectionsKPI };
    var btnKPIactive= selectedKPI;
    var geosplit = this.props.geo.split(",");
    widgetselectionsKPI.measure = selectedKPI;
    widgetselectionsMT.measure = selectedKPI;
    this.setState({ widgetselectionsKPI, widgetselectionsMT,btnKPIactive });
  }


  componentWillMount() {
    
    let widgetselectionsMT = { ...this.state.widgetselectionsMT };
    let widgetselectionsKPI = { ...this.state.widgetselectionsKPI };
    var btnKPIactive= 'SoldMedListPrice';
    var geosplit = this.props.geo.split(",");
 
    widgetselectionsKPI.geo = geosplit;
    widgetselectionsMT.geo = geosplit;
    this.setState({ widgetselectionsKPI, widgetselectionsMT,btnKPIactive });
  }



  render() {
      const labels = {
    SoldMedListPrice: "Median List Price",
    SoldCount: "Sold Count",
    InventoryCount: "Inventory Count",
    SoldAvgDOM:"Avg Days on Market",
    AvgSalePricePerSqft:"Avg Sale per SqFt",
}
let btnactive=this.state.btnKPIactive;
   var measurelabel = btnactive =="SoldMedListPrice" ? 
                      labels.SoldMedListPrice : 
                      btnactive =="SoldAvgDOM" ?
                      labels.SoldAvgDOM:btnactive == "AvgSalePricePerSqft" ?
                      labels.AvgSalePricePerSqft :
                      "";
                      
   let chartOptions = {
    titleclasses:"row justify-content-center title mx-0", 
    chartclasses:"mb-4", 
    optionclasses:"justify-content-center",
    widgetoptions: this.state.widgetselectionsMT,
    assets:"", 
    chartTitle:`${measurelabel} by Year`
   };

    return (
      <div>
        <Container fluid={true} className="px-0 mt-4" >
          <div className="widgetContainer pos-relative">
            <div className="widgetHolder">
              <Market_Trends {...chartOptions}>
                <ButtonGroup>
                  <Button onClick={() => this._onsetPeriod('12')}>1 Year</Button>
                  <Button onClick={() => this._onsetPeriod('2')}>2 Years</Button>
                  <Button onClick={() => this._onsetPeriod('5')}>5 Years</Button>
                </ButtonGroup>
              </Market_Trends>
            </div>
          </div>
          
          <Row className="bi-widgetselection justify-content-center mx-0">
            <Button
              active={this.state.btnKPIactive === 'SoldMedListPrice'} onClick={() => this._onKPISelect('SoldMedListPrice')}
              color="secondary">
              Sold Median List Price
            </Button>
            <Button
              active={this.state.btnKPIactive === 'SoldAvgDOM'} onClick={() => this._onKPISelect('SoldAvgDOM')}
              color="secondary">
              Sold Avg Days on Market
            </Button>
            <Button
              active={this.state.btnKPIactive === 'AvgSalePricePerSqft'} onClick={() => this._onKPISelect('AvgSalePricePerSqft')}
              color="secondary">
              Avg Sale Price Per SqFt
            </Button>
          </Row>
                    <Row className="justify-content-center title mx-0">
            {measurelabel} by Geographic Location
          </Row>
         <KPI_Trends widgetoptions={this.state.widgetselectionsKPI} assets="" />
        </Container>


      </div>
    );
  }
}
