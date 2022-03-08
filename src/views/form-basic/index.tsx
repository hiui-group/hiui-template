import React from "react";
import {
  Card,
  Form,
  FormHelpers,
  FormItem,
  Input,
  FormSubmit,
  Row,
  Col,
  Upload,
  RadioGroup,
  Select,
  DatePicker,
  Button,
} from "@hi-ui/hiui";
import "./index.scss";

export const FormBasic: React.FC = () => {
  const formRef = React.useRef<FormHelpers>(null);
  return (
    <div className="form-basic">
      <Form
        innerRef={formRef}
        initialValues={{ productCode: "", productName: "" }}
        labelWidth="100"
        labelPlacement="top"
      >
        <Card className="form-basic-card" title="基础信息">
          <Row gutter={56}>
            <Col span={8}>
              <FormItem
                required={true}
                label="米聊号"
                field="productCode"
                valueType="string"
              >
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem
                required={true}
                label="用户名"
                field="productName"
                valueType="string"
              >
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem
                required={true}
                label="手机号"
                field="productName"
                valueType="string"
              >
                <Input
                  placeholder="请输入手机号"
                  append={<div>获取验证码</div>}
                />
              </FormItem>
              <FormItem
                required={true}
                label="身份证号码"
                field="productName"
                valueType="string"
              >
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem
                required={true}
                label="身份证照片"
                field="productName"
                valueType="string"
              >
                <Upload
                  type="avatar"
                  uploadAction="http://www.mocky.io/v2/5dc3b4413000007600347501"
                  onChange={(file, fileList, response) => {
                    console.log("upload callback", file, fileList, response);
                  }}
                  onRemove={(file, fileList, index) => {
                    console.log("remove callback", file, fileList, index);
                    return new Promise((resolve, reject) => resolve(true));
                  }}
                  data={{ id: "uid", channel: "youpin" }}
                  name={"files[]"}
                  className="form-basic-identification"
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                required={true}
                label="姓名"
                field="productCode"
                valueType="string"
              >
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem
                required={true}
                label="性别"
                field="productName"
                valueType="string"
              >
                <RadioGroup
                  defaultValue={0}
                  style={{ height: 32 }}
                  data={[
                    {
                      id: 0,
                      title: "男",
                    },
                    {
                      id: 1,
                      title: "女",
                    },
                    {
                      id: 2,
                      title: "未选",
                    },
                  ]}
                  onChange={(value) => {
                    console.log("onChange", value);
                  }}
                />
              </FormItem>
              <FormItem
                required={true}
                label="验证码"
                field="productName"
                valueType="string"
              >
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem
                required={true}
                label="邮箱"
                field="productName"
                valueType="string"
              >
                <Input placeholder="请输入" suffix="@xiaomi.com"></Input>
              </FormItem>
              <FormItem
                required={true}
                label="账号状态"
                field="productName"
                valueType="string"
              >
                <RadioGroup
                  defaultValue={0}
                  style={{ height: 32 }}
                  data={[
                    {
                      id: 0,
                      title: "有效",
                    },
                    {
                      id: 1,
                      title: "无效",
                    },
                  ]}
                  onChange={(value) => {
                    console.log("onChange", value);
                  }}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem

                required={true}
                label="头像"
                field="productCode"
                valueType="string"
              >
                <Upload
                  type="avatar"
                  photoSize="default"
                  uploadAction="http://www.mocky.io/v2/5dc3b4413000007600347501"
                  onChange={(file, fileList, response) => {
                    console.log("upload callback", file, fileList, response);
                  }}
                  onRemove={(file, fileList, index) => {
                    console.log("remove callback", file, fileList, index);
                    return new Promise((resolve, reject) => resolve(true));
                  }}
                  data={{ id: "uid", channel: "youpin" }}
                  name={"files[]"}
                />
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Card className="form-basic-card" title="岗位信息">
          <Row gutter={56}>
            <Col span={8}>
              <FormItem
                required={true}
                label="工程师等级"
                field="productCode"
                valueType="string"
              >
                <RadioGroup
                  defaultValue={0}
                  style={{ height: 32 }}
                  data={[
                    {
                      id: 0,
                      title: "见习",
                    },
                    {
                      id: 1,
                      title: "初级",
                    },
                    {
                      id: 1,
                      title: "中级",
                    },
                    {
                      id: 1,
                      title: "高级",
                    },
                  ]}
                  onChange={(value) => {
                    console.log("onChange", value);
                  }}
                />
              </FormItem>
              <FormItem
                required={true}
                label="所属机构"
                field="productName"
                valueType="string"
              >
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem
                required={true}
                label="员工类型"
                field="productName"
                valueType="string"
              >
                <Select
                  clearable={false}
                  data={[
                    { title: "老虎型", id: "0", disabled: true },
                    { title: "孔雀型", id: "1" },
                    { title: "考拉型", id: "2" },
                    { title: "猫头鹰型", id: "3" },
                  ]}
                  onChange={(ids: any) => {
                    console.log("select ids", ids);
                  }}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                required={true}
                label="工作状态"
                field="productCode"
                valueType="string"
              >
                <RadioGroup
                  defaultValue={0}
                  style={{ height: 32 }}
                  data={[
                    {
                      id: 0,
                      title: "在岗",
                    },
                    {
                      id: 1,
                      title: "休息",
                    },
                    {
                      id: 1,
                      title: "请假",
                    },
                  ]}
                  onChange={(value) => {
                    console.log("onChange", value);
                  }}
                />
              </FormItem>
              <FormItem
                required={true}
                label="组织"
                field="productName"
                valueType="string"
              >
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem
                required={true}
                label="衣服尺码"
                field="productName"
                valueType="string"
              >
                <Input placeholder="请输入" />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                required={true}
                label="工程师类型"
                field="productName"
                valueType="string"
                style={{ marginTop: 92 }}
              >
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem
                required={true}
                label="上岗时间"
                field="productName"
                valueType="string"
              >
                <DatePicker />
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Card className="form-basic-card" title="结算信息">
          <Row gutter={56}>
            <Col span={8}>
              <FormItem
                required={true}
                label="银行卡号"
                field="productCode"
                valueType="string"
              >
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem
                required={true}
                label="开户人"
                field="productName"
                valueType="string"
              >
                <Select
                  data={[
                    { title: "张三", id: 1 },
                    { title: "李四", id: 2 },
                  ]}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                required={true}
                label="银行卡类型"
                field="productCode"
                valueType="string"
              >
                <Select
                  data={[
                    { title: "招商银行", id: 1 },
                    { title: "中国银行", id: 2 },
                    { title: "兴业银行", id: 3 },
                  ]}
                />
              </FormItem>
              <FormItem
                required={true}
                label="结算分账比例"
                field="productName"
                valueType="string"
              >
                <Input placeholder="请输入" />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                required={true}
                label="开户行"
                field="productCode"
                valueType="string"
              >
                <Input placeholder="请输入" />
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Card className="form-basic-card" title="人员权限">
          <Row gutter={56}>
            <Col span={8}>
              <FormItem
                required={true}
                label="人员权限"
                field="productCode"
                valueType="string"
              >
                <Select
                  placeholder="请选择"
                  data={[
                    { title: "全部权限", id: 0 },
                    { title: "部分权限", id: 1 },
                  ]}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                required={true}
                label="机构权限"
                field="productCode"
                valueType="string"
              >
                <Select
                  placeholder="默认拥有所属机构权限"
                  data={[
                    { title: "所有权限", id: 0 },
                    { title: "部分权限", id: 1 },
                  ]}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                required={true}
                label="是否自动派单"
                field="productCode"
                valueType="string"
              >
                <RadioGroup
                  defaultValue={0}
                  style={{ height: 32 }}
                  data={[
                    {
                      id: 0,
                      title: "是",
                    },
                    {
                      id: 1,
                      title: "否",
                    },
                  ]}
                />
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Form>
      <div className="footer__fixed">
        <div className="footer-button__wrap">
          <Button type="default">取消</Button>
          <Button type="default">暂存</Button>
          <Button type="primary">提交</Button>
        </div>
      </div>
    </div>
  );
};
