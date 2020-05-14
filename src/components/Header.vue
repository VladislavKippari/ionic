<template>
      <ion-tab-bar id="progressbar" slot="bottom">
        <ion-router-link href="/rooms">
        <ion-tab-button>
          <ion-label>Rooms</ion-label>
          <ion-icon name="home-outline"></ion-icon>
        </ion-tab-button>
        </ion-router-link>

        <ion-router-link  href="/roominfo">
        <ion-tab-button >
          <ion-label>Room info</ion-label>
          <ion-icon name="information-circle-outline"></ion-icon>
        </ion-tab-button>
        </ion-router-link>
      </ion-tab-bar>
</template>

<script>
export default {
    data(){
      return{
      }
    }
}
</script>


<style scoped>
  ion-tab-button {
    --padding-start: 20px;
  }
   ion-label {  
            font-size: 18px;
        }
    
:root {
      --ion-safe-area-top: 20px;
      --ion-safe-area-bottom: 22px;
    }

</style>