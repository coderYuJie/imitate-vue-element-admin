<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconId"></use>
  </svg>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    svgClass () {
      if (this.className) {
        return ('svg-icon' + this.className)
      } else {
        return 'svg-icon'
      }
    },
    iconId () {
      return `#icon-${this.icon}`
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: #fff;
  overflow: hidden;
}
</style>
