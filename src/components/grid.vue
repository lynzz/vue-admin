<template>
  <div class="grid-header">
    
  </div>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th v-if="hasCheckbox">
          <input 
            type="checkbox" 
            class="check-all"
            @click="onCheckAll($event)">
        </th>
        <th v-for="column in columns"
          @click="sortBy(column.field)"
          :class="{active: sortKey == column.field}">
          {{column.displayName}}
          <span class="arrow"
            v-if="column.field"
            :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="
        entry in data
        | filterBy filterKey
        | orderBy sortKey sortOrders[sortKey]">
        <td v-if="hasCheckbox">
          <input 
            type="checkbox" 
            class="check-row"
            @click="onCheckRow"
            value="{{$index}}">
        </td>
        <td v-for="column in columns">
          <template v-if="column.actions">
            <a href="javascript:;" v-for="action in column.actions" @click="onAction" data-action="{{action.name}}" data-row-index="{{$parent.$parent.$index}}">{{action.text}}</a>
          </template>
          <template v-else>
            {{{ renderCell(entry, column) }}}
          </template>
        </td>
      </tr>
    </tbody>
  </table>

  <ul class="pagination pull-right" v-if="showPagers">
    <li :class="{disabled: currentPage == 1}" @click="onPrev">
      <a href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li v-for="page in pages" :class="{active: currentPage == page}" @click="onPage" data-page="{{page}}"><a href="javascript:;">{{page}}</a></li>
    <li :class="{disabled: currentPage == totalPage}" @click="onNext">
      <a href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</template>

<script>
const doc = document;

module.exports = {
  props: {
    columns: {
      type: Array,
      required: true
    },
    filterKey: {
      type: String,
      default: ''
    },
    pageSize: {
      type: Number,
      default: 10
    },
    url: {
      type: String,
      required: true
    },
    hasCheckbox: {
      type: Boolean,
      default: false
    },
    onLoad: {
      type: Function,
      default(msg) {
        console.log(msg);
      }

    }

  },
  data() {
    let sortOrders = {};
    this.columns.forEach((column) => sortOrders[column.field] = 1);
    
    return {
      data: null,
      totalCount: null,
      totalPage: null,
      currentPage: 1,
      numberOfPageLinks: 10,
      sortKey: '',
      sortOrders: sortOrders
    }
  },

  watch: {
    'currentPage': 'update'
    
  },

  ready() {
    this.onLoad('message form grid');
    this.update();
  },

  computed: {
    
    pages() {
      var currentPage = this.currentPage;
      var totalCount = this.totalCount;
      var totalPage = this.totalPage;
      var firstPage;
      var lastPage;
      var range = [];
      firstPage = currentPage + 1 - this.numberOfPageLinks / 2;
      if (firstPage < 1) {
          firstPage = 1;
          lastPage = this.numberOfPageLinks;
          if (lastPage > totalPage) {
              lastPage = totalPage;
          }
      } else {
          lastPage = currentPage + 1 + this.numberOfPageLinks / 2 - 1;
          if (lastPage > totalPage) {
              lastPage = totalPage;
              firstPage = lastPage - this.numberOfPageLinks;
              if (firstPage < 1) firstPage = 1;
          }
      }
      var i = firstPage;
      var len = lastPage - firstPage + 1;
      for(i; i <= len; i++) {
        range.push(i);
      }
      return range;
    },
    showPagers() {
      return this.data && this.totalCount > this.pageSize;
    }

  },

  methods: {
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
    update() {
      this.$http.get(this.url, {pageNo: this.currentPage, pageSize: this.pageSize}).then((res) => {
        let data = res.data.data;

        if (res.data.success) {
          this.$set('data', data.listData);
          this.$set('totalCount', data.totalCount);
          this.$set('totalPage', Math.ceil(data.totalCount/this.pageSize));
        }

      });
    },

    updateCheckAllState() {
      let len = this.checkRow.length;
      let pageSize = this.pageSize;

      if (!len) {
        this.$set('checkAll', false);
      } else if (pageSize === len) {
        this.$set('checkAll', true);
      } else {
        doc.querySelector('.check-all').checked = pageSize === len;
      }
    },

    renderCell(row, column) {
      if (!column.render) {
        return row[column.field];
      }
      return column.render(row, column).replace(/\{\{(\w+)\}\}/g, (match, $1) => {
        return row[$1];
      });
    },

    getCheckValues() {
      let ret = [];
      let checks = doc.querySelectorAll('.check-row');
      Array.from(checks).forEach((ele) => ret.push(ele.value));
      return ret;
    },

    onCheckAll(event) {
      let checks = doc.querySelectorAll('.check-row');
      Array.from(checks).forEach((ele) => ele.checked = event.target.checked);
    },

    onCheckRow() {
      doc.querySelector('.check-all').checked = this.pageSize === doc.querySelectorAll('.check-row:checked').length
    },

    onPage(e) {
      this.$set('currentPage', e.currentTarget.dataset.page);
    },
    onPrev(e) {
      if (!e.currentTarget.classList.contains('disabled')) {
        this.$set('currentPage', +this.$get('currentPage') - 1);
      }

    },
    onNext(e) {
      if (!e.currentTarget.classList.contains('disabled')) {
        this.$set('currentPage', +this.$get('currentPage') + 1);
      }
    },

    onAdd() {
      this.$parent.$emit('onAdd');
    },

    onEdit(e) {
      console.log(e);
      this.$parent.$emit('onEdit');
    },

    onDelete(e) {
      this.$parent.$emit('onDelete');
    },

    onAction(e) {
      this.$parent.$emit(e.currentTarget.dataset.action, e, this.data);
    }


  },

  filters: {
    render(row, column) {
      this.$log(row, column);
      if (!column.render) {
        return row[column.field];
      }
      return column.render(row, column);
    }
  }
}
</script>

<style>
th.active {
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #333;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #333;
}
.table td a {
  margin-right: 5px;
}
</style>
