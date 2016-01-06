<template>
  <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
    <div class="row">
      <div>
        <grid :has-checkbox="hasCheckbox" url="/api/user/list" :columns="gridColumns" :page-size="pageSize"></grid>
      </div>
      <sidebar-view :sub-menus="userMenus"></sidebar-view>

    </div>
  </div>
  <modal :show.sync="showModal"></modal>
</template>

<script>
import grid from '../components/grid.vue'
import modal from '../components/modal.vue'

import sidebarView from './sidebar.vue'

module.exports = {
  data() {
    return {
      pageSize: 5,
      hasCheckbox: true,
      showModal: false,
      userMenus:[{
        icon: 'fa fa-user',
        text: '用户中心',
        items:[{
          path: '/user',
          text: '用户列表'
        }]
      }],
      gridColumns:[{
        field: 'id',
        displayName: 'ID'
      }, {
        field: 'name',
        displayName: '用户名',
        render(row, column) {
          return '<a href="{{url}}">{{name}}</a>'
        }
      }, {
        displayName: '操作',
        actions: [{
          name: 'editRow',
          text: '编辑'
        }, {
          name: 'delRow',
          text: '删除'
        }]
      }]
    }
  },
  events: {
    editRow: function(e, data) {
      var rowIndex = +e.currentTarget.dataset.rowIndex;
      var data = data[rowIndex];
      var formFields = [{
        label: '名称',
        type: 'text',
        name: 'name',
        value: data.name,
        validate: 'required',
        placeholder: '请填写名称'
      }, {
        label: '权力',
        type: 'text',
        name: 'power',
        value: data.power,
        validate: 'required',
        placeholder: '请填写权力'
      }];
      console.log('edit');
      this.$set('showModal', true);
      /*this.$set('formFields', formFields);
      this.$set('showModal', true);*/
    },

    delRow: function(e, data) {
      console.log('delete');
    }

  },
  ready() {
    
  },
  components: {
    modal,
    grid,
    sidebarView
  }
}
</script>

