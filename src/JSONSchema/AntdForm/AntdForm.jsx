/* eslint-disable react/prop-types */
import { Button, Form } from 'antd';
import { FmlxCheckBox, FmlxTextBox } from 'fmlx-common-ui';

const CustomTextBox = ({type, value, onChange}) => {
  const handleChange = ({value}) => {
    onChange?.(value)
  };

  return (
    <FmlxTextBox size='sm' mode={type} value={value} onChange={handleChange} />
  )
}

const CustomCheckbox = ({checked, onChange}) => {
  const handleChange = (e) => {
    onChange?.(e.target.checked)
  }

  return <FmlxCheckBox label='Remember Me' checked={checked} onChange={handleChange} />
}

const AntdForm = () => {
  const onFinish = (values) => {
    alert(JSON.stringify(values, null, 2))
  };

  return (
    <Form style={{display: 'flex', flexDirection: 'column', gap: 64}} onFinish={onFinish}>
      <Form.Item
        label="Username"
        name="username"
        layout='vertical'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <CustomTextBox type='text' />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        layout='vertical'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <CustomTextBox type='password' />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" label={null}>
        <CustomCheckbox />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
};

export default AntdForm