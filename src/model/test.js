import { observable } from 'mobx'

class Test {
  @observable name = 'test'
}

export default new Test()
