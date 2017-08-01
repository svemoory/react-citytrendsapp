import React, { Component } from "react";
import { Container, Col, Row, Media, Button, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Market_Trends from "./Market_Trends";
import KPI_Trends from "./KPI_Trends";
import uniqueId from "lodash/uniqueId";
import findIndex from "lodash/findIndex";


export default class WidgetView2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnGEOactive: ""
      ,
      widgetselectionsKPI: {
        measure: "MedSalePrice,SoldMedDOM,AvgSalePricePerSqft",
        geo: ""
      },
      widgetselectionsMT: {
        geographytype: "",
        geographyvalue: "",
        measure: "MedSalePrice",
        measurelabel: "Median Sale Price",
        isnum: "true",
        periodtype: "Month",
        period: "12",
        geo: ""
      },
      widgetPeriodBtns: [
        {
          id: "periodBtnToggle-1",
          isOpen: false,
          isActive: true,
          label: "1 Year",
          value: 1,
          options: [
            {
              id:"ptm-1",
              type: "Month",
              value: 12,
              active: true,
              enabled: true,
            },
            {
              id:"ptq-1",
              type: "Quarter",
              value: 4,
              active: false,
              enabled: true,
            },
            {
              id:"pty-1",
              type: "Year",
              value: 1,
              active: false,
              enabled: true,
            }
          ]
        },
        {
          label: "2 Years",
          id: "periodBtnToggle-2",
          isOpen: false,
          isActive: false,
          value: 2,
          options: [
            {
              id:"ptm-2",
              type: "Month",
              value: 12,
              active: false,
              enabled: true,
            },
            {
              id:"ptq-2",
              type: "Quarter",
              value: 4,
              active: true,
              enabled: true,
            },
            {
              id:"pty-2",
              type: "Year",
              value: 1,
              active: false,
              enabled: false,
            }
          ]
        },
        {
          label: "5 Years",
          id: "periodBtnToggle-3",
          isOpen: false,
          isActive: false,
          value: 5,
          options: [
            {
              id:"ptm-3",
              type: "Month",
              value: 12,
              active: false,
              enabled: false,
            },
            {
              id:"ptq-2",
              type: "Quarter",
              value: 4,
              active: false,
              enabled: true,
            },
            {
              id:"pty-3",
              type: "Year",
              value: 1,
              active: true,
              enabled: true,
            }
          ]
        }
      ],
    };
    this._onKPISelect = this._onKPISelect.bind(this);

    this._periodButtonClick = this._periodButtonClick.bind(this);
    this._periodOptionClick = this._periodOptionClick.bind(this);
    this._periodDropdownToggle = this._periodDropdownToggle.bind(this);
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

  _periodButtonClick(btn) {
    let widgetPeriodBtnsState = this.state.widgetPeriodBtns;
    let widgetselectionsMT = this.state.widgetselectionsMT;
    
    for(var b in widgetPeriodBtnsState){
      widgetPeriodBtnsState[b].isActive = false; 
    }

    let index = findIndex(widgetPeriodBtnsState, b => b.id === btn.id)
    let activeTypeIndex = findIndex(widgetPeriodBtnsState[index].options, type => type.active === true )

    widgetselectionsMT.periodtype = widgetPeriodBtnsState[index].options[activeTypeIndex].type;
    widgetselectionsMT.period = widgetPeriodBtnsState[index].value * widgetPeriodBtnsState[index].options[activeTypeIndex].value;

    widgetPeriodBtnsState[index].isActive = !widgetPeriodBtnsState[index].isActive;

    this.setState({widgetPeriodBtnsState, widgetselectionsMT});
  }

  _periodOptionClick(periodval,btn) {    
      let widgetPeriodBtnsState = this.state.widgetPeriodBtns;
      let widgetselectionsMT = this.state.widgetselectionsMT; 
    
     let parentindex = findIndex(widgetPeriodBtnsState, b => b.id === btn.id)     
     let activeoptionindex = findIndex(widgetPeriodBtnsState[parentindex].options, o => o.id === periodval.id)
     

       for(let record in widgetPeriodBtnsState[parentindex].options){    
        widgetPeriodBtnsState[parentindex].options[record].active=false;      
      } 
      widgetPeriodBtnsState[parentindex].options[activeoptionindex].active=!widgetPeriodBtnsState[parentindex].options[activeoptionindex].active;
  

      widgetselectionsMT.periodtype = widgetPeriodBtnsState[parentindex].options[activeoptionindex].type;
      widgetselectionsMT.period = widgetPeriodBtnsState[parentindex].value * widgetPeriodBtnsState[parentindex].options[activeoptionindex].value;
  
      this.setState({widgetPeriodBtnsState, widgetselectionsMT});

    
  }

  _periodDropdownToggle(btn) {
    let widgetPeriodBtnsState = this.state.widgetPeriodBtns;

    let index = findIndex(widgetPeriodBtnsState, b => b.id === btn.id)

    widgetPeriodBtnsState[index].isOpen = !widgetPeriodBtnsState[index].isOpen;

    this.setState({widgetPeriodBtnsState});
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

    var measurelabel ="Median Sale Price";
    
     


let chartOptions = {
  titleclasses: "row justify-content-center title mx-0",
  chartclasses: "mb-4",
  optionclasses: "justify-content-center",
  widgetoptions: this.state.widgetselectionsMT,
  assets: "",
  chartTitle: `${measurelabel} by Year`
};

let PeriodDropdownToggleButtons = this.state.widgetPeriodBtns.map(btn => {
  let BtnOptions = btn.options.map((option => {
    if(!option.enabled){
      return true;
    }  
    return <DropdownItem onClick={this._periodOptionClick.bind(this, option, btn)} key={uniqueId("periodToggleOption_")} className={`mx-0 periodType pl-0 ${option.active === true ? "isActive": ""}`}>{option.type}</DropdownItem>      
  }).bind(this));
  return(
    <ButtonDropdown key={uniqueId("periodToggle_")} id={btn.id} isOpen={btn.isOpen} toggle={this._periodDropdownToggle.bind(this, btn)}>
    <Button className="mr-0" active={btn.isActive} onClick={this._periodButtonClick.bind(this, btn)}>{btn.label}</Button>
    <DropdownToggle caret />
    <DropdownMenu>
      {BtnOptions}
    </DropdownMenu>
    </ButtonDropdown>
  )
});
  
 
    return (

      <Container fluid={true} className="px-0 mt-4">
      <div className="widgetContainer pos-relative">
        <div className="widgetHolder">
          <Market_Trends {...chartOptions}>
            <ButtonGroup>
              {PeriodDropdownToggleButtons}
            </ButtonGroup>
          </Market_Trends>
        </div>
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
    <KPI_Trends title='swap' widgetoptions={this.state.widgetselectionsKPI} assets="" />
    </Container>

    );
  }
}
