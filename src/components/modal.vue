<style>
.modal {display: block;}
.modal-enter, .modal-leave {
  opacity: 0;
}

</style>

<template>
  <div class="modal fade"
    :class="show ? 'in' : ''"
    v-show="show"
    transition="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" @click="show=false" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">
            <slot name="header">
               default header
            </slot>
          </h4>
        </div>
        <div class="modal-body">
          <slot name="body">
            default body
          </slot>
          
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn btn-default" @click="show=false">关闭</button>
            <button type="button" class="btn btn-primary">保存</button>
          </slot>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
  <div class="modal-backdrop fade in" v-if="show"></div>
</template>

<script>
module.exports = {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    }
  }
}
</script>
