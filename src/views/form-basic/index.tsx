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
  Select,
  DatePicker,
  Button,
  message,
  Modal,
} from '@hi-ui/hiui'
import './index.scss'
import { IdentificationUpload } from './identification-upload'
import { ContentFooter } from '../../components/content-footer'
import { stashBasicForm, submitBasicForm } from './api'

export const FormBasic: React.FC = () => {
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

        submitBasicForm(formData).then((res) => {
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

  const getCode = () => {
    message.open({ type: 'success', title: '验证发发送成功' })
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
            title: '基础表单',
          },
        ]}
        title="基础表单"
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
      <div className="form-basic">
        <Form
          innerRef={formRef}
          initialValues={formData}
          labelWidth="100"
          labelPlacement="top"
          onValuesChange={(changedValues, allValues) => {
            setFormData(allValues)
          }}
        >
          <Card bordered={false} className="form-basic__card" title="基础信息">
            <Row gutter={56}>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="米聊号"
                  field="miNumber"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入米聊号',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                  required={true}
                  label="用户名"
                  field="userName"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入用户名',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                  required={true}
                  label="手机号"
                  field="phoneNumber"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入手机号',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input
                    placeholder="请输入手机号"
                    append={
                      <Button type="primary" onClick={getCode}>
                        获取验证码
                      </Button>
                    }
                  />
                </FormItem>
                <FormItem
                  required={true}
                  label="身份证号码"
                  field="certification"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入身份证号码',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                  required={true}
                  label="身份证照片"
                  field="IDPhoto"
                  rules={[
                    {
                      message: '请输入身份证照片',
                      trigger: 'onChange',
                      required: true,
                      validator: (rule, val, cb) => {
                        if (!val.backPhoto) cb('请上传身份证反面')
                        if (!val.frontPhoto) cb('请上传身份证正面')
                        cb('')
                      },
                    },
                  ]}
                >
                  <IdentificationUpload />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="姓名"
                  field="name"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入姓名',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                  required={true}
                  label="性别"
                  field="sex"
                  rules={[
                    {
                      message: '请输入性别',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <RadioGroup
                    defaultValue={'0'}
                    style={{ height: 32 }}
                    data={[
                      {
                        id: '0',
                        title: '男',
                      },
                      {
                        id: '1',
                        title: '女',
                      },
                      {
                        id: '2',
                        title: '未选',
                      },
                    ]}
                  />
                </FormItem>
                <FormItem
                  required={true}
                  label="验证码"
                  field="verificationCode"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入验证码',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                  required={true}
                  label="邮箱"
                  field="email"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入邮箱',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" suffix="@xiaomi.com"></Input>
                </FormItem>
                <FormItem
                  required={true}
                  label="账号状态"
                  field="accountStatus"
                  rules={[
                    {
                      message: '请输入账号状态',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <RadioGroup
                    defaultValue={'0'}
                    style={{ height: 32 }}
                    data={[
                      {
                        id: '0',
                        title: '有效',
                      },
                      {
                        id: '1',
                        title: '无效',
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="头像"
                  field="avatar"
                  rules={[
                    {
                      message: '请输入头像',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <div className="form-basic-avatar">
                    <Upload
                      type="avatar"
                      photoSize="default"
                      uploadAction="http://www.mocky.io/v2/5dc3b4413000007600347501"
                      onRemove={(file, fileList, index) => {
                        return new Promise((resolve, reject) => resolve(true))
                      }}
                      data={{ id: 'uid', channel: 'youpin' }}
                      name={'files[]'}
                    />
                  </div>
                </FormItem>
              </Col>
            </Row>
          </Card>
          <Card bordered={false} className="form-basic__card" title="岗位信息">
            <Row gutter={56}>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="工程师等级"
                  field="engineerGrade"
                  rules={[
                    {
                      message: '请输入工程师等级',
                      trigger: '',
                      required: true,
                    },
                  ]}
                >
                  <RadioGroup
                    defaultValue={'0'}
                    style={{ height: 32 }}
                    data={[
                      {
                        id: '0',
                        title: '见习',
                      },
                      {
                        id: '1',
                        title: '初级',
                      },
                      {
                        id: '2',
                        title: '中级',
                      },
                      {
                        id: '3',
                        title: '高级',
                      },
                    ]}
                  />
                </FormItem>
                <FormItem
                  required={true}
                  label="所属机构"
                  field="affiliation"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入所属机构',
                      trigger: 'onBlur,onChange',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                  required={true}
                  label="员工类型"
                  field="employeeType"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入员工类型',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <Select
                    clearable={false}
                    data={[
                      { title: '老虎型', id: '0', disabled: true },
                      { title: '孔雀型', id: '1' },
                      { title: '考拉型', id: '2' },
                      { title: '猫头鹰型', id: '3' },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="工作状态"
                  field="workingStatus"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入工作状态',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <RadioGroup
                    defaultValue={'0'}
                    style={{ height: 32 }}
                    data={[
                      {
                        id: '0',
                        title: '在岗',
                      },
                      {
                        id: '1',
                        title: '休息',
                      },
                      {
                        id: '2',
                        title: '请假',
                      },
                    ]}
                  />
                </FormItem>
                <FormItem
                  required={true}
                  label="组织"
                  field="organization"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入组织',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                  required={true}
                  label="衣服尺码"
                  field="clothesSize"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入衣服尺码',
                      trigger: 'onBlur',
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
                  label="工程师类型"
                  field="engineerType"
                  valueType="string"
                  style={{ marginTop: 92 }}
                  rules={[
                    {
                      message: '请输入工程师类型',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                  required={true}
                  label="上岗时间"
                  field="startingDate"
                  rules={[
                    {
                      message: '请输入上岗时间',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <DatePicker />
                </FormItem>
              </Col>
            </Row>
          </Card>
          <Card bordered={false} className="form-basic__card" title="结算信息">
            <Row gutter={56}>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="银行卡号"
                  field="bankCardNumber"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入银行卡号',
                      trigger: 'onBlur',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                  required={true}
                  label="开户人"
                  field="accountHolder"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入开户人',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <Select
                    data={[
                      { title: '张三', id: '1' },
                      { title: '李四', id: '2' },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="银行卡类型"
                  field="bankCardType"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入银行卡类型',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <Select
                    data={[
                      { title: '招商银行', id: '1' },
                      { title: '中国银行', id: '2' },
                      { title: '兴业银行', id: '3' },
                    ]}
                  />
                </FormItem>
                <FormItem
                  required={true}
                  label="结算分账比例"
                  field="ratio"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入结算分账比例',
                      trigger: 'onBlur',
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
                  label="开户行"
                  field="bank"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入开户行',
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
          <Card bordered={false} className="form-basic__card" title="人员权限">
            <Row gutter={56}>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="人员权限"
                  field="employeeAuthority"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入人员权限',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="请选择"
                    data={[
                      { title: '全部权限', id: '0' },
                      { title: '部分权限', id: '1' },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="机构权限"
                  field="institutionalAuthority"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入机构权限',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="默认拥有所属机构权限"
                    data={[
                      { title: '所有权限', id: '0' },
                      { title: '部分权限', id: '1' },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  required={true}
                  label="是否自动派单"
                  field="isAutoDispatch"
                  valueType="string"
                  rules={[
                    {
                      message: '请输入是否自动派单',
                      trigger: 'onChange',
                      required: true,
                    },
                  ]}
                >
                  <RadioGroup
                    defaultValue={'0'}
                    style={{ height: 32 }}
                    data={[
                      {
                        id: '0',
                        title: '是',
                      },
                      {
                        id: '1',
                        title: '否',
                      },
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
      <Modal></Modal>
    </div>
  )
}
