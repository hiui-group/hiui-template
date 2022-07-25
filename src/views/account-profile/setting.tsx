import { Col, Form, FormItem, FormSubmit, Input, Row, Select, Upload } from '@hi-ui/hiui'

export default function AccountProfile() {
  return (
    <div className="hi-pro-account-profile-contentbox">
      <div className="hi-pro-account-profile-contentbox-title">个人信息</div>
      <div className="hi-pro-account-setting">
        <Form
          initialValues={{
            userName: '张三',
            userNo: '000000',
            userMiliao: '00000000',
            userTel: '00000000000',
            userDepartment: "1",
            userRole: "1",
            roleLevel: "2"
          }}
          labelPlacement="top"
        >
          <Row gutter={true}>
            <Col span={12}>
              <FormItem required={true} label="用户名" field="userName" valueType="string">
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem required={true} label="工号" field="userNo" valueType="string">
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem required={true} label="米聊号" field="userMiliao" valueType="string">
                <Input placeholder="请输入" />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="头像" field="avatar">
                <div className="hi-pro-account-settings-avatar">
                  <Upload
                    type="avatar"
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
          <FormItem required={true} label="电话" field="userTel" valueType="string">
            <Input placeholder="请输入" />
          </FormItem>
          <FormItem required={true} label="邮箱" field="userMail" valueType="string">
            <Input placeholder="请输入" suffix="@xiaomi.com" />
          </FormItem>
          <FormItem required={true} label="部门" field="userDepartment" valueType="string">
            <Select
              placeholder="请选择"
              data={[
                { title: '研发部', id: '1' },
                { title: '产品部', id: '2' },
                { title: '运营部', id: '3' },
              ]}
            />
          </FormItem>
          <Row gutter={true}>
            <Col span={12}>
              <FormItem required={true} label="职位" field="userRole" valueType="string">
                <Select
                  placeholder="请选择"
                  data={[
                    { title: '前端工程师', id: '1' },
                    { title: '后端工程师', id: '2' },
                    { title: '算法工程师', id: '3' },
                    { title: '运维工程师', id: '4' },
                  ]}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem required={true} label="级别" field="roleLevel" valueType="string">
                <Select
                  placeholder="请选择"
                  data={[
                    { title: '初级', id: '1' },
                    { title: '中级', id: '2' },
                    { title: '高级', id: '3' },
                    { title: '资深', id: '4' },
                    { title: '架构师', id: '5' },
                  ]}
                />
              </FormItem>
            </Col>
          </Row>
          <FormItem valueType="string">
            <FormSubmit
              type="primary"
              onClick={(values, errors) => {
                console.log('Get form value:', values, errors)
              }}
            >
              保存
            </FormSubmit>
          </FormItem>
        </Form>
      </div>
    </div>
  )
}
