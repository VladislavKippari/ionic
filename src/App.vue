<template>
 <div>
   <ion-app>
         <router-view ></router-view>
         <app-menu></app-menu>
   </ion-app>
  </div>
</template>

<script>
import Header from './components/Header';
export default {
components:{
'app-menu':Header,
  }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Raleway);

*{
    font-family: Raleway;
}
ion-app{
 
  padding-right: 5px;
  padding-left: 5px;

}


</style>
