<template>
  <div class="col-sm-3 col-md-2 sidebar">
    <template v-for="menu in subMenus">
      <h4><i class="{{menu.icon}}"></i> {{menu.text}}</h4>
      <ul class="nav-sidebar">
        <li v-for="item in menu.items"><a v-link="{path: item.path}"><i class="fa fa-angle-right"></i> {{item.text}}</a></li>
      </ul>
    </template>
  </div>
</template>

<script>
module.exports = {
  props: ['subMenus']
}
</script>
