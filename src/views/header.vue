<template>
  <header>
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="/my.html">Vue Admin <span>0.1.0</span></a>
        </div> 
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav main-nav" id="J_MainMenu">
            <li v-for="menu in menus"><a v-link="{path: '/' + menu.name }" title="{{menu.text}}"> <i class="{{menu.icon}}"></i> <span>{{menu.text}}</span></a></li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li>
              <a href="javascript:;" id="currentChannel">
                <em>当前频道：</em>
                <span title="动漫频道">动漫频道</span>
                <em><i class="fa fa-random"></i> 切换 </em></a>
            </li>
            <li class="dropdown">
              <a href="javascript:;" class="dropdown-toggle" id="dropdownHandle">
                <i class="fa fa-user"></i>
                <span class="username">毕松</span>
                <b class="caret"></b>
              </a>
              <ul class="dropdown-menu">
                <li><a href="/my.html"> <i class="fa fa-user"></i> 个人中心 </a></li>
                <li><a href="javascript:;" id="logoutHandle"><i class="fa fa-sign-out"></i> 退出</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
module.exports = {
  props: [],
  data() {
    return {
      menus: [{
        name: 'user',
        text: '用户中心',
        icon: 'fa fa-user'
      }, {
        name: 'setting',
        text: '系统设置',
        icon: 'fa fa-wrench'
      }]
    }
  }
}
</script>
