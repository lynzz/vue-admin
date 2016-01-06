<style>
</style>

<template>
  <form
    v-class="
    form-horizontal: !isInline,
    form-inline: isInline
    ">
    <div class="form-group" v-repeat="field: fields">
      <label class="col-sm-2 control-label">{{field.label}}</label>
      <div class="col-sm-10">
        <input type="text" v-if="type == text" v-model="field.value" class="form-control" placeholder="{{field.placeholder}}">
        <div class="help-block" v-if="">此项必填</div>
      </div>
    </div>
    <pre>
      {{$data | json 2}}
    </pre>
  </form>
</template>

<script>
var Vue = require('vue');
var validator = require('vue-validator');

Vue.use(validator);
module.exports = {
  lazy: true,
  props: {
    isInline: {
      type: Boolean,
      defalut: false
    },
    fields: {
      type: Array,
      required: true
    }
  },

  data: function() {
    return {
      fields: []

    };
  },

  compiled: function() {
  },

  computed: function() {

  },

  ready: function() {
  }
}
</script>
