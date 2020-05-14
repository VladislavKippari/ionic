<template >   
    <ion-content>
      <ion-header >
      <ion-toolbar>
        <ion-title>Rooms</ion-title>
      </ion-toolbar>
    </ion-header>


<ion-grid >
  <ion-row >
      <ion-col class="zindexdrop" size-xl="4" size-lg="4" 
      size-md="4" size-sm="12" size-xs="12">
       <div  class="room-wrapper  animated slideInLeft">
        <custom-select 
          v-model="roomSearch"
          placeholder="Room ..."
          class="style-chooser"
          :options="roomList"
        ></custom-select>
      </div>
     
     
    </ion-col>
     <ion-col class="zindexdrop2"  size-xl="4" size-lg="4" 
     size-md="4" size-sm="12" size-xs="12">
     <div class="sensor-wrapper animated fadeIn">

        <custom-select
          v-model="sensorSearch"
          placeholder="Sensor ..."
          class="style-chooser"
          :options="sensorList"
        ></custom-select>
      </div>
    </ion-col>
     <ion-col class="zindexdrop3"  size-xl="4" size-lg="4" 
     size-md="4" size-sm="12" size-xs="12">
     <div class="controller-wrapper  animated slideInRight">
        <custom-select
          v-model="controllerSearch"
          placeholder="Controller ..."
          class="style-chooser"
          :options="controllerList"
        ></custom-select>
      </div>
     
     
    </ion-col>
     
         </ion-row >
      </ion-grid>

  
  <ion-grid>
  <ion-row>
    <ion-col  size-xl="3" size-lg="3" size-md="4" size-sm="4"
     size-xs="6"  v-for="room in filterRooms"  :key="room.room">
        <ion-item   detail='false' lines="none"  button v-on:click="$router.push('/roominfo')">
          <ion-label v-on:click="selectedRoom(room.room)" >
           <p class="img-wrapper items round">
              {{room.room}}
            </p>
          </ion-label>
        </ion-item>
    </ion-col>
  </ion-row>
  </ion-grid>
  
 </ion-content>
  

 
</template>

<script>

import store from '../store/store';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import {mapMutations} from 'vuex';

export default {
  components: {
    vSelect 
  },
  data() {
    return {
            port:'https://dataprjct.herokuapp.com',
      hover: false,
      pusherArray:store.getters.giveTrigger,
      valuetypeOtp1:'T',
      testArr:[1,2,3,4,5,6,7,8,9],
      valuetypeOtp2:'Humidity',       
      valuetypeOtp3:'Illuminance',    //keskmised andmete kuvamiseks
      dimensionOtp1:'C',
      dimensionOtp2:'%',
      dimensionOtp3:'LUX',
      roomSearch: "", //valitud tuppa rippmenuust
      sensorSearch: "", //valitud sensor rippmenuust
      controllerSearch: "", //valitud kontroller rippmenuust
      rooms: [], //massiiv filteriimise jaoks
      controllerSensor: [], //massiiv andmebaasi andmete hoidmiseks
      controllerList: [], //kontrolllerid loend rippmenuu
      sensorList: [], 
      roomList: [], 
      avgDataList: []
    };
  },
  methods: {
     
      ...mapMutations([
          'selectedRoom',
          'roomsFill'
       ]),
    hoverMouse() {
      this.hover = true;
    },
    leaveMouse() {
      this.hover = false;
    },
    //meetod tähtede eemaldamiseks ruumi numbritest
    compare(a, b) {
      if (
        parseInt(a.room.replace(/\D/g, "")) <
        parseInt(b.room.replace(/\D/g, ""))
      ) {
        return -1;
      }
      if (
        parseInt(a.room.replace(/\D/g, "")) >
        parseInt(b.room.replace(/\D/g, ""))
      ) {
        return 1;
      }
      return 0;
    }
  },
 async  created() {
    //keskmise andmete paigaldamine
    var intervalType='hours';  //years,months,hours //https://www.postgresqltutorial.com/postgresql-interval/
    var intervalTime='1';
    this.$http
      .get(this.port+'/api/avaragedata/rooms/interval/'+intervalType +'/' + intervalTime +'')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const resultArray = [];
        for (let key in data) {
          resultArray.push(data[key]);
        }
        
        this.avgDataList = resultArray[1];
      });
    //rippmenüü täitmine
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
    //massiivi täitmine andmetega igale ruumile

    this.$http
      .get(this.port+"/api/controller/sensor/room")
      .then(response => {
        return response.json();
      })
      .then(data => {
        const resultArray = [];
        for (let key in data) {
          resultArray.push(data[key]);
        }
        var object = resultArray[1];
        var temp = [];
        var countrooms = 0;
        for (let i = 0; i < object.length; i++) {
          var temproom = "";
          if (temp.includes(object[i].room) === false) {
            this.controllerSensor.push({
              room: "",
              sensors: [],
              controllers: []
            });
            this.controllerSensor[countrooms].room = object[i].room;
            for (let a = 0; a < object.length; a++) {
              if (object[i].room === object[a].room) {
                if (this.controllerSensor[countrooms].sensors.includes(object[a].sensorname) === false) {
                  this.controllerSensor[countrooms].sensors.push(
                    object[a].sensorname
                  );
                }
                if (this.controllerSensor[countrooms].controllers.includes(object[a].controllername) === false) {
                  this.controllerSensor[countrooms].controllers.push(
                    object[a].controllername
                  );
                }
              }
            }
            countrooms++;
            temp.push(object[i].room);
          }
        }
        for (var property in object) {
          if (object[property].room != null) {
            //rippmenuu taitmine
            this.controllerList.push(object[property].controllername);
            this.sensorList.push(object[property].sensorname);
          }
        }

        this.controllerList = [...new Set(this.controllerList)]; //dublicatide eemaldamine
        this.sensorList = [...new Set(this.sensorList)]; //dublicatide eemaldamine
        this.sensorList.sort();
        this.controllerList.sort();
      });
  },
  computed: {
       
    filterRooms() {
    for (let i = 0; i < this.controllerSensor.length; i++) {
        this.controllerSensor[i].dimension = []; 
        this.controllerSensor[i].valuetype = []; 
        for (let a = 0; a < this.avgDataList.length; a++) {
          if (this.controllerSensor[i].room === this.avgDataList[a].room) {
            this.controllerSensor[i].dimension.push(
              this.avgDataList[a].dimension
            );
            this.controllerSensor[i].valuetype.push(
              this.avgDataList[a].valuetype
            );
          }
        }
      }
      let filtered = this.controllerSensor;
      if (this.roomSearch) {
        filtered = this.controllerSensor.filter(
          m => m.room.toLowerCase().indexOf(this.roomSearch) > -1
        );
      }
      if (this.controllerSearch) {
        filtered = filtered.filter(m =>
          m.controllers.includes(this.controllerSearch)
        );
      }
      if (this.sensorSearch) {
        filtered = filtered.filter(m => m.sensors.includes(this.sensorSearch));
      }

      filtered.sort(this.compare);

      return filtered;
    }
  }
};
</script>
<style >
.zindexdrop{
z-index: 100002 !important;
}
.zindexdrop2{
z-index: 100001 !important;
}
.zindexdrop3{
z-index: 100000 !important;
}

ion-label{
   display:flex !important;
 
 align-items: center !important;
 justify-content: center !important;
}
ion-grid{
  padding-top: 60px !important;
  
}


.sensor-wrapper {
 
 
 display:flex !important;
 
 align-items: center !important;
 justify-content: center !important;
 
}

ion-content{
  height:100% !important;
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
  font-weight: 900;
  font-size: 2em !important;
 width:100% !important; 
  max-width:150px !important;
  
}
.round{
  border-radius: 20px 20px 20px 20px;

}
.controller-wrapper {
 display:flex !important;
 
 align-items: center !important;
 justify-content: center !important;

  
}
.room-wrapper {
 display:flex !important;
 
 align-items: center !important;
 justify-content: center !important;
  

}

i {
  margin-left: 10px;
}


.style-chooser{
   width:100% !important; 
  max-width:300px !important;
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
  max-height: 90px !important;
  font-size: 18px;
  width:100% !important; 
  max-width:300px !important;

}
.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}
</style>    