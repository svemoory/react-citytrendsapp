import React, { Component } from "react";
import {Container,Col,Row, Media, Badge, Input, InputGroup, InputGroupButton} from "reactstrap";
import { observer } from "mobx-react";
import Background from "./Images/background.jpg";
import aculistlogo from './Images/aculist_logo.png';
import store from "./WidgetSelectionStore";
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import Widget from 'react-biwidget';

@observer
export default class WidgetSelection extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
     this.props.store.SetValues(this.props.data)
  }

  render() {
     
    const { selectType, selectValues,selectPeriodType,selectPeriodValue,measures} = this.props.store.state;
    const {displayKPIWidget,displayY2YWidget,displayTrendsWidget,KPIfilter,KPIselect}=this.props.store;

    var selectOptions = (
      <select
        className="custom-select w-100"
        onChange={this.props.store.setTypeSelected}>
        <option value="">Geography Type...</option>
        {selectType.values.map(geo => (
          <option key={geo.id} value={geo.label}>{geo.label}</option>
        ))}
      </select>  );
      var values = selectValues.values;
    var filteredList = (
      <select className="custom-select w-100" value={selectValues.selected} onChange={this.props.store.setValueSelected}>
        <option value="">Geography Name...</option>
        {values == "" ? "" : values.map(geo => (
              <option key={geo.id} value={geo.label}>{geo.label}</option>
            ))}
      </select>  
    );

    var periodtype = (
      <select
        className="custom-select w-100"
        onChange={this.props.store.setperiodTypeSelected}>
        <option value="">Period Type...</option>
        {selectPeriodType.values.map(per => (
          <option key={per.id} value={per.label}>{per.label}</option>
        ))}
      </select>  );

          var period = (
      <select
        className="custom-select w-100"
        onChange={this.props.store.setperiodSelected}>
        <option value="">Period...</option>
        {selectPeriodValue.values.map(per => (
          <option key={per.id} value={per.label}>{per.label}</option>
        ))}
      </select>  );

    var selectMeasures = (
      <select
        className="custom-select w-100"
        onChange={this.props.store.setmeasuresSelected}>
        <option value="">Measure...</option>
        {measures.values.map(per => (
          <option key={per.id} value={per.label}>{per.label}</option>
        ))}
      </select>  );

      
    

    var sectionStyle = {
      width: "100%",
      height: "200px",
      backgroundImage: `url(${Background})`
    };

     return (
      <div className="container-fluid mx-0 px-0">
       
              <div className="container-fluid mx-0 px-0">
        
          <div className="bi-logo">
              <Media left>
            <Media object src={aculistlogo} alt="Logo" />
          </Media>
          </div>

        
      </div>
        <div style={ sectionStyle }  >        
          
          <center> <div className="d-flex justify-content-center bi-bannertop">It's all about the data...</div> 
          <div className="d-flex justify-content-center bi-bannerbottom">Find the right analytic to unlock your story</div></center></div>
       
        
        <div className="bi-pageheader">
          <Container>
            <Row className="show-grid">
              <Col md="2">
                {selectOptions}
              </Col>
              <Col md="3">
                {filteredList}
              </Col>
                <Col md="3">
                {selectMeasures}
              </Col>
                 <Col md="2">
                {periodtype}
              </Col>
              <Col md="2">
                {period}
              </Col>

          
            </Row>
          
          </Container>
          </div>
          <div>
            <Container className="">
              <Row >
                
                            
                <Col md="2" className="text-center">
                  <h1 className={selectType.selected === '' ? "hidden" : '' }><Badge color="info" className="px-2 roundedbutton"><i className="fa fa-times pointer" onClick={this.props.store.resetTypeSelected} ></i> {selectType.selected}</Badge></h1>
                </Col>
                  <Col md="3" className="text-center">
                <h1 className={selectValues.selected === '' ? "hidden" : '' }><Badge color="info" className="px-3 roundedbutton"><i className="fa fa-times pointer" onClick={this.props.store.resetValueSelected}></i> {selectValues.selected}</Badge></h1>                 
                </Col>
                  <Col md="3" className="text-center">
                  <h1 className={measures.selected === '' ? "hidden" : '' }><Badge color="info" className="px-3 roundedbutton"><i className="fa fa-times pointer" onClick={this.props.store.resetTypeSelected} ></i> {measures.selected}</Badge></h1>
                </Col>              
                 <Col md="2" className="text-center">
                  <h1 className={selectPeriodType.selected === '' ? "hidden" : '' }><Badge color="info" className="px-2 roundedbutton"><i className="fa fa-times pointer" onClick={this.props.store.resetTypeSelected} ></i> {selectPeriodType.selected}</Badge></h1>
                </Col>              
                  <Col md="2" className="text-center">
                <h1 className={selectPeriodValue.selected === '' ? "hidden" : '' }><Badge color="info" className="px-2 roundedbutton"><i className="fa fa-times pointer" onClick={this.props.store.resetValueSelected}></i> {selectPeriodValue.selected}</Badge></h1>                 
                </Col> 
              </Row>
                  <Row >
                 <Col md="4" className={!displayKPIWidget ? "hidden" : '' } >
                    <div id="frameHolder"> 
                       <Widget collection='kpi' select={KPIselect} filter={KPIfilter} geotype={selectType.selected} geoname={selectValues.selected} widgettype='kpi' /></div>
                 </Col>
                      <Col md="4" className={!displayY2YWidget ? "hidden" : '' } >
                    <div id="frameHolder"> 
                     </div>
                 </Col>
                      <Col md="4" className={!displayTrendsWidget ? "hidden" : '' }  >
                    <div id="frameHolder"> 
                      </div>
                 </Col>
              </Row>
         
            </Container>

        
          </div>
        
      </div>
    );
  }
}