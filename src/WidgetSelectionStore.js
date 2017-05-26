import React, { Component } from "react";
import { observable, computed, action } from "mobx";
import uniqueId from "lodash/uniqueId";
import FetchData from "./FetchData";
import uniqBy from "lodash/uniqBy";
import $ from 'jquery';


class WidgetSelectionStore {
  constructor() {
   
  }

  @observable state = {
    selectType: {
      label: "GeographyType",
      selected: "",
      values: []
    },
      selectValues: {
    label: "GeographyName",
    selected: "",
    values: []
  },
   selectPeriodType: {
    label: "PeriodTYpe",
    selected: "",
    values: [ {
        value: "Month",
        id: "P1",
        label: "Month"
      },
      {
        value: "Quarter",
        id: "P2",
        label: "Quarter"
      },
      {
        value: "Year",
        id: "P3",
        label: "Year"
      }]
  },
   selectPeriodValue: {
    label: "PeriodValue",
    selected: "",
    values: []
  },
  measures:{
       label: "Measures",
    selected: "",
    values: [     {
        value: "SoldMedListPrice",
        id: "M1",
        label: "SoldMedListPrice"
      },
      {
        value: "AvgSalePricePerSqft",
        id: "M2",
        label: "AvgSalePricePerSqft"
      },
      {
        value: "SoldAvgDOM",
        id: "M3",
        label: "SoldAvgDOM"
      },
           {
        value: "SoldCount",
        id: "M4",
        label: "SoldCount"
      },
                 {
        value: "SaleVolume",
        id: "M5",
        label: "Sale Volume"
      },
                       {
        value: "Inventory",
        id: "M6",
        label: "Inventory"
      },
                             {
        value: "Default",
        id: "M7",
        label: "Default"
      }
 
      ]
  },
  monthvals:[{ value: "01", id: "M1",label: "January"},
  { value: "02", id: "M2",label: "February"},
  { value: "03", id: "M3",label: "March"},
  { value: "04", id: "M4",label: "April"},
  { value: "05", id: "M5",label: "May"},
  { value: "06", id: "M6",label: "June"},
  { value: "07", id: "M7",label: "July"},
  { value: "08", id: "M8",label: "August"},
  { value: "09", id: "M9",label: "September"},
  { value: "10", id: "M10",label: "October"},
  { value: "11", id: "M11",label: "November"},
  { value: "12", id: "M12",label: "December"}  
  ],
  qvals:[{ value: "Q1", id: "M1",label: "Q1"},
  { value: "Q2", id: "Q2",label: "Q2"},
  { value: "Q3", id: "Q3",label: "Q3"},
  { value: "Q4", id: "Q4",label: "Q4"},
  ],
  yearvals:[{ value: "2017", id: "Y1",label: "2017"},
  { value: "2016", id: "Y2",label: "2016"},
  { value: "2015", id: "Y3",label: "2015"},
  { value: "2014", id: "Y4",label: "2014"},
  { value: "2013", id: "Y5",label: "2013"}],
entity:"Market",
entityvalue:"MLSL",

geographies : []
  };


//Period
    @action setperiodTypeSelected = e => {
      console.log
  // this.state.selectType.selected = e.target.value;
   this.state.selectPeriodValue.selected = "";
   var tval = e.target.value; 
   var periodvalues=[]; 
var periodvalues=tval=='Month'?this.state.monthvals:tval=='Quarter'?this.state.qvals:tval=='Year'?this.state.yearvals:[];
      this.state.selectPeriodValue.values = periodvalues;
      this.state.selectPeriodType.selected=tval;
  };
   @action setperiodSelected = e => {
   this.state.selectPeriodValue.selected = e.target.value;
  };


//geographies
    @action setTypeSelected = e => {
   this.state.selectType.selected = e.target.value;
   this.state.selectValues.selected = "";
   var tval = e.target.value;
   const geographies=this.state.geographies;
    var values = geographies
      .filter(geo => geo.GeographyTypeCode === e.target.value)
      .map(function(val) {
        return {
          type: tval == "ZIP"? val.ZipCode: tval == "County"? val.CountyName: tval == "Area"? val.AreaName: tval == "City"? val.CityName: tval == "School"? val.SchoolName: tval == "SchoolDistrict"? val.SchoolDistrictName: "",
          id: uniqueId(),
          label: tval == "ZIP"? val.ZipCode: tval == "County"? val.CountyName: tval == "Area"? val.AreaName: tval == "City"? val.CityName: tval == "School"? val.SchoolName: tval == "SchoolDistrict"? val.SchoolDistrictName: ""  };
      });
      this.state.selectValues.values = values;
  };

   @action setValueSelected = e => {
   this.state.selectValues.selected = e.target.value;
  };

    @action setmeasuresSelected = e => {
   this.state.measures.selected = e.target.value;
  };




//populate all geographies
   @action SetValues(newValues) {
     this.state.geographies=newValues;
    var types = uniqBy(newValues, "GeographyTypeCode").map(function(geo) {
      return {
        value: geo.GeographyTypeCode,
        label: geo.GeographyTypeCode,
        id: uniqueId()
      };
    });
     this.state.selectType.values=types;
  };

//computed values
  @computed get displayKPIWidget()
  {
      
    let display=false;
 var geotype =this.state.selectType.selected;
    var geoname =this.state.selectValues.selected;
    var measure =this.state.measures.selected;
  
    if (measure !== "" && geotype !== "" && geoname !== "") {
     display=true;
    
    }
return display;
  }

   @computed get displayY2YWidget()
  {
      
    let display=false;
 var geotype =this.state.selectType.selected;
    var geoname =this.state.selectValues.selected;
    var measure =this.state.measures.selected;
    var periodtype =this.state.selectPeriodType.selected;
  
    if (measure !== "" && geotype !== "" && geoname !== "" && periodtype !== "") {
     display=true;
    
    }
return display;
  }

   @computed get displayTrendsWidget()
  {
      
    let display=false;
 var geotype =this.state.selectType.selected;
    var geoname =this.state.selectValues.selected;
    var measure =this.state.measures.selected;
      var periodtype =this.state.selectPeriodType.selected;
    var period =this.state.selectPeriodValue.selected;
  
    if (measure !== "" && geotype !== "" && geoname !== "" && periodtype !== "" && period !== "") {
     display=true;
    
    }
return display;
  }
@computed get KPIfilter(){
 var geotype =this.state.selectType.selected;
    var geoname =this.state.selectValues.selected;
    var measure =this.state.measures.selected;

      if (measure !== "" && geotype !== "" && geoname !== "") {
     const filter ={and: [{GeographyType: `${this.state.selectType.selected}`}, { GeographyName:`${this.state.selectValues.selected}`},{Class : 'Residential'}]} ;
    return filter;
    }

  else
  return "";
  
}

@computed get KPIselect(){
        
  if(this.state.measures.selected!="")
  {
  const select =`GeographyName,GeographyType,${this.state.measures.selected}`;
  console.log('select',select);
  return select;
}
else
return "";
}

}







var store = (window.store = new WidgetSelectionStore());

export default store;
