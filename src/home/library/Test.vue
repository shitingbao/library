
<template>
  <div>
    <div class="manage">
      <!-- 增删查按钮栏 -->
      <div class="search-bar">
        <div class="block">
          <span class="demonstration" style="margin-left:10px;">时间</span>
          <el-date-picker
            v-model="startDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <el-button :size="size" style="margin-left:10px;" @click="onSearch">查询</el-button>
      </div>

      <div class="code-info">
        <!-- 经销商数据统计 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="品相" width="150"></el-table-column>
          <el-table-column label="营业部">
            <el-table-column
              v-for="(item1, index) in dataList1"
              :key="index+1"
              :label="item1.name"
              :prop="'value'+index"
              style="text-align: center;"
            ></el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      dataList1: [],
      tableData: [],
      selNode: {
        id: "",
        name: ""
      },
      menuList: [],
      defaultProps: {
        children: "children",
        label: "name"
      },

      dataList: [],
      // 对话框显示与否
      dialogVisible: false,
      dataloading: false,
      selOption: "",
      input: "", // 搜索框内容

      curPage: 1,
      limit: 10,
      pageSizes: [10, 20],
      totalCount: 0,
      roleIds: [],
      startDate: []
    };
  },
  activated() {
    this.getList();
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {},
    onSearch() {
      if (this.startDate != "") {
        this.getList(); //经销商数据统计
      }
    },
    getList() {
      //   let vm = this;
      //   let methodName = "/data/businessDeptStatis/getList";
      //   let param;
      //   param = {
      //     startDate: this.startDate[0] ? this.startDate[0] : null,
      //     endDate: this.startDate[1] ? this.startDate[1] : null
      //   };
      //   https
      //     .get(methodName, param)
      //     .then(res => {
      //       if (res.data.list != "" && res.data.list != undefined) {
      //         vm.dataList1 = res.data.list;
      //         let data1 = {
      //           name: "单部门合计"
      //         };
      //         let data2 = {
      //           name: "部门扫码占比"
      //         };
      //         for (let i = 0; i < vm.dataList1.length; i++) {
      //           data1["value" + i] = vm.dataList1[i].count;
      //           data2["value" + i] = vm.dataList1[i].ratio;
      //         }
      //         vm.tableData.splice(0, vm.tableData.length);
      //         vm.tableData.push(data1);
      //         vm.tableData.push(data2);
      //       }
      //     })
      //     .catch(err => {
      //       vm.$message(err);
      //       vm.dataloading = false;
      //     });
    }
  }
};
</script>
<style>
.el-table .cell {
  text-align: center;
}
</style>