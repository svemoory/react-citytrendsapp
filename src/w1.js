import React, { Component } from "react";
import { Container, Col, Row, Media, Button, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Market_Trends from "./Market_Trends";
import KPI_Trends from "./KPI_Trends";
import uniqueId from "lodash/uniqueId";
import findIndex from "lodash/findIndex";

export default class WidgetView1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnKPIactive: "",
      widgetselectionsKPI: {
        measure: "MedSalePrice",
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
              enabled: false,
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

  componentWillReceiveProps(nextProps) {
    let widgetselectionsMT = { ...this.state.widgetselectionsMT };
    let widgetselectionsKPI = { ...this.state.widgetselectionsKPI };
    var geosplit = nextProps.geo.split(",");
    widgetselectionsKPI.geo = geosplit;
    widgetselectionsMT.geo = geosplit;
    var btnKPIactive = "MedSalePrice";
    var btnPeriodactive="1";
    this.setState({ widgetselectionsKPI, widgetselectionsMT, btnKPIactive,btnPeriodactive });
  }



  _onKPISelect(kpi) {
    var selectedKPI = kpi;
    let widgetselectionsMT = { ...this.state.widgetselectionsMT };
    let widgetselectionsKPI = { ...this.state.widgetselectionsKPI };
    var btnKPIactive = selectedKPI;
    var geosplit = this.props.geo.split(",");
    widgetselectionsKPI.measure = selectedKPI;
    widgetselectionsMT.measure = selectedKPI;
    this.setState({ widgetselectionsKPI, widgetselectionsMT, btnKPIactive });
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
      console.log(periodval,btn);
      let widgetPeriodBtnsState = this.state.widgetPeriodBtns;
      let widgetselectionsMT = this.state.widgetselectionsMT; 

      for(var b in widgetPeriodBtnsState){
        widgetPeriodBtnsState[b].isActive = false; 
      }

    
     let parentindex = findIndex(widgetPeriodBtnsState, b => b.id === btn.id)     
     widgetPeriodBtnsState[parentindex].isActive = !widgetPeriodBtnsState[parentindex].isActive;
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
    var btnKPIactive = "MedSalePrice";
    var geosplit = this.props.geo.split(",");
    var btnPeriodactive="1";
    widgetselectionsKPI.geo = geosplit;
    widgetselectionsMT.geo = geosplit;
    this.setState({ widgetselectionsKPI, widgetselectionsMT, btnKPIactive,btnPeriodactive });
  }

  render() {
    const labels = {
      MedSalePrice: "Median Sale Price",
      SoldCount: "Sold Count",
      InventoryCount: "Inventory Count",
      SoldMedDOM: "Med Days on Market",
      AvgSalePricePerSqft: "Avg Sale per SqFt",
      ActiveCount: "Active Count"
    };
    let btnactive = this.state.btnKPIactive;
    var measurelabel =
      btnactive == "MedSalePrice"
        ? labels.MedSalePrice
        : btnactive == "SoldMedDOM"
          ? labels.SoldMedDOM
          : btnactive == "AvgSalePricePerSqft"
            ? labels.AvgSalePricePerSqft
            : btnactive == "ActiveCount"
            ? labels.ActiveCount : "";

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

          <Row className="bi-widgetselection justify-content-center mx-1">
            <Button
              active={this.state.btnKPIactive === "MedSalePrice"}
              onClick={() => this._onKPISelect("MedSalePrice")}
              color="secondary">
              Median Sale Price
            </Button>
            <Button
              active={this.state.btnKPIactive === "SoldMedDOM"}
              onClick={() => this._onKPISelect("SoldMedDOM")}
              color="secondary">
              Sold Med Days on Market
            </Button>
            <Button
              active={this.state.btnKPIactive === "AvgSalePricePerSqft"}
              onClick={() => this._onKPISelect("AvgSalePricePerSqft")}
              color="secondary">
              Avg Sale Price Per SqFt
            </Button>
            <Button
active={this.state.btnKPIactive === "ActiveCount"}
onClick={() => this._onKPISelect("ActiveCount")}
color="secondary">
Active Count
</Button>
          </Row>
          <Row className="justify-content-center title mx-0">
            {measurelabel} by Geographic Location
          </Row>
          <KPI_Trends
            widgetoptions={this.state.widgetselectionsKPI}
            assets=""
          />
        </Container>
    );
  }
}
