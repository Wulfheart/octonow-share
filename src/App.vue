<template>

  <div id="app" class="text-siemens-dark">

    <head>
      <link href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" rel="stylesheet">
      <!--script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script-->
    </head>
   <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'app',
    components: {                                                              
     
    }, 
    data() {
      return {
        polling: null
      }
    },
    methods: {
      pollData() {
        this.polling = setInterval(() => {
          this.$store.dispatch('GET_PRINTER')
          this.$store.dispatch('GET_JOB')
        }, 1000)
      }
    },
    created() {
      this.pollData()
    }
  }
</script>

<style>
  @import 'assets/styles/tailwind.postcss';
</style>