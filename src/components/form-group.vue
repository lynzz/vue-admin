<template>
  <div class="form-group" :class="valid ? 'has-success has-feedback' : 'has-error has-feedback'">
    <label class="col-sm-2 control-label">{{label}}</label>
    <div class="col-sm-10">
      <slot>
        
      </slot>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    label: {
      type: String
    },
    valid: Boolean
  }
  
}
</script>
