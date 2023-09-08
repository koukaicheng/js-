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

      与图平台是基于供应链场景的数智化地图服务平台，主要面向与中小型企业做地图供应链场景的使用。

负责与图sass平台、与图租户后台、与图官网的研发与迭代
负责sass平台的大数据展示，用户数据展示，地图模板的创建等

与图官网的重构：把之前传统前端开发的项目代码使用webpack模块化的方式重新构建了一套项目，
使用html代码片段进行动态插入从而完成模块化的开发，对项目代码、图片等资源进行压缩
重构之后的代码体积减少了百分之40左右

与图租户后台版本优化，由于项目体积过大，内容功能堆积泰斗，改为了vite运行和构建，
提升了本地开发运行的速度，引入了windicss的使用，减少了开发环境下的css代码  
