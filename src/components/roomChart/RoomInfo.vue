<template>

  
    
      

    <ion-content>
      <ion-header>
      <ion-toolbar>
        <ion-title>Room info</ion-title>
      </ion-toolbar>
    </ion-header>
      <ion-card v-if="choice">
        
        <ion-card-header>
          <ion-card-title class="centering">Data filtering</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-grid >
  <ion-row >
      <ion-col >
      <ion-item   detail='false' lines="none"  button @click="monthly=true;choice=false">
          <ion-label  >
           <p class="img-wrapper items round">
                Months
      </p>
          </ion-label>
        </ion-item>
    </ion-col>
     <ion-col >
      <ion-item    detail='false' lines="none"  button @click="byHours=true;choice=false">
          <ion-label >
           <p class="img-wrapper items round">
                Days
      </p>
          </ion-label>
        </ion-item>
    </ion-col>
   
     
         </ion-row >
      </ion-grid >
        </ion-card-content>
      </ion-card>
     <ion-grid  >
       <div class="margintop"></div>
        <transition
      mode="out-in"
      appear
      enter-active-class="animated flipInX fast"
      leave-active-class="animated flipOutX fast"
    >
  <ion-row class="rowcentr" key="day" v-if="byHours">
   
     <ion-col size-xl="4" size-lg="4" size-md="4" size-sm="4" size-xs="6">
       <datepicker
          placeholder="Day ..."
          class="datepicker centerside"
          :format="customFormatter"
          v-model.lazy="singleDay"
          :disabled-dates="disabledDates"
        ></datepicker>
        
    </ion-col>
       <ion-col size-xl="4" size-lg="4" size-md="4" size-sm="4" size-xs="12" >
         <div>
    <div class="spacebottom centerside">
          <custom-select
            v-model.lazy="singleDayValueType"
            placeholder="Value type ..."
            class="style-chooser"
            :options="valueTypeArr"
          ></custom-select>
        </div>     
        <div v-if="!choice" class="centerside">
          <custom-select
            v-model.lazy="storedRoom"
            placeholder="Room ..."
            class="style-chooser"
            :options="roomList"
          ></custom-select>
        </div>
        </div>
   </ion-col>
   <ion-col size-xl="4" size-lg="4" size-md="4" size-sm="4" size-xs="6">
     <div class="centerside">
     <button class="btnselect" v-on:click="monthly=true;byHours=false;controll=false;">
          Months
        </button>
        </div>
   </ion-col>
    
   
         </ion-row >

 <ion-row class="rowcentr" key="month" v-if="monthly">
   
     <ion-col size-xl="4" size-lg="5" size-md="5" size-sm="12" size-xs="12">
      <div class="centerside">
     <datepicker
          class="datepicker paddright centerside2"
          placeholder="First date ..."
          :format="customFormatter"
          v-model.lazy="dateStart"
          :disabled-dates="disabledDates"
        ></datepicker>
 <datepicker
          class="datepicker centerside2"
          placeholder="Last date ..."
          :format="customFormatter"
          v-model.lazy="dateEnd"
          :disabled-dates="disabledDates"
        ></datepicker>
       </div>
        
    </ion-col>
     
  
     <ion-col size-xl="4" size-lg="5" size-md="5" size-sm="12" size-xs="12" >
        
        <div class="spacebottom centerside ">
          <custom-select
            v-model.lazy="selectedValueType"
            placeholder="Value type ..."
            class="style-chooser"
            :options="valueTypeArr"
          ></custom-select>
        </div>
        <div v-if="!choice" class="centerside">
          <custom-select
            v-model.lazy="storedRoom"
            placeholder="Room ..."
            class="style-chooser"
            :options="roomList"
          ></custom-select>
        </div>
   </ion-col>
    <ion-col size-xl="2" size-lg="2" size-md="2" size-sm="12" size-xs="12">
     <div class="centerside">
    <button v-on:click="byHours=true;monthly=false;controll=false;">
          Days
        </button>
        </div>
 </ion-col>
         </ion-row >
 </transition>
 
 <ion-col size-xl="10" size-lg="10" size-md="10" size-sm="10" size-xs="10">
    <ion-card v-if="!choice">
 
    <ion-card-content >
             <Chart style="height: 60vh !important;" v-if="!choice" ref="data_chart" :chart-data="chartData" :options="options"></Chart>

    </ion-card-content>
  </ion-card>

    </ion-col>
 <div v-if="!choice">
<ion-col size-xl="4" size-lg="4" size-md="12" size-sm="12" size-xs="12">
  <div class="togglers title3"> Current data <img  alt="Not Found"  src="../../assets/gauge.png" height="25">: 
  <toggle-button class="toBack" v-model="myDataVariable" :labels="{checked: 'On', unchecked: 'Off'}"/></div>

    </ion-col>
    <div class="togglers" v-if=myDataVariable> 
<ion-col size-xl="4" size-lg="4" size-md="12" size-sm="12" size-xs="12">
 
  Controller <img  alt="Not Found"  src="../../assets/microcont.png" height="25">: 
    <toggle-button class="toBack" v-model="showController" :labels="{checked: 'On', unchecked: 'Off'}"/>  
   
    </ion-col>
  <ion-col size-xl="4" size-lg="4" size-md="12" size-sm="12" size-xs="12">
  Sensor <img  alt="Not Found"  src="../../assets/sensor.png" height="32">: 
    <toggle-button class="toBack" v-model="showSensor" :labels="{checked: 'On', unchecked: 'Off'}"/>

    </ion-col>
    </div>
    </div>
      <ion-col size="12">

 <transition 
    appear
    mode="in-out"
    enter-active-class="animated fadeIn faster"
    leave-active-class="animated fadeOut faster"
    >

   <div v-if="!choice && myDataVariable" class="animated fadeIn">
       <div class="title2"><b class="title">Current Data</b></div>
    <table >
        <tr v-for="(item,index) in currentData" class="animated fadeIn" :key="item.id" :style="{backgroundColor:colors[index % colors.length]}" >
          <td v-if=showCurrentData >
          <div class="newLine" v-if=showSensor> <img  alt="Not Found"  src="../../assets/sensor.png" height="20vw"> {{item.sensor}}</div>
          <div class="newLine" v-if=showController> <img  alt="Not Found"  src="../../assets/microcont.png" height="20vw"> {{item.controller}} </div>
          <div class="newLine" ><img  alt="Not Found"  src="../../assets/gauge.png" height="20vw"> {{item.valuetype}} - {{item.data}} {{item.dimension}}</div>
          </td>
        </tr>
    </table>
   </div>
    </transition>
</ion-col>
      </ion-grid>
 
   
   
   <Modal v-if="showModal" @close="showModal = false">
       
        <h3 slot="header">This room has no data.</h3>
      </Modal>
        <Modal v-if="showSecondModal" @close="showSecondModal = false">
       
        <h3 slot="header">No data.</h3>
      </Modal>
 </ion-content>
   
    

    

 

</template>

<script>
import store from '../../store/store';
import Chart from "./Chart";
import Modal from "./Modal";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Datepicker from "vuejs-datepicker";
var moment = require("moment");
import {mapGetters} from 'vuex';

const options = {
responsive:true,
maintainAspectRatio:false,


tooltips: {
    mode: 'index',
    intersect: false,
   }

,
  legend: {
    onClick: e => e.stopPropagation(),
    labels: {
      fontSize: 20
    }
  },
  animation: {
    animateRotate: false
  },
  customLine: {
color: 'dodgerblue'
}
 
};


export default {
  components: {
    vSelect,
    Datepicker,
    Chart,
    Modal
  },
  
  name: "app",
  
  data() {
    return {
                  port:'https://dataprjct.herokuapp.com',
    dataFromPusher:store.getters.giveTrigger,
    currentData:[],
      dimVal: [],
      showModal:false,
      showSecondModal:false,
      controll:false,
      showSensor:false,
      showController:false,
      myDataVariable:false,
      hover: false,
      colors: ["#8eeb92", "white"],
      arrSingleDay: [],
      singleDayValueType: "",
      singleDay: "",
      storedRoom: '',
      dateStart: "",
      dateEnd: "",
      hoursStart: "",
      hoursEnd: "",
      monthly: false,
      byHours: false,
      choice: true,
      moment,
      valueTypeArr: [],
      selectedValueType: "",
      dataForGraph: [],
      dataLabel: [],
      dataGraph: [],
      roomList: [],
      options,
      chartData: {
        labels: [],
        datasets: [
          {
        pointBackgroundColor:"rgba(30, 143, 255, 0.281)",
            pointRadius: 0,
            backgroundColor: ["rgba(30, 143, 255, 0.281)"],
            borderColor: ["rgba(228, 6, 127, 1)"],
            borderWidth: 0,
            pointHoverRadius: 0,
            label: "",
            data: []
          }
        ]
      },

      disabledDates: {
        to: new Date(2019, 11, 25),
        from: new Date(Date.now()) 
      }
    };
  },
  computed: {
   
    myStyles(){
      return{
        height:50+'px',
         position: 'relative'
         
      }
    },
    currentDataSet() {
      return this.chartData.datasets[0].data;
    },
    
  },
  watch: {
    dataGraph(){
      if(this.dataGraph.length===0 && this.controll===true){
          this.showSecondModal=true;
      }
    },
    dataFromPusher(){
       this.showCurrentData()
    },
    choice(){
    this.showCurrentData()
    },
    myDataVariable(){
      console.log(this.myDataVariable)
    },
    storedRoom() {
      this.showCurrentData()
      this.dropDvalues();
      this.selectedValueType="";
      this.singleDayValueType="";
      console.log(this.valueTypeArr);
      if (this.monthly) {
        this.intervalData();
      } else {
        this.singleDayCheck();
      }
    },
    
    monthly() {
       this.dataGraph = [];
      this.dataLabel = [];
      this.selectedValueType = "";
      this.singleDayValueType = "";
      this.dateStart = "";
      this.dateEnd = "";
      this.singleDay = "";
      this.refreshChart();
    },
    singleDay() {
      this.singleDayCheck();
    },
    singleDayValueType() {
      this.singleDayCheck();
      if (this.singleDayValueType === null) {
        this.singleDayValueType = "";
      }else{
        this.controll=true
      }
    },
    dateStart() {
      this.intervalData();
    },
    dateEnd() {
      this.intervalData();
    },
    selectedValueType() {
      this.intervalData();
      if (this.selectedValueType === null) {
        this.selectedValueType = "";
        this.dataGraph = [];
        this.dataLabel = [];
        this.refreshChart();
      }else{
        this.controll=true
      }
    },
    valueTypeArr(){
      if(this.valueTypeArr.length===0){
          this.showModal=true;
          this.choice=false;
          this.monthly=true;
      }
    }
  },
  methods: {
   
    ...mapGetters([
          'giveroom',
          'giveRooms'
       ]),
     compare( a, b ) {
    if ( a.valuetype.toLowerCase() < b.valuetype.toLowerCase() ){
      return -1;
    }
    if ( a.valuetype.toLowerCase() > b.valuetype.toLowerCase() ){
      return 1;
    }
    return 0;
  },
      showCurrentData(){
        this.currentData.splice(0);
        var filtered=this.dataFromPusher.filter(m =>
        m.room.includes(this.storedRoom));
      for (let index = 0; index <  filtered.length; index++) {
          this.currentData.push({
              valuetype: "",
              dimension:"",
              controller:"",
              sensor:"",
              data:"",
              id:""
           
            });
          
        this.currentData[index].valuetype=(filtered[index].valuetype)
         this.currentData[index].dimension=(filtered[index].dimension)
        this.currentData[index].data=(filtered[index].data)
        this.currentData[index].controller=(filtered[index].controllername)
        this.currentData[index].sensor=(filtered[index].sensorname)
        this.currentData[index].id=(' - '+filtered[index].id)
      }
      
              this.currentData.sort(this.compare);

      },
    
    dropDvalues() {
      //andme tüübi rippmenüüsse salvestamine vastavalt ruumi
      this.$http
        .get(
          this.port+"/api/data/valuetypes/" + this.storedRoom + ""
        )
        .then(response => {
          return response.json();
        })
        .then(data => {
          const resultArray = [];
          for (let key in data) {
            resultArray.push(data[key]);
          }
          var count = 0;
          this.valueTypeArr = [];
          for (let index = 0; index < resultArray[1].length; index++) {
            if (resultArray[1][index].valuetype === "Illuminance" &&
              count === 0) {
              this.valueTypeArr.push(resultArray[1][index].valuetype);
            } else if (resultArray[1][index].valuetype !== "Illuminance") {
              this.valueTypeArr.push(resultArray[1][index].valuetype);
            }
            if (resultArray[1][index].valuetype === "Illuminance") {
              count++;
            }
          }
        });
    },
  
    handler() {
      this.$router.go(-1);
    },
    graphDataManipulation(array, intervalForAvg) {
      var temparr = [];
      var countHours = 0;
      var countDates = 0;
      var arrForAvg = [];
      var avgData = 0;
      var tempForRestData = {};
      var tempHold = array;
      for (let index = 0; index < tempHold.length; index++) {
        if (countHours === 0) {
          temparr.push({
            date: tempHold[index].date,
            data: "",
            controllername: "",
            dimension: "",
            room: "",
            sensorname: "",
            valuetype: ""
          });
        }
        if (Math.abs(new Date(temparr[countDates].date) - new Date(tempHold[index].date))
         /36e5 >intervalForAvg) 
         {
          var total = 0;
          for (var i = 0; i < arrForAvg.length; i++) {
            total += arrForAvg[i];
          }
          var avg = total / arrForAvg.length;
          if(avg!==0){
          temparr[countDates].data = avg;
          temparr[countDates].room = tempHold[index].room;
          temparr[countDates].controllername = tempHold[index].controllername;
          temparr[countDates].dimension = tempHold[index].dimension;
          temparr[countDates].sensorname = tempHold[index].sensorname;
          temparr[countDates].valuetype = tempHold[index].valuetype;
          }
          
          arrForAvg = [];
          countHours = 0;
          countDates++;
        } else {
          arrForAvg.push(tempHold[index].data);
          countHours++;
        }
      }
      return (temparr = temparr.filter(item => item.data !== ""));
    },
    singleDayCheck() {
      if (this.singleDay !== "" && this.singleDayValueType !== "") {
        this.singleDayData();
      }
    },
    sameDay(d1, d2) {
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    },
    updateChart() {
      if (this.$refs.data_chart) {
        this.$refs.data_chart.update();
      }
    },
    refreshChart() {
      const currentDataset = this.chartData.datasets[0];

      this.chartData.labels = this.dataLabel;
      if (this.selectedValueType != "" || this.singleDayValueType != "") {
        var compare =
          this.selectedValueType.toLowerCase() +
          this.singleDayValueType.toLowerCase();
        let dim = this.dimVal.filter(
          m => m.valuetype.toLowerCase() === compare
        );
        currentDataset.label =
          this.selectedValueType +
          this.singleDayValueType +
          ", " +
          dim[0].dimension;
      } else {
        currentDataset.label = "";
      }

      currentDataset.data = this.dataGraph;
      this.updateChart();
    },
    async singleDayData() {
      try {
        await this.$http
          .get(
            this.port+"/api/data/" +
              this.storedRoom +
              "/" +
              moment(this.singleDay).format("YYYY-MM-DD") +
              "/" +
              this.singleDayValueType +
              ""
          )
          .then(response => {
            return response.json();
          })
          .then(data => {
            const resultArray = [];
            for (let key in data) {
              resultArray.push(data[key]);
            }

            this.arrSingleDay = resultArray[1];
          });
      } catch (error) {
        console.log(error);
      }

      var temp = this.graphDataManipulation(this.arrSingleDay, 0.1);

      this.dataGraph = [];
      this.dataLabel = [];
      for (let index = 0; index < temp.length; index++) {
        this.dataGraph.push(temp[index].data.toFixed(2));
        this.dataLabel.push(
          moment(temp[index].date).format("HH:mm")
        );
      }
      this.refreshChart();
    },
    async intervalData() {
      try {
        if (this.dateStart !== "" && this.dateEnd !== "") {
          await this.$http
            .get(
              this.port+"/api/data/room/interval/" +
                moment(this.dateStart).format("YYYY-MM-DD") +
                "/" +
                moment(this.dateEnd).format("YYYY-MM-DD") +
                ""
            )
            .then(response => {
              return response.json();
            })
            .then(data => {
              const resultArray = [];
              for (let key in data) {
                resultArray.push(data[key]);
              }
              this.dataChart = resultArray[1];
               
            });
        }
      } catch (error) {
        console.log(error);
      }
      if (
        this.dateStart !== "" &&
        this.dateEnd !== "" &&
        this.selectedValueType !== "" &&
        this.selectedValueType !== null
      ) {
        let filtered = this.dataChart;

        if (this.selectedValueType) {
          filtered = this.dataChart.filter(
            m =>
              m.valuetype.toLowerCase() === this.selectedValueType.toLowerCase()
          );
        }

        if (this.storedRoom) {
          filtered = filtered.filter(
            m => m.room.toLowerCase() === this.storedRoom.toLowerCase()
          );
        }

        filtered.sort(function(a, b) {
          return (
            new Date(moment(a.date).format("YYYY-MM-DD")) -
            new Date(moment(b.date).format("YYYY-MM-DD"))
          );
        });
        var temp = this.graphDataManipulation(filtered, 4); 
       
        this.dataGraph = [];
        this.dataLabel = [];
        for (let index = 0; index < temp.length; index++) {
          this.dataGraph.push(temp[index].data.toFixed(2));
          this.dataLabel.push(
            moment(temp[index].date).format("YYYY-MM-DD")
          );
        }
        this.refreshChart();
        
      }
    },
    customFormatter(date) {
      return moment(date).format("MMM/DD/YY");
    }
  },

  beforeDestroy() {
    window.removeEventListener("unload", this.handler);
  },
  mounted() {


    window.addEventListener("unload", this.handler);
  },
  async created() {
    
    this.$http
      .get(this.port+"/api/dimensions/valuetypes")
      .then(response => {
        return response.json();
      })
      .then(data => {
        const resultArray = [];
        for (let key in data) {
          resultArray.push(data[key]);
        }
        this.dimVal = resultArray[1];
      
      });
   this.storedRoom = this.$store.getters.giveroom;
    this.roomList = this.$store.getters.giveRooms;
       await this.$http
      .get(this.port+'/api/rooms')
      .then(response => {
        return response.json();
      })
      .then(data => {
        //andmete salvestamine andmebaasist
        const resultArray = [];
        for (let key in data) {
          resultArray.push(data[key]);
        }
        //rippmenuu ruumid taitmine
        var object = resultArray[1];
        for (var property in object) {
          if (object[property].room != null) {
            this.roomList.push(object[property].room);
          }
        }
        //ruumide loendi sorteerimine (kasv)
        var collator = new Intl.Collator(undefined, {
          numeric: true,
          sensitivity: "base"
        });
        this.roomList.sort(collator.compare);
        

              this.$store.commit('roomsFill',this.roomList);
      });
  }
  
};
</script>

<style scoped>
ion-grid{
  padding-top: 5px !important;
}
.margintop2{
 
  padding-top: 25px;
}
.rowcentr{
  justify-content:center !important;
}
.spacebottom{
  padding-bottom: 5px;
}
.centerside{
   display:flex !important;
 
 justify-content: center !important;
}
.centerside2{
   display:inline-block !important;
  justify-content: center !important;
}

.leftside{
   display:flex !important;
 
 justify-content: left !important;
}
.rightside{
   display:flex !important;
 
 justify-content:  flex-end !important;
}
.type-wrapper{

 padding-bottom: 5px;
}
.room-wrapper {
   display:flex !important;
 
 align-items: left !important;
 justify-content: left !important;
}
ion-label{
   display:flex !important;
 
 align-items: center !important;
 justify-content: center !important;
}
.centering{
  text-align:center;
}
.img-wrapper {
    min-height: 100px;
    width: 100%;
   
}
.items {
  background-color: rgba(30, 143, 255, 0.685); 
  color: white !important;
text-align: center;
  display: flex!important;
     align-content: center!important;
     justify-content: center;
     align-items: center!important;
  font-family: Raleway;
  font-weight: 800;
  font-size: 1.5em !important;
 width:100% !important; 
  max-width:175px !important;
  
}
.round{
  border-radius: 20px 20px 20px 20px;

}

.heading {
  margin-top: 22px;
  margin-bottom: 17px;
  font-size: 30px;
}
.chosing {
  text-align: center;
}
.switch button {
  float: right !important;
}
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #8eeb92;
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps;
  font-family: Raleway;
  font-weight: 900;
 
  font-size: 18px;
  width:100% !important; 
  max-width:500px !important;

}
.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}

.margleft {
  margin-left: 25px;
}
h1,
.muted {
  color: #2c3e5099;
}
.body {
  margin-right: auto;
  margin-left: auto;
  max-width: 1200px;
  padding-right: 10px;
  padding-left: 10px;
}
h1 {
  font-size: 26px;
  font-weight: 600;
}
.margn {
  margin-right: 20px;
}
#app {
  max-width: 30em;
  margin: 1em auto;
}
#content {
  margin: auto;
  width: 1024px;
  background-color: #ffffff;
  padding: 20px;
}


button {
  background-color: rgba(30, 143, 255, 0.685);
  text-decoration: none;
  outline: 0;
  color: white;
   width: 120px;
  height: 40px;
  text-align: center;
  border: none;
  display: inline-block;
  font-size: 25px;
  cursor: pointer;
  max-width: 300px;
  max-height: 150px;
  border-radius: 13px;
  text-align: center !important;
   justify-content: center !important;
    align-content: center!important;
     align-items: center!important;
}

.wrapper {
  font-size: 25px;
}

.datepicker >>> input {
   width: 150px;
  height: 60px;
  
  font-size: 20px;
  margin-bottom: 5px;
  display: inline-block;
  text-align: center;
  border-radius: 13px;
  border: solid;
  cursor: pointer;
  border-color: rgba(30, 143, 255, 0.685);
  background: linear-gradient(to right, #8eeb92 50%, white 50%);
  background-size: 200% 100%;
  background-position: right bottom;
  color: black;
  font-weight: bold;
 text-decoration: none;
display:flex !important;
 
 justify-content: center !important;
}

.datepicker >>> input:focus{
  outline: none;
  

}

.datepicker >>> input:hover {
  background-position: left bottom;
  color: black;
  font-weight: bold;
}

.datepicker {
  display: inline-block;
  text-decoration: none;

}




.listStyle{
  color: black;
  font-size:22px;
}
.onLeft{
  float: left;
  width:300px;
}
.onCenter{       
  margin:0 auto;
  width:300px;
}
.onRight{
    float: right;
    width:500px;
}

.margintop {
  margin-top: 5px;
}
.paddright {
  padding-right: 2px;
}
b{
color:black;
  font-size: 22px;
}

.title2{
  text-align: center;
  margin-bottom: 10px;
  padding-top: 10px;
}
.title3{
 
}
.title{
 color:black;
 text-align: center;
 font-size: 35px;
 
  
}
.fade-enter-active, .fade-leave-active {
  transition: all .2s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.fade-enter-active {
  transition-delay: .2s;
}
.working{
  position: relative;
  height:300px;
  width:100%;
}
.togglers{
  display: inline-block;
  font-size: 30px;
}


table {
 border: 1px solid grey;
 border-collapse: collapse;
 margin: 0 auto;
}



td {
 border: 1px solid grey;
 padding: 10px;
 display: block;
 text-align: center;
}
.newLine{
  display: block;
  font-size: 4vmin;
    width: 80vmin;

  
}


</style>