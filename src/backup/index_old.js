import React, { Component } from "react";
import { MLSGeography } from "react-mlsdata";
import uniqueId from "lodash/uniqueId";
import uniqBy from "lodash/uniqBy";

class LoadGeography extends Component {
  constructor() {
    super();
    this.state = {
      selectType: {
        label: "GeographyType",
        selected: "",
        values: []
      },
      selectValues: {
        label: "GeographyName",
        selected: "",
        values: []
      }
    };
    this.setTypeSelected = this.setTypeSelected.bind(this);
  }
  setTypeSelected(e) {
    const selectType = this.state.selectType;
    const selectValues = this.state.selectValues;
    var tval = e.target.value;
    selectType.selected = tval;
    const geographies = this.props.data;
    var values = geographies
      .filter(geo => geo.GeographyTypeCode === e.target.value)
      .map(function(val) {
        return {
          type: tval == "ZIP"? val.ZipCode: tval == "County"? val.CountyName: tval == "Area"? val.AreaName: tval == "City"? val.CityName: tval == "School"? val.SchoolName: tval == "SchoolDistrict"? val.SchoolDistrictName: "",
          id: uniqueId(),
          label: tval == "ZIP"? val.ZipCode: tval == "County"? val.CountyName: tval == "Area"? val.AreaName: tval == "City"? val.CityName: tval == "School"? val.SchoolName: tval == "SchoolDistrict"? val.SchoolDistrictName: ""  };
      });
    selectValues.values = values;
    this.setState({
      selectType
    });
  }

   setValuesSelected(e) {
     const selectValues = this.state.selectValues;
     selectValues.selected = e.target.value;
         this.setState({
      selectValues
    });

   }
  render() {
    const geographies = this.props.data;
    const { selectType, selectValues } = this.state;
    var types = uniqBy(geographies, "GeographyTypeCode").map(function(geo) {
      return {
        value: geo.GeographyTypeCode,
        label: geo.GeographyTypeCode,
        id: uniqueId()
      };
    });
    var values = selectValues.values;
    var selectGeoType = (
      <select
        className="custom-select w-100"
        value={selectType.selected}
        onChange={this.setTypeSelected}>
        <option value="">Geography Type...</option>
        {types.map(geo => (
          <option key={geo.id} value={geo.label}>{geo.label}</option>
        ))}
      </select>
    );

    var selectGeoName = (
      <select className="custom-select w-100" value={selectValues.selected} onChange={this.setValuesSelected}>>
        <option value="">Geography Name...</option>
        {values == ""
          ? ""
          : values.map(geo => (
              <option key={geo.id} value={geo.label}>{geo.label}</option>
            ))}
      </select>
    );

    return <div><span>{selectGeoType}</span><span>{selectGeoName}</span></div>;
  }
}

class WidgetSelection extends Component {
  render() {
    var test = (
      <MLSGeography>
        {({ loading, error, data }) => (
          <div>
            {loading && <h2>{`${loading}`}</h2>}
            {error && <h2>{`${error}`}</h2>}
            {data && <LoadGeography data={data.value} />}
          </div>
        )}
      </MLSGeography>
    );

    return <div>{test}</div>;
  }
}

export default WidgetSelection;
