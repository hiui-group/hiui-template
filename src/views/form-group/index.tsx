import React, { useState } from 'react'
import { PlusOutlined } from '@hi-ui/icons'
import { ContentHeader } from '../../components/content-header'
import {
  Card,
  Form,
  FormHelpers,
  FormItem,
  Input,
  Row,
  Col,
  Upload,
  RadioGroup,
  Button,
  message,
  Modal,
  Select,
  DatePicker,
} from '@hi-ui/hiui'
import './index.scss'
import { IdentificationUpload } from './identification-upload'
import { ContentFooter } from '../../components/content-footer'
import { stashBasicForm, submitBasicForm } from './api'
import { Table } from '@hi-ui/hiui'
import { TableInputGroup } from './table-input-group'

const h1TitleStyle = {
  height: '56px',
  lineHeight: '56px',
  fontSize: '16px',
  color: '#1F2733',
  padding: '0 20px',
  fontWeight: 600,
}

export const FormGroup: React.FC = () => {
  const formRef = React.useRef<FormHelpers>(null)
  const [loading, setLoading] = useState<{ stashLoading: boolean; saveLoading: boolean }>({
    stashLoading: false,
    saveLoading: false,
  })
  const [formData, setFormData] = useState<any>({
    miNumber: undefined,
    userName: undefined,
    phoneNumber: undefined,
    certification: undefined,
    IDPhoto: { frontPhoto: undefined, backPhoto: undefined },
    name: undefined,
    sex: '0',
    verificationCode: undefined,
    email: undefined,
    accountStatus: '0',
    avatar: undefined,
    engineerGrade: '0',
    affiliation: undefined,
    employeeType: '0',
    workingStatus: '0',
    organization: undefined,
    clothesSize: undefined,
    engineerType: undefined,
    startingDate: undefined,
    bankCardNumber: undefined,
    accountHolder: undefined,
    bankCardType: undefined,
    ratio: undefined,
    bank: undefined,
    employeeAuthority: undefined,
    institutionalAuthority: undefined,
    isAutoDispatch: '0',
  })

  /**
   * 取消
   */
  const handleCancel = () => {
    Modal.confirm({
      type: 'warning',
      title: '提示',
      content: '有数据未保存，确认取消？',
      cancelText: null,
      confirmText: '确定',
    })
  }

  /**
   * 暂存
   */
  const handleStash = () => {
    formRef.current
      ?.validate()
      .then((formData) => {
        setLoading({
          ...loading,
          stashLoading: true,
        })

        stashBasicForm(formData).then((res) => {
          if (res.code === 200) {
            message.open({ type: 'success', title: res.message })
          } else {
            message.open({ type: 'error', title: res.message })
          }
          setLoading({
            ...loading,
            stashLoading: false,
          })
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  /**
   * 提交
   */
  const handleSubmit = () => {
    formRef.current
      ?.validate()
      .then((formData) => {
        setLoading({
          ...loading,
          saveLoading: true,
        })

        submitBasicForm(formData).then((res: any) => {
          if (res.code === 200) {
            message.open({ type: 'success', title: res.message })
          } else {
            message.open({ type: 'error', title: res.message })
          }
          setLoading({
            ...loading,
            saveLoading: false,
          })
        })
      })
      .catch((error) => {
        console.error(error)
      })
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
            title: '分组表单',
          },
        ]}
        title="分组表单"
        toolbar={
          <div>
            <Button>次要操作</Button>
            <Button>次操作</Button>
            <Button icon={<PlusOutlined />} type="primary">
              主操作
            </Button>
          </div>
        }
      />
      <div style={{ padding: '0 20px 20px' }}>
        <Form
          innerRef={formRef}
          initialValues={formData}
          labelWidth="100"
          labelPlacement="top"
          onValuesChange={(changedValues, allValues) => {
            setFormData(allValues)
          }}
        >
          <div style={h1TitleStyle}>基本信息</div>
          <Card className="form-basic__card" title="机构概况" bordered={false} size="sm">
            <Row gutter={56}>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="机构类型"
                  field="authorityType"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入机构类型',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                  required={true}
                  label="机构名称"
                  field="authorityName"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入机构名称',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <Select
                    data={[
                      { title: '红米', id: '1' },
                      { title: '小米', id: '2' },
                    ]}
                  />
                </FormItem>
                <FormItem
                  required={true}
                  label="机构级别"
                  field="authorityLevel"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入机构级别',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <Select
                    data={[
                      { title: '王者', id: '1' },
                      { title: '大师', id: '2' },
                      { title: '钻石', id: '3' },
                      { title: '翡翠', id: '4' },
                      { title: '铂金', id: '4' },
                    ]}
                  />
                </FormItem>
                <FormItem
                  required={true}
                  label="生产工厂"
                  field="productionFactory"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入生产工厂',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="主子站"
                  field="masterStation"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入主子站',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                  required={true}
                  label="机构简称"
                  field="authorityCode"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入机构简称',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                  required={true}
                  label="仓库类型"
                  field="warehouseType"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入仓库类型',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Select
                    data={[
                      {
                        id: '1',
                        title: '大型',
                      },
                      {
                        id: '2',
                        title: '中型',
                      },
                      {
                        id: '3',
                        title: '小型',
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="机构状态"
                  field="authorityStatus"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入机构状态',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Select
                    data={[
                      { id: '1', title: '待产' },
                      { id: '2', title: '生产中' },
                      { id: '3', title: '富盈' },
                    ]}
                  />
                </FormItem>
                <FormItem
                  required={true}
                  label="是否小米自营"
                  field="byXiaoMI"
                  valueType="string"
                  rules={[
                    {
                      message: '请确认是否小米自营',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <RadioGroup
                    data={[
                      { id: '1', title: '是' },
                      { id: '2', title: '否' },
                    ]}
                  ></RadioGroup>
                </FormItem>
                <FormItem
                  required={true}
                  label="发货仓"
                  field="deliveryWarehouse"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入发货仓',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Select
                    data={[
                      { id: '1', title: '深圳' },
                      { id: '2', title: '武汉' },
                    ]}
                  />
                </FormItem>
              </Col>
            </Row>
          </Card>

          <div style={h1TitleStyle}>资质信息</div>
          <Card className="form-basic__card" title="负责人信息" size="sm">
            <Row gutter={56}>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="负责人"
                  field="principal"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入负责人',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                  required={true}
                  label="负责人电话"
                  field="principalTelephone"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入负责人电话',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem label="负责人身份证号码" field="principalCardId">
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem label="负责人身份证照片" field="principalPhoto">
                  <IdentificationUpload />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="网点经理"
                  field="networkManager"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入网点经理',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                  required={true}
                  label="网点经理电话"
                  field="networkManagerPhone"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入网点经理电话',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem label="网点经理身份证号码" field="networkManagerCardID">
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem label="网点经理身份证照片" field="networkManagerPhoto">
                  <IdentificationUpload />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="紧急联系人"
                  field="emergencyContact"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入紧急联系人',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                  required={true}
                  label="紧急联系人电话"
                  field="emergencyContactPhone"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入紧急联系人电话',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
              </Col>
            </Row>
          </Card>

          <Card className="form-basic__card" title="企业信息" size="sm">
            <Row gutter={56}>
              <Col span={8}>
                <FormItem label="企业性质" field="enterpriseProperty">
                  <Select
                    data={[
                      { id: '1', title: '私营' },
                      { id: '2', title: '国企' },
                      { id: '3', title: '中外合资' },
                    ]}
                  />
                </FormItem>
                <FormItem label="工商营业期限" field="businessTerm">
                  <DatePicker placeholder="请选择" />
                </FormItem>
                <FormItem label="营业执照" field="businessLicensePhoto">
                  <Upload />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="注册资金" field="registeredCapital">
                  <Input placeholder="请输入" suffix="万元" />
                </FormItem>
                <FormItem label="税务有效期限" field="taxDeadline">
                  <DatePicker placeholder="请选择" />
                </FormItem>
                <FormItem label="合同扫描件" field="contractScanningFiles">
                  <Upload />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="工商注册号" field="registeredNumber">
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem label="门店有效租期" field="storesLease">
                  <Select
                    data={[
                      { id: '1', title: '一年' },
                      { id: '2', title: '三年' },
                      { id: '3', title: '五年' },
                      { id: '4', title: '十年' },
                    ]}
                  />
                </FormItem>
                <FormItem label="装修文件" field="decorateFiles">
                  <Upload />
                </FormItem>
              </Col>
            </Row>
          </Card>

          <div style={h1TitleStyle}>服务信息</div>
          <Card className="form-basic__card" title="营业预约" size="sm">
            <Row gutter={56}>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="营业时间"
                  field="businessHours"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入营业时间',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <DatePicker type="daterange" />
                </FormItem>
              </Col>
            </Row>
            <Row gutter>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="单日上门最大值"
                  field="maximumDoorInOneDay"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入单日上门最大值',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
              </Col>
            </Row>

            <Row gutter>
              <Col span={24}>
                <FormItem
                  label="到点预约值"
                  field="appointmentValue"
                  render={(props) => {
                    return <TableInputGroup {...props} />
                  }}
                />
              </Col>
            </Row>
          </Card>

          <Card className="form-basic__card" title="服务范围" size="sm">
            <Row gutter={56}>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="机构子类型"
                  field="institutionsSubtype"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入机构子类型',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                  required={true}
                  label="服务方式"
                  field="serviceMode"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入服务方式',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Select
                    data={[
                      {
                        id: '1',
                        title: '线上',
                      },
                      {
                        id: '2',
                        title: '线下门店',
                      },
                      {
                        id: '3',
                        title: '上门服务',
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="网点标示"
                  field="networkMarking"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入姓名',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <Select
                    data={[
                      { id: '1', title: '北京' },
                      { id: '2', title: '上海' },
                    ]}
                  />
                </FormItem>
                <FormItem
                  required={true}
                  label="联机号"
                  field="onlineNumber"
                  rules={[
                    {
                      message: '请输入联机号',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="系统等级"
                  field="systemLevel"
                  rules={[
                    {
                      message: '请输入系统等级',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>

                <FormItem
                  required={true}
                  label="合作类型"
                  field="cooperationType"
                  rules={[
                    {
                      message: '请输入合作类型',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <Select
                    data={[
                      { id: '1', title: '商务合作' },
                      { id: '2', title: '研发合作' },
                    ]}
                  />
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
      </div>
      <ContentFooter>
        <div className="footer__body">
          <Button type="default" onClick={handleCancel}>
            取消
          </Button>
          <Button type="default" onClick={handleStash} loading={loading.stashLoading}>
            暂存
          </Button>
          <Button type="primary" onClick={handleSubmit} loading={loading.saveLoading}>
            提交
          </Button>
        </div>
      </ContentFooter>
    </div>
  )
}
