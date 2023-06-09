import { reactive, ref, toRaw, onMounted } from 'vue'
import { filterObj } from '../utils/tools'
import { Message } from '@arco-design/web-vue'

export default function usePageList({
  searchForm,
  api,
  formatTableData,
  disabledMounted,
  disabledPage
}) {
  const { list, deleteById } = api
  const form = reactive({ ...searchForm })
  const modalFormRef = ref(null)
  const tableData = ref([])
  const loading = ref(false)
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    showPageSize: true,
    showJumper: true,
    hideOnSinglePage: true
  })

  onMounted(() => {
    if (!disabledMounted) {
      queryList(1)
    }
  })

  const queryList = (pageNo) => {
    loading.value = true

    if (pageNo) {
      pagination.current = pageNo
    }

    const params = getQueryParams()

    list(params)
      .then((result) => {
        const { statusCode, data, message } = result
        if (statusCode === 200) {
          tableData.value = formatTableData
            ? formatTableData(data.result)
            : data.result
          pagination.total = data.total
        } else {
          throw message
        }
      })
      .catch((error) => {
        Message.warning(`操作失败，${error.message || error}`)
      })
      .finally(() => {
        loading.value = false
      })
  }
  const onAdd = () => {
    modalFormRef.value.title = '新增'
    modalFormRef.value.onShow()
  }
  const onEdit = (record) => {
    modalFormRef.value.title = '编辑'
    modalFormRef.value.onEdit(record)
  }
  const onDelete = (id) => {
    deleteById({ id })
      .then(() => {
        Message.success('删除成功!')
        if (tableData.value.length === 1 && pagination.current > 1) {
          pagination.current--
        }
        queryList()
      })
      .catch((error) => {
        Message.warning(`操作失败，${error}`)
      })
  }

  const getQueryParams = () => {
    const param = {
      ...toRaw(form),
      pageNo: disabledPage ? null : pagination.current,
      pageSize: disabledPage ? null : pagination.pageSize
    }
    return filterObj(param)
  }
  const onPageNoChange = (pageNo) => {
    pagination.current = pageNo
    queryList()
  }
  const onPageSizeChange = (pageSize) => {
    pagination.pageSize = pageSize
    for (let index = pagination.current; index >= 1; index--) {
      if ((index - 1) * pagination.pageSize < pagination.total) {
        pagination.current = index
        break
      }
    }
    queryList()
  }
  const onSearchQuery = () => {
    queryList(1)
  }
  const onResetQuery = () => {
    Object.assign(form, { ...searchForm })
    queryList(1)
  }

  return {
    form,
    modalFormRef,
    loading,
    tableData,
    pagination,
    onPageNoChange,
    onPageSizeChange,
    onSearchQuery,
    onResetQuery,
    queryList,
    onAdd,
    onEdit,
    onDelete
  }
}
