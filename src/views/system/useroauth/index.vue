<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">用户主键</label>
        <el-input v-model="query.userId" clearable placeholder="用户主键" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">用户名</label>
        <el-input v-model="query.username" clearable placeholder="用户名" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">昵称</label>
        <el-input v-model="query.nickname" clearable placeholder="昵称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">第三方系统用户ID</label>
        <el-input v-model="query.uuid" clearable placeholder="第三方系统用户ID" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="用户主键">
            <el-input v-model="form.userId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="form.username" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickname" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="头像">
            <el-input v-model="form.avatar" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="应用主页">
            <el-input v-model="form.blog" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="公司名">
            <el-input v-model="form.company" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.location" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="邮件">
            <el-input v-model="form.email" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.gender" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="来源">
            <el-input v-model="form.source" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="第三方系统用户ID">
            <el-input v-model="form.uuid" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="userId" label="用户主键" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="blog" label="应用主页" />
        <el-table-column prop="company" label="公司名" />
        <el-table-column prop="location" label="地址" />
        <el-table-column prop="email" label="邮件" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="source" label="来源" />
        <el-table-column prop="uuid" label="第三方系统用户ID" />
        <el-table-column v-if="checkPer(['admin','userOauth:edit','userOauth:del'])" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudUserOauth from '@/api/userOauth'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { oauthId: null, userId: null, username: null, nickname: null, avatar: null, blog: null, company: null, location: null, email: null, remark: null, gender: null, source: null, uuid: null }
export default {
  name: 'UserOauth',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '第三方登录信息', url: 'api/userOauth', idField: 'oauthId', sort: 'oauthId,desc', crudMethod: { ...crudUserOauth }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'userOauth:add'],
        edit: ['admin', 'userOauth:edit'],
        del: ['admin', 'userOauth:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'userId', display_name: '用户主键' },
        { key: 'username', display_name: '用户名' },
        { key: 'nickname', display_name: '昵称' },
        { key: 'uuid', display_name: '第三方系统用户ID' }
      ]
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>

</style>
