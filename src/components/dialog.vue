<template>
  <div class="v-dialog">
    <a class="v-dialog-close">x</a>
    <div class="v-dialog-header">
      <h3 class="v-dialog-title">
        <slot name="title">
          title
        </slot>
      </h3>
    </div>
    <div class="v-dialog-body">
      <slot name="body"></slot>
    </div>
    <div class="v-dialog-footer">
      <slot name="footer">
        <button type="button" class="btn btn-default" @click="show=false">关闭</button>
        <button type="button" class="btn btn-primary">保存</button>
      </slot>
    </div>
  </div>
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
<style>

.ue-dialog {
  left: 0;
  top: 0;
  margin-bottom: 70px;
  min-width: 320px;
  background: #fff;
  border-top: 5px solid #333;
  border-radius: 3px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  // transition: all 0.1s ease;
  -webkit-filter: grayscale(0.8) blur(2px);

  &:focus {
    outline: none;
  }

  &.focused {
    -webkit-filter: none;
  }

  .dialog-close {
    position: absolute;
    z-index: 9;
    right: 15px;
    top: 15px;
    font-size: 21px;
    font-weight: bold;
    line-height: 1;
    color: rgba(0, 0, 0, 0.2);
    text-shadow: 0 1px 0 #fff;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      color: rgba(0, 0, 0, 0.5);
      text-decoration: none;
      cursor: pointer;
    }
  }

  .dialog-head {
    cursor: default;
    min-height: 16.428571429px;
    border-bottom: 1px solid @gray-lighter;
    font-size: 18px;
    font-weight: 500;
    line-height: 21px;

    .nav-tabs {
      display: none;
      margin-bottom: 0;
      padding-top: 15px;
      border-bottom: none;
    }

    .nav {
      > li {
        > a {
          padding-top: 5px;
          padding-bottom: 5px;
        }
      }
    }
  }

  .dialog-title {
    cursor: default;
    margin: 0;
    padding: 15px 46px 15px 15px;
    font-size: 18px;
    font-weight: 500;
    line-height: 21px;
  }

  .dialog-body {
    position: relative;
    padding: 20px;
    word-break: break-all;
  }

  .dialog-foot {
    padding: 19px 20px 20px;
    border-top: 1px solid @gray-lighter;
    text-align: center;

    &:empty {
      display: none;
    }

    a {
      margin: 0 5px;
    }

    span {
      padding: 6px 20px;
    }
  }
}

.ue-dialog-tabs {

  .dialog-head {
    line-height: 19px;

    .dialog-title {
      float: left;
      margin-top: 23px;
      margin-right: 15px;
      padding: 0 15px;
      color: @gray;
      border-right: 1px dotted @gray-lighter;
    }

    .nav-tabs {
      display: block;
    }
  }
}

</style>
