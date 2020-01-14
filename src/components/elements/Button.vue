<template>
  <a :href="link" class="p-2 px-4" :class="coloring" v-if="hasLink" :target="target">
    <slot></slot>
  </a>
  <button class="p-2 px-4" :class="classCombination" v-else>
    <slot></slot>
  </button>
</template>

<script>
  // import isBlank from 'is-blank'
  const isBlank = require('is-blank')
  export default {
    name: 'Button',
    props: {
      link: {
        type: String,
        default: ''
      },
      newTab: {
        type: Boolean,
        default: false
      },
      type: {
        // Available types: default, primary, success, info, warning, danger, text
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      hasLink: function () {
        return !isBlank(this.link)
      },
      target: function () {
        return (this.newTab ? "_blank" : "_parent")
      },
      coloring: function () {
        if (this.type == "primary") return "bg-primary-main hover:bg-primary-hover text-white"
        else if(this.type == "default") return "bg-default-main hover:bg-default-hover"
        else if(this.type == "success") return "bg-success-main hover:bg-success-hover text-white"
        else if(this.type == "info") return "bg-info-main hover:bg-info-hover text-white"
        else if(this.type == "warning") return "bg-warning-main hover:bg-warning-hover text-white"
        else if(this.type == "danger") return "bg-danger-main hover:bg-danger-hover text-white"
        else if (this.type == "text") return "text-primary-main hover:text-primary-hover"
        else return ""
      },
      disabling: function () {
        if (this.disabled == true) return "opacity-50 cursor-not-allowed"
        else return " "
      },
      classCombination: function() {
        return this.coloring + " " + this.disabling 
      }
    }
  }
</script>