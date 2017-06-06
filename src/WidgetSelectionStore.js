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
    selectgeotype: {
      label: "GeographyType",
      selected: "",
      values: []
    },
    selectgeovalue: {
    label: "GeographyName",
    selected: "",
    values: []
    },
   selectperiodtype: {
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
   selectperiodvalue: {
    label: "PeriodValue",
    selected: "",
    values: []
  },
  selectmeasure:{
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
        label: "SaleVolume"
      },
                       {
        value: "InventoryCount",
        id: "M6",
        label: "InventoryCount"
      } 
      ]
  },
  monthvals:[{ value: "3", id: "M1",label: "3"},
  { value: "6", id: "M2",label: "6"},
  { value: "12", id: "M3",label: "12"},

  ],
  qvals:[{ value: "2", id: "Q1",label: "2"},
  { value: "4", id: "Q2",label: "4"},
  
  ],
  yearvals:[{ value: "2", id: "Y1",label: "2"},
  { value: "5", id: "Y2",label: "5"},
  { value: "10", id: "Y3",label: "10"}
],
entity:"Market",
entityvalue:"MLSL",
geographies : [],
assets:{
    font:{fontsize:"",fontstyle:""},
    color:{color:"Black"},
    images:{logo:"",measureimages:[]}
},

widgetselections:{
geographytype:'',
geographyvalue:'',
measure:'',
measurelabel:'',
isnum:false,
periodtype:'',
period:''
}
  };

  //populate all geographies
   @action setgeographyfromdata=newValues=> {
   
     this.state.geographies=newValues;
    var types = uniqBy(newValues, "GeographyTypeCode").map(function(geo) {
      return {
        value: geo.GeographyTypeCode,
        label: geo.GeographyTypeCode,
        id: uniqueId()
      };
    });
     this.state.selectgeotype.values=types;
  };


  //on geography selection
    @action setgeotype = e => {
     
   this.state.selectgeotype.selected = e.target.value;
   this.state.selectgeovalue.selected = "";
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
      this.state.selectgeovalue.values = values;
      this.state.widgetselections.geographytype=tval;
  };

   @action setgeovalue = e => {
    
   this.state.selectgeovalue.selected = e.target.value;
   this.state.widgetselections.geographyvalue=e.target.value;
  };


//Period
    @action setperiodtype = e => {     
  // this.state.selectType.selected = e.target.value;
   this.state.selectperiodvalue.selected = "";
   var tval = e.target.value; 
   var periodvalues=[]; 
   var periodvalues=tval=='Month'?this.state.monthvals:tval=='Quarter'?this.state.qvals:tval=='Year'?this.state.yearvals:[];
   this.state.selectperiodvalue.values = periodvalues;
   this.state.selectperiodtype.selected=tval;
   this.state.widgetselections.periodtype=tval;
  };
   @action setperiodvalue = e => {
   this.state.selectperiodvalue.selected = e.target.value;
   this.state.widgetselections.period=e.target.value;
  };

    @action setmeasure = e => {
   var tval = e.target.value;   
   this.state.selectmeasure.selected = tval;
   this.state.widgetselections.measure=tval;
  this.state.widgetselections.measurelabel=tval;
  var isnum1=tval=='SoldMedListPrice'?'true':tval=='AvgSalePricePerSqft'?'true':'false;'
  this.state.widgetselections.isnum=isnum1;
  };




//computed values
  @computed get displayKPIWidget()
  {
      
    let display=false;
 var geotype =this.state.selectgeotype.selected;
    var geoname =this.state.selectgeovalue.selected;
    var measure =this.state.selectmeasure.selected;
  
    if (measure !== "" && geotype !== "" && geoname !== "") {
     display=true;
    
    }
return display;
  }

   @computed get displayY2YWidget()
  {
      
    let display=false;
 var geotype =this.state.selectgeotype.selected;
    var geoname =this.state.selectgeovalue.selected;
    var measure =this.state.selectmeasure.selected;
    var periodtype =this.state.selectperiodtype.selected;
  
    if (measure !== "" && geotype !== "" && geoname !== "" && periodtype !== "") {
     display=true;
    
    }
return display;
  }

   @computed get displayTrendsWidget()
  {
      
    let display=false;
 var geotype =this.state.selectgeotype.selected;
    var geoname =this.state.selectgeovalue.selected;
    var measure =this.state.selectmeasure.selected;
      var periodtype =this.state.selectperiodtype.selected;
    var period =this.state.selectperiodvalue.selected;
  
    if (measure !== "" && geotype !== "" && geoname !== "" && periodtype !== "" && period !== "") {
     display=true;
    
    }
return display;
  }
/*@computed get KPIfilter(){
 var geotype =this.state.selectgeotype.selected;
    var geoname =this.state.selectgeovalue.selected;
    var measure =this.state.selectmeasure.selected;

      if (measure !== "" && geotype !== "" && geoname !== "") {
     const filter ={and: [{GeographyType: `${this.state.selectgeotype.selected}`}, { GeographyName:`${this.state.selectgeovalue.selected}`},{Class : 'Residential'}]} ;
    return filter;
    }

  else
  return "";
  
}

@computed get KPIselect(){
        
  if(this.state.selectmeasure.selected!="")
  {
  const select =`GeographyName,GeographyType,SoldCount,${this.state.selectmeasure.selected}`;

  return select;
}
else
return "";
}*/

}


var store = (window.store = new WidgetSelectionStore());

export default store;
