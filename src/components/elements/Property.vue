<template>
    <div class="flex flex-col sm:flex-row pb-2">
                <h3 class="sm:pr-2 font-bold">{{label}}</h3>
                <h3><slot></slot></h3>
                <!-- <h3 v-if="slotEmpty" class="italic">{{ alternative }}</h3> -->
            </div>
</template>

<script>
  export default {
    name: 'Property',
    props:{
        label: String,
        display: Object,
        alternative: String
    },
    computed: {
      slotEmpty(){
        return this.$slots.default[0].text == ""
      }
    }
  }
</script>
