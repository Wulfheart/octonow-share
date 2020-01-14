<template>
  <div>
    <Nav />
    <div class="container mx-auto flex justify-center">
      <div class="flex flex-col justify-center w-3/4 xl:w-2/3">
        <div class="w-full flex flex-col lg:flex-row items-stretch">
          <div class="p-4 w-full lg:w-2/3"> <img id="Stream" src="http://10.55.100.109/webcam/?action=stream"
              alt="http://10.55.100.109/webcam/?action=stream" class="rounded object-cover w-full"></div>
          <div class="p-4 w-full lg:w-1/3">
            <Info />
          </div>
        </div>
        <Temperature class="mt-20" />
      </div>
    </div>
  </div>

</template>

<script>
  import Temperature from '../components/Temperature.vue'
  import Info from '../components/Info.vue'
  import Nav from '../components/Nav.vue'
  import Button from '../components/elements/Button.vue'

  export default {
    name: 'dashboard',
    components: {
      Temperature,
      Info,
      Nav,
      Button
    }
  }
</script>