import React, { Component } from "react";
import { Container, Col, Row, Media, Button } from "reactstrap";
//import "bootstrap/dist/css/bootstrap.css";
import "./styles/App.css";
import KPIWidget from "react-kpiwidgetdata";
import MTWidget from "react-markettrendswidget";



export default class KPI_Trends extends Component {
  constructor(props) {
    super(props);
    this.state = {  
  widgetselectionsMT:{
     geographytype:'City',
     geographyvalue:'Sunnyvale',
     measure:'SoldMedListPrice',
     measurelabel:'Median Sale Price',
     isnum:'true',
    periodtype:'Month',
period:'12',
geo:""
},
  widgetselectionsKPI:{
     measure:'SoldMedListPrice',
     geo:""
},
      
    };  
  }

    componentWillMount(){
   console.log(this.props.geo.split(','));
       let widgetselectionsMT={...this.state.widgetselectionsMT};
 let widgetselectionsKPI={...this.state.widgetselectionsKPI};
 widgetselectionsMT.geo=this.props.geo.split(',');
widgetselectionsKPI.geo=this.props.geo.split(',');
this.setState({ widgetselectionsMT,widgetselectionsKPI});  
  }

  componentWillReceiveProps(nextProps){
   
       let widgetselectionsMT={...this.state.widgetselectionsMT};
 let widgetselectionsKPI={...this.state.widgetselectionsKPI};
 widgetselectionsMT.geo=nextProps.geo.split(',');
widgetselectionsKPI.geo=nextProps.geo.split(',');
this.setState({ widgetselectionsMT,widgetselectionsKPI});  
  }

  render() {
console.log(this.state.widgetselectionsKPI);
    return  <div>
           <Container fluid={true}>
    
        <Row>
          <Col sm={{ size: 6, push: 2, pull: 2, offset: 1 }}><MTWidget widgetselections={this.state.widgetselectionsMT} assets="" /></Col>
        </Row>
        <Row>
          <Col sm={{ size: 6, push: 2, pull: 2, offset: 1 }}><KPIWidget widgetselections={this.state.widgetselectionsKPI} assets="" /></Col>
        </Row>
         

      </Container>

        </div>
  }

}
