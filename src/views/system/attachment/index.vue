<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">文件真实的名称</label>
        <el-input v-model="query.realName" clearable placeholder="文件真实的名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">文件名</label>
        <el-input v-model="query.name" clearable placeholder="文件名" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">后缀</label>
        <el-input v-model="query.suffix" clearable placeholder="后缀" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">相对路径</label>
        <el-input v-model="query.path" clearable placeholder="相对路径" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">类型</label>
        <el-input v-model="query.type" clearable placeholder="类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">文件类型</label>
        <el-input v-model="query.mimeType" clearable placeholder="文件类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">标签</label>
        <el-input v-model="query.tag" clearable placeholder="标签" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">业务表</label>
        <el-input v-model="query.businessTable" clearable placeholder="业务表" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">业务id</label>
        <el-input v-model="query.businessId" clearable placeholder="业务id" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">扩展信息</label>
        <el-input v-model="query.extJson" clearable placeholder="扩展信息" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">备注</label>
        <el-input v-model="query.remark" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <date-range-picker
          v-model="query.createTime"
          start-placeholder="createTimeStart"
          end-placeholder="createTimeStart"
          class="date-item"
        />
        <date-range-picker
          v-model="query.updateTime"
          start-placeholder="updateTimeStart"
          end-placeholder="updateTimeStart"
          class="date-item"
        />
        <date-range-picker
          v-model="query.realSize"
          start-placeholder="realSizeStart"
          end-placeholder="realSizeStart"
          class="date-item"
        />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="文件真实的名称">
            <el-input v-model="form.realName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="文件名">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="后缀">
            <el-input v-model="form.suffix" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="相对路径">
            <el-input v-model="form.path" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="form.type" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="文件类型">
            <el-input v-model="form.mimeType" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="大小">
            <el-input v-model="form.size" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="form.tag" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="业务表">
            <el-input v-model="form.businessTable" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="业务id">
            <el-input v-model="form.businessId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建日期">
            <el-date-picker v-model="form.createTime" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="更新时间">
            <el-date-picker v-model="form.updateTime" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="字节大小">
            <el-input v-model="form.realSize" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="扩展信息">
            <el-input v-model="form.extJson" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
          <el-form-item v-if="crud.status.add" label="附件：">
            <el-upload
              ref="upload"
              :limit="1"
              :before-upload="beforeUpload"
              :auto-upload="false"
              :headers="headers"
              :on-success="handleSuccess"
              :on-error="handleError"
              :action="fileUploadApi + '?name=' + form.name"
            >
              <div class="eladmin-upload"><i class="el-icon-upload" />添加文件</div>
              <div slot="tip" class="el-upload__tip">可上传任意格式文件，且不超过100M</div>
            </el-upload>
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
        <el-table-column prop="realName" label="文件真实的名称" />
        <el-table-column prop="name" label="文件名" />
        <el-table-column prop="suffix" label="后缀" />
        <el-table-column prop="path" label="相对路径" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="mimeType" label="文件类型" />
        <el-table-column prop="size" label="大小" />
        <el-table-column prop="tag" label="标签" />
        <el-table-column prop="businessTable" label="业务表" />
        <el-table-column prop="businessId" label="业务id" />
        <el-table-column prop="createTime" label="创建日期" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column prop="realSize" label="字节大小" />
        <el-table-column prop="extJson" label="扩展信息" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column v-if="checkPer(['admin','attachment:edit','attachment:del'])" label="操作" width="150px" align="center">
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
import crudAttachment from '@/api/system/attachment'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { getToken } from '@/utils/auth'

const defaultForm = { attachmentId: null, realName: null, name: null, suffix: null, path: null, type: null, mimeType: null, size: null, tag: null, businessTable: null, businessId: null, createBy: null, updateBy: null, createTime: null, updateTime: null, realSize: null, extJson: null, remark: null }
export default {
  name: 'Attachment',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '通用附件', url: 'api/attachment', idField: 'attachmentId', sort: 'attachmentId,desc', crudMethod: { ...crudAttachment }})
  },
  data() {
    return {
      headers: { 'Authorization': getToken() },
      permission: {
        add: ['admin', 'attachment:add'],
        edit: ['admin', 'attachment:edit'],
        del: ['admin', 'attachment:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'realName', display_name: '文件真实的名称' },
        { key: 'name', display_name: '文件名' },
        { key: 'suffix', display_name: '后缀' },
        { key: 'path', display_name: '相对路径' },
        { key: 'type', display_name: '类型' },
        { key: 'mimeType', display_name: '文件类型' },
        { key: 'tag', display_name: '标签' },
        { key: 'businessTable', display_name: '业务表' },
        { key: 'businessId', display_name: '业务id' },
        { key: 'extJson', display_name: '扩展信息' },
        { key: 'remark', display_name: '备注' }
      ]
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    beforeUpload(file) {
      let isLt2M = true
      isLt2M = file.size / 1024 / 1024 < 100
      if (!isLt2M) {
        this.loading = false
        this.$message.error('上传文件大小不能超过 100MB!')
      }
      this.form.name = file.name
      return isLt2M
    },
    handleSuccess(response, file, fileList) {
      this.crud.notify('上传成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
      this.$refs.upload.clearFiles()
      this.crud.status.add = CRUD.STATUS.NORMAL
      this.crud.resetForm()
      this.crud.toQuery()
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
