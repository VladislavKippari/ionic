<template>

 <div>
   <ion-app>
        
         <router-view ></router-view>
         <app-header></app-header>
   </ion-app>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

 
export default {
components:{
'app-header':Header,
'app-footer':Footer
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
