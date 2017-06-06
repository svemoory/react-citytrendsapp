import React, { Component } from "react";
import {Container,Col,Row, Media, Badge, Input, InputGroup, InputGroupButton,Table,Button,Modal,ModalHeader,ModalFooter,ModalBody,Alert} from "reactstrap";
import { observer } from "mobx-react";
import Background from "./Images/background.jpg";
import aculistlogo from './Images/aculist_logo.png';
import store from "./WidgetSelectionStore";
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
//import Widget from 'react-biwidget';
import Widget from 'react-kpiwidget';

@observer
export default class WidgetSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
       this.toggle = this.toggle.bind(this);
  }
    toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  componentDidMount() {
    this.props.store.setgeographyfromdata(this.props.data)
  }

  render() {
     
    const { selectgeotype, selectgeovalue,selectperiodtype,selectperiodvalue,selectmeasure} = this.props.store.state;
    const {displayKPIWidget,displayY2YWidget,displayTrendsWidget,KPIfilter,KPIselect}=this.props.store;

    var selectGeotype = (
      <select
        className="custom-select w-100"
        onChange={this.props.store.setgeotype}>
        <option value="">Geography Type...</option>
        {selectgeotype.values.map(geo => (
          <option key={geo.id} value={geo.value}>{geo.label}</option>
        ))}
      </select>  );
      var values = selectgeovalue.values;
    var selectGeovalue = (
      <select className="custom-select w-100" value={selectgeovalue.selected} onChange={this.props.store.setgeovalue}>
        <option value="">Geography Name...</option>
        {values == "" ? "" : values.map(geo => (
              <option key={geo.id} value={geo.value}>{geo.label}</option>
            ))}
      </select>  
    );

    var selectPeriodtype = (
      <select
        className="custom-select w-100"
        onChange={this.props.store.setperiodtype}>
        <option value="">Period Type...</option>
        {selectperiodtype.values.map(per => (
          <option key={per.id} value={per.value}>{per.label}</option>
        ))}
      </select>  );

          var selectPeriodvalue = (
      <select
        className="custom-select w-100"
        onChange={this.props.store.setperiodvalue}>
        <option value="">Period...</option>
        {selectperiodvalue.values.map(per => (
          <option key={per.id} value={per.value}>{per.label}</option>
        ))}
      </select>  );

    var selectMeasure = (
      <select 
        className="custom-select w-100 selectpicker"
        onChange={this.props.store.setmeasure}>
        <option value="">Measure...</option>
        {selectmeasure.values.map(per => (
          <option key={per.id} value={per.value}>{per.label}</option>
        ))}
      </select>  );

    var embedFrame=('<iframe src="http://localhost:3000/BIWidgets/County/Monterey/KPI" id="ChartFrame" width="800" height="400"></iframe>');
    var embedScript=('<script>src="http://localhost:3000/BIWidgets/widget.js"</script>');

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
                {selectGeotype}
              </Col>
              <Col md="3">
                {selectGeovalue}
              </Col>
                <Col md="3">
                {selectMeasure}
              </Col>
                 <Col md="2">
                {selectPeriodtype}
              </Col>
              <Col md="2">
                {selectPeriodvalue}
              </Col>

          
            </Row>
          
          </Container>
          </div>
          <div>
            <Container className="">
              <Row >
                
                            
                <Col md="2" className="text-center">
                  <h1 className={selectgeotype.selected === '' ? "hidden" : '' }><Badge color="info" className="px-2 roundedbutton"><i className="fa fa-times pointer" onClick={this.props.store.resetTypeSelected} ></i> {selectgeotype.selected}</Badge></h1>
                </Col>
                  <Col md="3" className="text-center">
                <h1 className={selectgeovalue.selected === '' ? "hidden" : '' }><Badge color="info" className="px-3 roundedbutton"><i className="fa fa-times pointer" onClick={this.props.store.resetValueSelected}></i> {selectgeovalue.selected}</Badge></h1>                 
                </Col>
                  <Col md="3" className="text-center">
                  <h1 className={selectmeasure.selected === '' ? "hidden" : '' }><Badge color="info" className="px-3 roundedbutton"><i className="fa fa-times pointer" onClick={this.props.store.resetTypeSelected} ></i> {selectmeasure.selected}</Badge></h1>
                </Col>              
                 <Col md="2" className="text-center">
                  <h1 className={selectperiodtype.selected === '' ? "hidden" : '' }><Badge color="info" className="px-2 roundedbutton"><i className="fa fa-times pointer" onClick={this.props.store.resetTypeSelected} ></i> {selectperiodtype.selected}</Badge></h1>
                </Col>              
                  <Col md="2" className="text-center">
                <h1 className={selectperiodvalue.selected === '' ? "hidden" : '' }><Badge color="info" className="px-2 roundedbutton"><i className="fa fa-times pointer" onClick={this.props.store.resetValueSelected}></i> {selectperiodvalue.selected}</Badge></h1>                 
                </Col> 
              </Row>
                  <Row >
                 <Col md="4" className={!displayKPIWidget ? "hidden" : '' } >
                    <div id="frameHolder" > 
                      <div style={{height:380}}>
                       <Widget collection='kpi' select={KPIselect} filter={KPIfilter} geotype={selectgeotype.selected} geoname={selectgeovalue.selected} widgettype='kpi' />

                       </div>
                       <div className="text-right">
        <Button color="gray" className="roundedbutton" onClick={this.toggle}>Copy Script</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Widget Script</ModalHeader>
          <ModalBody>
            <div>
      <Alert color="warning">
        <strong>iFrame script</strong> <p>{embedFrame} </p>  </Alert>
      <Alert color="warning">
        <strong>Embed script</strong> {embedScript}
      </Alert>
      <Alert color="warning">
        <strong>npm install</strong> <p>npm install react-biwidget --save</p>
      </Alert>
 
    </div>
          </ModalBody>
          <ModalFooter>           
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div></div>

                 </Col>
                      <Col md="4" className={!displayY2YWidget ? "hidden" : '' } >
                    <div id="frameHolder"> 
                        <div style={{height:380}}>
<Table striped>
        <thead>
          <tr>
          <th>#</th>  
            <th>YTD2017</th>
            <th>YTD2016</th>
            <th>%Change</th>
          </tr>
        </thead>
        <tbody>
          <tr>  
            <th scope="row">DOM</th>          
            <td>51</td>
            <td>27</td>
            <td>19</td>
          </tr>
          <tr>
           <th scope="row">Inventory</th>
            <td>10</td>
            <td>42</td>
            <td>5</td>
          </tr> 
        </tbody>
      </Table>
      </div>
      <div className="text-right">
        <Button color="gray" className="roundedbutton" onClick={this.toggle}>Copy Script</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Widget Script</ModalHeader>
          <ModalBody>
            <div>
      <Alert color="warning">
        <strong>iFrame script</strong> <p>{embedFrame} </p>  </Alert>
      <Alert color="warning">
        <strong>Embed script</strong> {embedScript}
      </Alert>
      <Alert color="warning">
        <strong>npm install</strong> <p>npm install react-biwidget --save</p>
      </Alert>
 
    </div>
          </ModalBody>
          <ModalFooter>           
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
     
                     </div>
                 </Col>
                      <Col md="4" className={!displayTrendsWidget ? "hidden" : '' }  >
                    <div id="frameHolder"> 
                        <div style={{height:380}}>
                       <Widget collection='kpi' select={KPIselect} filter={KPIfilter} geotype={selectgeotype.selected} geoname={selectgeovalue.selected} widgettype='markettrends' />
                      </div>
                      <div className="text-right">
        <Button color="gray" className="roundedbutton" onClick={this.toggle}>Copy Script</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Widget Script</ModalHeader>
          <ModalBody>
            <div>
      <Alert color="warning">
        <strong>iFrame script</strong> <p>{embedFrame} </p>  </Alert>
      <Alert color="warning">
        <strong>Embed script</strong> {embedScript}
      </Alert>
      <Alert color="warning">
        <strong>npm install</strong> <p>npm install react-biwidget --save</p>
      </Alert>
 
    </div>
          </ModalBody>
          <ModalFooter>           
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
                      </div>
                 </Col>
              </Row>
         
            </Container>

        
          </div>
        
      </div>
    );
  }
}