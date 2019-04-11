import { observable, computed, action } from 'mobx'
import {
  getFriend,
  postFriend,
  updateFriend
} from '../api/friend'

class Friend {
  // 表格数据长度
  @observable total = 0
  // todo 表格数据
  @observable list = [

  ]
  // todo 表格查询条件
  @observable filter = {
    name: '',
    age: '',
    sex: ''
  }
  // todo 给表格提交的临时数据
  @observable tempAddItem = {
    name: '',
    age: '',
    sex: ''
  }

  // 页面的UI状态
  @observable UI = {
    showAddModal: false,
    showEditModal: false,
    showDelConfirmModal: false
  }

  // todo 规范 点击表格，删除，编辑按钮后，当前正在操作的id
  @observable currentId = -1
  // 计算属性
  @computed get currentItem () {
    return this.list.find(item => item.id === this.currentId) || {}
  }

  @action async fetch () {
    let res = await getFriend()
    this.list = res.data
  }
  @action async handleUpdate () {
    let res = await updateFriend(this.currentItem)
  }

  // todo 规范 componentWillUnMount的时候，清除该页面的状态
  @action clearStatus () {
    this.currentId = '-1'
    this.UI = {
      showAddModal: false,
      showEditModal: false,
      showDelConfirmModal: false
    }
    this.tempAddItem = {
      name: '',
      age: '',
      sex: ''
    }
  }

  // todo 规范 更新的action 都叫handleUpdate

  // todo 规范 提交都action 都叫handlePost
  @action async handlePost () {
    let res = await postFriend(this.tempAddItem)
  }

  // todo 规范
}

const friend = new Friend()

export default friend
