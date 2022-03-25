import React from 'react'
import {
  Button,
  Card,
  Stepper,
  Grid,
  Input,
  Radio,
  Upload,
  Select,
  Textarea,
  Collapse,
  FormHelpers,
} from '@hi-ui/hiui'
import { PlusOutlined } from '@hi-ui/icons'
import { ContentHeader } from '../../components/content-header'
import Form from '@hi-ui/form'
import Result from '@hi-ui/result'

const { Row, Col } = Grid
const FormItem = Form.Item
const FormList = Form.List
const RadioGroup = Radio.Group

const stepperData = [{ title: '个人信息' }, { title: '家庭成员' }, { title: '完成创建' }]
const defaultFormInitialValuesForStepOne = {
  name: '',
  sex: 1,
  avatar: '',
  tel: '',
  email: '',
  department: '',
  job: '',
  office: '',
  signature: '',
}
const defaultFormInitialValuesForStepTwo = {
  familyRelations: [
    {
      type: '',
      name: '',
      tel: '',
      address: '',
      addressDetail: '',
    },
  ],
}

export const FormSteps = () => {
  const [step, setStep] = React.useState(1)

  const [formInitialValuesForStepOne, setFormInitialValuesForStepOne] = React.useState(
    defaultFormInitialValuesForStepOne
  )

  const [formInitialValuesForStepTwo, setFormInitialValuesForStepTwo] = React.useState(
    defaultFormInitialValuesForStepTwo
  )

  const formInnerRefForStepOne = React.useRef<FormHelpers>(null)
  const formInnerRefForStepTwo = React.useRef<FormHelpers>(null)

  const renderContentCurrentStep = () => {
    switch (step) {
      // 第一步
      case 1:
        return (
          <Form
            key="1"
            innerRef={formInnerRefForStepOne}
            initialValues={formInitialValuesForStepOne}
            onValuesChange={(changedValues, allValues) => {
              setFormInitialValuesForStepOne(allValues as any)
            }}
            labelPlacement="top"
            style={{ width: 520 }}
          >
            <Row gutter rowGap={0}>
              <Col span={12}>
                <FormItem
                  label="姓名"
                  field="name"
                  required
                  valueType="string"
                  rules={[
                    {
                      message: '请输入姓名',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </FormItem>
                <FormItem
                  valueType="number"
                  required
                  rules={[
                    {
                      message: '请输入性别',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                  label="性别"
                  field="sex"
                >
                  <RadioGroup
                    data={[
                      { id: 1, title: '男' },
                      { id: 2, title: '女' },
                    ]}
                  />
                </FormItem>
              </Col>

              <Col span={12}>
                <FormItem label="头像" field="avatar">
                  <Upload type="photo" />
                </FormItem>
              </Col>
            </Row>
            <Row gutter rowGap={0}>
              <Col span={12}>
                <FormItem
                  valueType="string"
                  required
                  rules={[
                    {
                      message: '请输入电话',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                  label="电话"
                  field="tel"
                >
                  <Input />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  valueType="email"
                  required
                  rules={[
                    {
                      message: '请输入邮箱',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                  label="邮箱"
                  field="email"
                  // @ts-ignore
                  valueDispatchTransform={(evt) => {
                    return evt.target.value + '@xiaomi.com'
                  }}
                  valueConnectTransform={(value) => {
                    return value ? value.replace('@xiaomi.com', '') : value
                  }}
                >
                  <Input suffix="@xiaomi.com" />
                </FormItem>
              </Col>
            </Row>

            <Row gutter rowGap={0}>
              <Col span={12}>
                <FormItem
                  valueType="number"
                  rules={[
                    {
                      message: '请输入部门',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                  label="部门"
                  required
                  field="department"
                >
                  <Select
                    data={[
                      { id: 1, title: '酱油部' },
                      { id: 2, title: '摸鱼部' },
                      { id: 3, title: '监督部' },
                      { id: 4, title: '伙食部' },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  valueType="number"
                  rules={[
                    {
                      message: '请输入职位',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                  label="职位"
                  required
                  field="job"
                >
                  <Select
                    data={[
                      { id: 1, title: '软件攻城师' },
                      { id: 2, title: '产品构想师' },
                      { id: 3, title: '设计交互师' },
                      { id: 4, title: '测试保障师' },
                    ]}
                  />
                </FormItem>
              </Col>
            </Row>

            <Row gutter rowGap={0}>
              <Col span={24}>
                <FormItem label="办公区域" field="office">
                  <Select
                    data={[
                      { id: 'beijing', title: '北京' },
                      { id: 'shanghai', title: '上海' },
                      { id: 'shenzhen', title: '深圳' },
                      { id: 'wuhan', title: '武汉' },
                    ]}
                  />
                </FormItem>
              </Col>
            </Row>

            <Row gutter rowGap={0}>
              <Col span={24}>
                <FormItem field="signature">
                  <Textarea placeholder="请输入具体区域信息" />
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Button
                  type="primary"
                  onClick={() => {
                    formInnerRefForStepOne.current?.validate().then(() => {
                      setStep(2)
                    })
                  }}
                >
                  下一步
                </Button>
              </Col>
            </Row>
          </Form>
        )
      // 第二步
      case 2:
        return (
          <Form
            key="2"
            innerRef={formInnerRefForStepTwo}
            initialValues={formInitialValuesForStepTwo}
            onValuesChange={(changedValues, allValues) => {
              setFormInitialValuesForStepTwo(allValues as any)
            }}
            // initialValues={{ familyRelations: [{ a: 1 }] }}
            labelPlacement="top"
            style={{ width: 520 }}
          >
            <FormList name="familyRelations">
              {(fields, actions) => {
                console.log('fields', fields)

                return (
                  <div>
                    {fields.map((field, index) => {
                      return (
                        <Collapse
                          // bordered={false}
                          key={index}
                          defaultActiveId={['1']}
                          arrowPlacement="right"
                        >
                          <Collapse.Panel title={`家庭成员 ${index + 1}`} id="1">
                            <Row gutter rowGap={0}>
                              <Col span={12}>
                                <FormItem
                                  valueType="number"
                                  rules={[
                                    {
                                      message: '请输入关系',
                                      trigger: 'onBlur',
                                      required: true,
                                    },
                                  ]}
                                  label="关系"
                                  required
                                  field="type"
                                >
                                  <Select
                                    data={[
                                      { id: 1, title: '父亲' },
                                      { id: 2, title: '母亲' },
                                      { id: 3, title: '兄弟' },
                                      { id: 4, title: '姐妹' },
                                    ]}
                                  />
                                </FormItem>
                              </Col>
                            </Row>

                            <Row gutter rowGap={0}>
                              <Col span={12}>
                                <FormItem
                                  valueType="string"
                                  rules={[
                                    {
                                      message: '请输入姓名',
                                      trigger: 'onBlur',
                                      required: true,
                                    },
                                  ]}
                                  required
                                  label="姓名"
                                  field="name"
                                >
                                  <Input />
                                </FormItem>
                              </Col>
                              <Col span={12}>
                                <FormItem
                                  valueType="string"
                                  rules={[
                                    {
                                      message: '请输入电话',
                                      trigger: 'onBlur',
                                      required: true,
                                    },
                                  ]}
                                  required
                                  label="电话"
                                  field="tel"
                                >
                                  <Input />
                                </FormItem>
                              </Col>
                            </Row>

                            <Row gutter rowGap={0}>
                              <Col span={24}>
                                <FormItem label="地址" field="address" placeholder="请输入">
                                  <Input />
                                </FormItem>
                              </Col>
                            </Row>

                            <Row gutter rowGap={0}>
                              <Col span={24}>
                                <FormItem field="addressDetail">
                                  <Textarea placeholder="请输入地址详情" />
                                </FormItem>
                              </Col>
                            </Row>
                          </Collapse.Panel>
                        </Collapse>
                      )
                    })}
                    <Button
                      type="secondary"
                      style={{ width: '100%' }}
                      onClick={() => {
                        actions.add({ ...defaultFormInitialValuesForStepTwo.familyRelations[0] })
                      }}
                    >
                      添加成员
                    </Button>
                  </div>
                )
              }}
            </FormList>

            <Row>
              <Col span={24}>
                <Button
                  type="default"
                  onClick={() => {
                    setStep(1)
                  }}
                >
                  上一步
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    formInnerRefForStepTwo.current?.validate().then(() => {
                      // TODO： 请求接口
                      setStep(3)
                    })
                  }}
                >
                  下一步
                </Button>
              </Col>
            </Row>
          </Form>
        )
      // 最后一步
      default:
        return (
          <div key="3">
            <Result type="success" title={'创建成功'} content="您可以继续创建、或进行下一步操作">
              <Button
                type="primary"
                onClick={() => {
                  setFormInitialValuesForStepOne(defaultFormInitialValuesForStepOne)
                  setFormInitialValuesForStepTwo(defaultFormInitialValuesForStepTwo)
                  setStep(1)
                }}
              >
                继续创建
              </Button>
              <Button>返回首页</Button>
            </Result>
          </div>
        )
    }
  }

  return (
    <div>
      <ContentHeader
        breadcrumbs={[
          {
            title: '首页',
            path: 'home',
          },
          {
            title: '分步表单',
          },
        ]}
        title="分步表单"
        toolbar={
          <div>
            <Button>次要操作</Button>
            <Button>次操作</Button>
            <Button icon={<PlusOutlined />} type="primary">
              主操作
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
          <Stepper style={{ width: 520 }} data={stepperData} current={step}></Stepper>
        </div>
      </ContentHeader>
      <div style={{ padding: '20px 20px 83px' }}>
        <Card bordered={false} hoverable>
          <div style={{ display: 'flex', padding: '0 60px', justifyContent: 'center' }}>
            {renderContentCurrentStep()}
          </div>
        </Card>
      </div>
    </div>
  )
}
