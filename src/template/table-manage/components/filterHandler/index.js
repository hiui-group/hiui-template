import React, { Component } from "react"
import { Button, Form, Select } from "@hi-ui/hiui"
import axios from "axios"
import classNames from "classnames"

import "./index.scss"

const FormItem = Form.Item
export default class FilterHandler extends Component {
  constructor(props) {
    super(props)
    this.searchForm = React.createRef() // 查询使用
    this.state = {
      colorList: []
    }
    this.options = []
    for (let index = 0; index < 15; index++) {
      this.options.push({
        field: "index" + index,
        placeholder: "选项" + index
      })
    }
  }

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

  queryTableData = () => {
    this.searchForm.current.validate((values, errors) => {
      console.log("values", values)
      this.props.getTableData()
    })
  }

  resetFormData = () => {
    this.searchForm.current.resetValidates()
  }

  render() {
    const { colorList, cacheTargetIds, moreOptions } = this.state
    return (
      <div className='table-manage-handler-filter'>
        <div className='table-manage-handler-filter-btngroup'></div>
        <Form
          ref={this.searchForm}
          className={classNames("table-manage-handler-filter-form", {
            "table-manage-handler-filter-form-hidden": moreOptions
          })}>
          <div className='table-manage-handler-filter-content'>
            {!cacheTargetIds.includes("goodsName") && (
              <FormItem field='goodsName'>
                <Select
                  style={{ width: 120 }}
                  placeholder='请选择商品名称'
                  data={[
                    {
                      groupId: "redmi",
                      groupTitle: "商品名称",
                      children: [
                        { id: "1", title: "小米11" },
                        { id: "2", title: "小米10" }
                      ]
                    }
                  ]}
                />
              </FormItem>
            )}
            {!cacheTargetIds.includes("categorieName") && (
              <FormItem field='categorieName'>
                <Select
                  autoload
                  style={{ width: 120 }}
                  placeholder='请选择品类'
                  dataSource={keyword => {
                    return {
                      type: "GET",
                      url: "https://mife-gallery.test.mi.com/hiui/categories",
                      params: { title: keyword },
                      transformResponse: res => {
                        if (res && res.code === 200) {
                          return [
                            {
                              groupId: "categories",
                              groupTitle: "品类",
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
            {!cacheTargetIds.includes("categorieName") && (
              <FormItem field='specName'>
                <Select
                  autoload
                  style={{ width: 120 }}
                  placeholder='请选择规格'
                  dataSource={keyword => {
                    return {
                      type: "GET",
                      url: "https://mife-gallery.test.mi.com/hiui/specs",
                      params: { title: keyword },
                      transformResponse: res => {
                        if (res && res.code === 200) {
                          return [
                            {
                              groupId: "specs",
                              groupTitle: "规格",
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
            {!cacheTargetIds.includes("categorieName") && (
              <FormItem field='colorName'>
                <Select style={{ width: 120 }} placeholder='请选择颜色' data={colorList} />
              </FormItem>
            )}
          </div>
          <div className={"table-manage-handler-filter-botton"}>
            <Button
              type='default'
              icon={moreOptions ? "down" : "up"}
              onClick={() => {
                this.setState({
                  moreOptions: !moreOptions
                })
              }}
            />
            <div style={{ marginTop: "24px" }}>
              <Button type='primary' onClick={this.queryTableData}>
                查询
              </Button>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}
