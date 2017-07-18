import React from 'react';
import { MLSGeography } from "react-mlsdata";
import WidgetSelection from '../../src';


class App extends React.Component{
  constructor() {
super();
this.handlechange=this.handlechange.bind(this);
  }
  handlechange(e)
  {
/*      console.log(e.loading);
  if(e.loading=='false')
  {
   //console.log(!e.loading);
   // store.setgeographyfromdata(e.data);
  }*/

  }
render(){

  return (
 <WidgetSelection  />);
}
}
export default App;
