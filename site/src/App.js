import React from 'react';
import { MLSGeography } from "react-mlsdata";
import WidgetSelection from '../../src';
import store from "../../src/WidgetSelectionStore";

class App extends React.Component{
  constructor() {
super();
this.handlechange=this.handlechange.bind(this);
  }
  handlechange(e)
  {
//console.log(e);
  }
render(){

  return (
 <div>
  <MLSGeography onChange={this.handlechange}>
        {({ loading, error, data }) => (
          <div>
            {loading && <h2>{`${loading}`}</h2>}
            {error && <h2>{`${error}`}</h2>}
            {data && <WidgetSelection data={data.value} store={store} />}
          </div>
        )}
      </MLSGeography>
  </div>
);
}
}
export default App;
