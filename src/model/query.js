import { observable, computed, action } from 'mobx'

class Query {
  @observable total = 0
  @observable list = [
    { name: '小a', age: '30', sex: 'man', id: 1 },
    { name: '小b', age: '40', sex: 'girl', id: 2 },
    { name: '小c', age: '50', sex: 'boy', id: 3 }
  ]
  @observable filter = {
    name: '',
    age: '',
    sex: ''
  }
  @observable addItem = {
    name: '',
    age: '',
    sex: ''
  }
  @observable showAddModal = false
  @observable showEditModal = false
  @observable showDelConfirmModal = false
  @observable currentId = -1
  @computed get currentItem () {
    return this.list.find(item => item.id === this.currentId) || {}
  }

  @action openAddModal () {
    this.showAddModal = true
    this.tempAddItem = {
      name: '',
      age: '',
      sex: ''
    }
  }
  @action closeAddModal () {
    this.showAddModal = false
  }

  @action openEditModal (id) {
    this.currentId = id
    this.showEditModal = true
  }

  @action closeEditModal () {
    this.showEditModal = false
  }

  @action openDelConfirmModal () {
    this.showDelConfirmModal = true
  }
  @action closeDelConfirmModal () {
    this.showDelConfirmModal = false
  }
  @action updateCurrentItemByName (name, value) {
    let index = this.list.findIndex(item => this.currentId === item.id)
    console.log(index, JSON.parse(JSON.stringify(this.list)), this.currentId)
    this.list[index][name] = value
  }
  @action updateAddItemByName (name, value) {
    this.addItem[name] = value
  }
  @action handleUpdate () {
    this.list = [...this.list]
  }
  @action handlePost() {
    this.list.push(this.tempAddItem)
  }

  @action fetch () {
    setTimeout(() => {
      action((a) => {
        console.log(a)
      })
    }, 3000)
  }
}

export default new Query()
