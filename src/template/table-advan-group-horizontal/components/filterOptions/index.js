import React, { Component } from 'react'
import { Button, Form, Select, Transfer, Modal } from '@hi-ui/hiui'
import axios from 'axios'
import './index.scss'

const FormItem = Form.Item
export default class FilterOptions extends Component {
  constructor(props) {
    super(props)
    this.searchForm = React.createRef() // 查询使用
    this.state = {
      moreSettingModel: false,
      colorList: [],
      transferData: [
        {
          id: 'goodsName',
          content: '商品名称'
        },
        {
          id: 'categorieName',
          content: '品类'
        },
        {
          id: 'specName',
          content: '规格'
        },
        {
          id: 'colorName',
          content: '颜色'
        }
      ],
      transfertargetIds: [],
      cacheTargetIds: []
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     moreSettingModel: props.moreSettingModel
  //   }
  // }

  componentDidMount() {
    this.getColor()
  }

  // 获取获取下拉框数据
  getColor = () => {
    axios.get(`https://mife-gallery.test.mi.com/hiui/colors`).then(res => {
      if (res && res.data.code === 200) {
        this.setState({
          colorList: res.data.data
        })
      }
    })
  }

  // 点击穿梭框回调
  transferChange = targetIds => {
    this.setState({
      transfertargetIds: targetIds
    })
  }

  confirmEvent = () => {
    this.setState({
      cacheTargetIds: this.state.transfertargetIds,
      moreSettingModel: false
    })
  }

  cancelEvent = () => {
    this.setState({
      transfertargetIds: this.state.cacheTargetIds,
      moreSettingModel: false
    })
  }

  queryTableData = () => {
    this.searchForm.current.validate((values, errors) => {
      console.log('values', values)
      this.props.getTableData()
    })
  }

  resetFormData = () => {
    this.searchForm.current.resetValidates()
  }

  render() {
    const { colorList, transferData, transfertargetIds, moreSettingModel, cacheTargetIds } = this.state
    return (
      <div className="table-advan_search">
        <Form ref={this.searchForm} className="table-advan_search-form">
          <div className="table-advan_search-content">
            {!cacheTargetIds.includes('goodsName') && (
              <FormItem field="goodsName">
                <Select
                  style={{ width: 120 }}
                  placeholder="请选择商品名称"
                  data={[
                    {
                      groupId: 'redmi',
                      groupTitle: '商品名称',
                      children: [
                        { id: '1', title: '小米11' },
                        { id: '2', title: '小米10' }
                      ]
                    }
                  ]}
                />
              </FormItem>
            )}
            {!cacheTargetIds.includes('categorieName') && (
              <FormItem field="categorieName">
                <Select
                  autoload
                  style={{ width: 120 }}
                  placeholder="请选择品类"
                  dataSource={keyword => {
                    return {
                      type: 'GET',
                      url: 'https://mife-gallery.test.mi.com/hiui/categories',
                      params: { title: keyword },
                      transformResponse: res => {
                        if (res && res.code === 200) {
                          return [
                            {
                              groupId: 'categories',
                              groupTitle: '品类',
                              children: res.data
                            }
                          ]
                        }
                        return []
                      }
                    }
                  }}
                />
              </FormItem>
            )}
            {!cacheTargetIds.includes('categorieName') && (
              <FormItem field="specName">
                <Select
                  autoload
                  style={{ width: 120 }}
                  placeholder="请选择规格"
                  dataSource={keyword => {
                    return {
                      type: 'GET',
                      url: 'https://mife-gallery.test.mi.com/hiui/specs',
                      params: { title: keyword },
                      transformResponse: res => {
                        if (res && res.code === 200) {
                          return [
                            {
                              groupId: 'specs',
                              groupTitle: '规格',
                              children: res.data
                            }
                          ]
                        }
                        return []
                      }
                    }
                  }}
                />
              </FormItem>
            )}
            {!cacheTargetIds.includes('categorieName') && (
              <FormItem field="colorName">
                <Select style={{ width: 120 }} placeholder="请选择颜色" data={colorList} />
              </FormItem>
            )}
            <Button
              type="primary"
              appearance="link"
              icon="setting"
              onClick={() => {
                this.setState({
                  moreSettingModel: true,
                  cacheTargetIds: this.state.transfertargetIds
                })
              }}
            >
              更多选型
            </Button>
          </div>
          <div className="table-advan_search-botton">
            <Button type="primary" onClick={this.queryTableData}>
              查询
            </Button>
            <Button type="line" onClick={this.resetFormData}>
              重置
            </Button>
          </div>
        </Form>
        <Modal title="自定义筛选" visible={moreSettingModel} onConfirm={this.confirmEvent} onCancel={this.cancelEvent}>
          <Transfer
            type="multiple"
            emptyContent={['无数据', '无数据']}
            title={['显示条件', '隐藏条件']}
            targetIds={transfertargetIds}
            data={transferData}
            onChange={this.transferChange}
          />
        </Modal>
      </div>
    )
  }
}
