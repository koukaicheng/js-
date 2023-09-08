<template>
  <div class=" table-wrapper">
    <el-table max-height="500" :data="list" v-loading="loading">
      <template v-for="(item, index) in headers">
        <el-table-column :key="index" :prop="item.props" :label="item.label" :min-width="item.width">
          <template v-if="item.slot" v-slot="scope">
            <slot :name="item.slot" v-bind:row="scope" />
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="relative flex items-center" v-if="tablePage.total > tablePage.pageSize">
      <span class="total-text">共{{ tablePage.total }}条记录</span>
      <el-pagination
        class="flex flex-1 justify-end custom"
        background
        hide-on-single-page
        :current-page.sync="tablePage.currentPage"
        :page-sizes="tablePage.pageSizes"
        :page-size.sync="tablePage.pageSize"
        :layout="paginationLayout"
        :total="tablePage.total"
        @size-change="handleChange"
        @current-change="handleChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "TablePageSection",
  data() {
    return {
      pageSizes: [10, 20, 30, 40, 50],
      paginationLayout: "sizes, prev, pager,next"
    };
  },
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    tablePage: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleChange() {
      this.$emit("onPageLoad");
    }
  }
};
</script>

<style lang="scss" scoped>
.table-wrapper {
  padding: 0 20px 15px 20px;
  .relative {
    .total-text {
      color: #949494;
      font-size: 14px;
    }
    .custom {
      margin: 14px 0;
    }
  }
}
</style>
<TablePageSection v-bind="tableConfig" @onPageLoad="getList">
      <template #handle="{row}">
        <el-button @click="handleClick(row)">哈哈</el-button>
      </template>
    </TablePageSection>

     tableConfig: {
        headers: tableHeaders,
        list: [],
        loading: false,
        tablePage: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        }
      },
