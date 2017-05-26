import React, { Component } from "react";
import { observer } from "mobx-react";
import store from "./WidgetSelectionStore";
import { MLSGeography } from "react-mlsdata";

@observer
export default class FetchData extends Component {
  render() {
    console.log('reached here');
      const store = this.props;
    var test = (
      <MLSGeography>
        {({ loading, error, data }) => (
          <div>
            {loading && <h2>{`${loading}`}</h2>}
            {error && <h2>{`${error}`}</h2>}
            {data && <LoadGeography data={data.value} store={store} />}
          </div>
        )}
      </MLSGeography>
    );

   return null;
  }
}

class LoadGeography extends Component {

  render() {
    const geographies = this.props.data;
   const { SetValues } = this.props.store;
    var types = uniqBy(geographies, "GeographyTypeCode").map(function(geo) {
      return {
        value: geo.GeographyTypeCode,
        label: geo.GeographyTypeCode,
        id: uniqueId()
      };
    });   
    SetValues(types);


     return null;
  }
}