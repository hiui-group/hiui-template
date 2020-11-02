import Faker from 'faker/locale/zh_CN'
import Axios from 'axios'
import MockAdapter from 'axios-mock-adapter'


const files = require.context('./', true, /.js$/)
const excludeFiles = ['index.js','common.js']

const mockAxios = new MockAdapter(Axios,{ delayResponse: 1000 })

files.keys().forEach(key => {
    const fileName = key.split('/')[1]

    // 执行对应文件的mock处理函数
    if(!excludeFiles.includes(fileName)){
        const mockFunction = files(key).default
        mockFunction('/api/' + fileName.replace('.js',''), mockAxios,Faker)
    }
})