// axios.get(menuListUrl)
//   .then(function (response) {
//     context.loading = false
//     if (response.data.code === 200) {
//       //success
//
//       context.menuList = addMenuListRoute(response.data.data)
//       //设置默认选中的菜单，根据url
//
//       // context.currentIndex = !menuList[0].children||menuList[0].children.length===0?menuList[0].index:menuList[0].children[0].index
//       // console.log(!menuList[0].children||menuList[0].children.length===0?menuList[0].index:menuList[0].children[0].index)
//       // if(context.router.path ==="/programlist"){
//       //   // console.log('av')
//       //   // console.log(context.router)
//       //   // context.currentIndex = '/programlist?chanxian='+context.router.query.chanxian
//       //
//       // }
//
//     } else {
//       responseError(response)
//     }
//   })
//   .catch(catchErroMessage);

// requestProgramList: function (context) {
//   axios.get(programListUrl, {
//     params: {
//       lineName: context.chanxian,
//       page: context.currentPage,
//       size: DefaultPageSize,
//     }
//   })
//     .then(function (response) {
//       context.loading = false
//       if (response.data.code === 200) {
//         //success
//         context.tableData = addTableLink(response.data.data.list)
//         context.tableColumn = [{prop: 'id', label: '程序id', isShow: false, isLink: false}, {
//           prop: 'name',
//           label: '程序名称',
//           isShow: true,
//           isLink: true
//         },]
//         context.currentPage = response.data.data.pageNum
//         context.total = response.data.data.total
//         context.isNumberColumn = true
//       } else {
//         responseError(response)
//       }
//     })
//     .catch(catchErroMessage);
// },


// requestScanList: function (context) {
//   axios.get(scanListUrl, {
//     params: {
//       lineName: context.chanxian,
//       programName: context.programName,
//
//       equipmentName: "",
//       username: "",
//       standPosition: "",
//       startTime: "",
//       endTime: "",
//
//       page: context.currentPage,
//       size: DefaultPageSize,
//     }
//   })
//     .then(function (response) {
//       context.loading = false
//       if (response.data.code === 200) {
//         //success
//         context.tableData = response.data.data.list
//         context.tableColumn = showTableColumn(response.data.data.header)
//         context.currentPage = response.data.data.pageNum
//         context.total = response.data.data.total
//         context.isNumberColumn = true
//       } else {
//         responseError(response)
//       }
//     })
//     .catch(catchErroMessage);
// },



// var indexPage = '/index.html'
// var loginPage = '/login.html'
//
// /*api*/
// var loginUrl = './api/login'
// var menuListUrl = './api/menu/list'
// var programListUrl = './api/program/list'
// var scanListUrl = './api/scan/record/list'
// var exportScanListUrl = './api/scan/record/excel'
//
// /*默认参数*/
// var DefaultPageNum = 1
// var DefaultPageSize = 20

//
//
// <template>
// <div id="div-table">
//   <el-table  :data="tableData" stripe border style="width: 100%" @row-click="rowClick">
//
//
//   <el-table-column v-for="header in tableHeader"
//   v-if="header.isShow"
//   :key="header.id"
// :type="header.type"
//
// width="">
//
//   </el-table-column>
//
//   <!--列，列头-->
// <el-table-column v-if="isSelcetionColumn" type="selection" width="55"></el-table-column>
//
//
//
//   <el-table-column
// type="index"
// width="50"
// show-overflow-tooltip>
// </el-table-column>
//
//
// <el-table-column v-if="isNumberColumn" label="#" width="55">
//   <template scope="scope"><span>{{ scope.$index + 1}}</span></template>
// </el-table-column>
// <el-table-column v-for="column in tableColumn" :prop="column.prop" :label="column.label" :key="column.id"
// :width="column.width" v-if="column.isShow">
//
//   <template scope="scope">
//
//   <a v-if="column.isLink" :href="scope.row['link']"
// style="display: inline-block;width: 100%;cursor:pointer ">{{ scope.row[column.prop] }}</a>
//
// <span v-else>{{ scope.row[column.prop] }}</span>
// </template>
//
// </el-table-column>
//
// <el-table-column v-if="isRowEdit||isRowDelete" label="操作" width="140">
//   <template scope="scope">
//   <el-button v-if="isRowEdit" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
//   <el-button v-if="isRowDelete" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
//   </el-button>
//   </template>
//   </el-table-column>
//   </el-table>
//
//   <div>
//   <el-pagination @size-change="handleSizeChange"
// @current-change="handleCurrentChange" :currentPage="currentPage" :pageSize="pageSize"
// layout=" prev, pager, next, jumper" :total="total"></el-pagination>
//   </div>
//   </div>
//   </template>
//
//   <script>
//
// export default {
//   name: "table-componet",
//   props: ['tableColumn', 'isNumberColumn', 'isSelcetionColumn', 'isRowEdit', 'isRowDelete', 'tableData', "currentPage", "pageSize", "total"],
//   data() {
//     return {
//
//       tableHeader:[{label:'筛选',prop:'',type:'selection',isShow:true},]
//     }
//   },
//   methods: {
//     handleEdit: function (index, row) {
//       this.$emit('handleEdit', index, row)
//     },
//     handleDelete: function (index, row) {
//       this.$emit('handleDelete', index, row)
//     },
//     rowClick: function (row, event, column) {
//     },
//     handleSizeChange: function (val) {
//       this.$emit("handleSizeChange", val)
//     },
//     handleCurrentChange: function (val) {
//       this.$emit("handleCurrentChange", val)
//     },
//   }
// }
//
// </script>
//
// <style scoped>
//
// .el-pagination {
//   display: flex;
//   justify-content: flex-end;
//   padding-top: 15px;
//   padding-bottom: 15px;
// }
//
//
// </style>

//
// isNumberColumn: false,
//   isSelcetionColumn: false,
//   isRowEdit: false,
// //   isRowDelete: false,
// currentPage: 1,
//   total: 1,
//   pageSize: 20,
//
//
//
// = [
//   {prop: 'id', label: '程序id', isShow: false, isLink: false},
//   {prop: 'name', label: '程序名称', isShow: true, isLink: true},]


//
// requestProgramFileList: function (context) {
//   var data = {
//     params: {
//       lineName: context.chanxian,
//       page: context.currentPage,
//       size: Api.DefaultPageSize,
//     }
//   };
//   myGet(Api.programListUrl, data, function (response) {
//     context.tableData = addTableFileLink(response.data.data.list)
//     context.tableColumn = [
//       {prop: 'id', label: '程序id', isShow: false, isLink: false},
//       {prop: 'name', label: '程序名称', isShow: true, isLink: false,width:250},
//       {prop: 'path', label: '路径', isShow: true, isLink: false},]
//     if(response.data.data.total!==0){
//       context.currentPage = response.data.data.pageNum
//     }
//
//
//     context.total = response.data.data.total
//     context.isNumberColumn = true
//   })
//
// },



