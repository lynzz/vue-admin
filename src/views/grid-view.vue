<template>
  <div class="bs-grid">
    <form id="search">
      Search <input name="query" v-model="searchQuery">
    </form>
    <bs-grid url="/list" on-load="{{onGridLoaded}}" columns="{{columns}}" filter-key="{{searchQuery}}">
      <p>{{msg}}</p>
    </bs-grid>
    <bs-modal :show.sync="showModa">
      <h4 class="modal-title">编辑框</h4>
      <div class="modal-body">
        <bs-form fields="{{formFields}}"></bs-form>
      </div>
    </bs-modal>
  </div>

</template>

<script>
  module.exports = {
    data: function() {
      return {
        searchQuery: '',
        showModal: false,
        formFields: [],
        columns: [{
          field: 'name',
          displayName: '名称'
        }, {
          field: 'power',
          displayName: '权力'
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

      };
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

        this.$set('formFields', formFields);
        this.$set('showModal', true);
      },

      delRow: function(e, data) {
        console.log('delete');
      }

    },
    methods: {
      onGridLoaded: function(msg) {
        console.log(msg);
      }
    },
    components: {
      'bs-grid': require('../components/grid.vue'),
      'bs-modal': require('../components/modal.vue'),
      'bs-form': require('../components/form.vue')
    }
  }

</script>
