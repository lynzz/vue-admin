<template>
  <div v-repeat="field in fields" class="form-group" v-class="has-error: validation.name.required">
    <label class="col-sm-2 control-label">{{field.label}}</label>
    <div class="col-sm-10">
      <input type="text" v-if="type == text" v-model="{{field.name}}" class="form-control" placeholder="{{field.placeholder}}" v-validate="required">
      <div class="help-block" v-if="validation.name.required">此项必填</div>
    </div>
  </div>
</template>

<script>
module.exports = {
  replace: true,
  props: ['fields'],
  lazy: true,
  data: function() {
    return {
      name: '',
      value: ''
    };
  },
  created: function() {
    console.log(this.field);
    var field = this.field;

  }
}
</script>
