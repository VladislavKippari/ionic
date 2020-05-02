<template>


       <ion-grid>
  <ion-row>
    <ion-col size-lg="6" size-md="6" size-sm="6"    key="{{room}}">
      <div class="img-wrapper item">
      {{room}}
      </div>
    </ion-col>
  </ion-row>


</ion-grid>
</template>


<script>

import {mapMutations} from 'vuex';

export default {
  data(){
    return{
      hover:false,
    }
  },
  props: ["room","valuetype1","value1","dimension1","valuetype2","value2","dimension2","valuetype3","value3","dimension3"],
  methods:{
       ...mapMutations([
          'selectedRoom'
       ]),

  }
};
</script>

<style  scoped>
.nodecor{
  text-decoration: none;
}
*:focus{
    outline: none;
}
.item {
  background-color: rgba(30, 143, 255, 0.685); 
  color: white;
 width: 100%;
  box-sizing: border-box;
  
  font-family: Raleway;
  
  border-radius: 25px;
}
.fontb{
  font-size: 32px;
}
.colr{
  background-color: #8eeb93e1;
}
.img-wrapper {
    min-height: 200px;
    width: 50px;
    background-size: cover;
    background-repeat: no-repeat;
}
.centr{
  text-align: center;
  font-weight: 900;
  font-size: 25px;
  color:#E4067F !important;
}
section {
  display: flex;
  flex-direction: column;
}
.block {
 width: 200px;
 height: 40px;
 color: black;
 text-align: center ;
 font-weight: 700 important!;
}
</style>
