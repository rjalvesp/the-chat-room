import styled from "styled-components";
import { SendOutlined } from "@ant-design/icons";
import { Formik, FormikHelpers } from "formik";
import { Button, Input, Space } from "antd";
import * as Yup from "yup";

import { MessageBody } from "@sellia/types/messages";
import { MessagesService } from "@sellia/services/MessagesService";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
`;

const SendMessageSchema = Yup.object().shape({
  text: Yup.string().required("Required"),
});

const HttpInput = () => {
  const onSubmit = async (
    values: MessageBody,
    { setSubmitting, resetForm }: FormikHelpers<MessageBody>
  ) => {
    setSubmitting(true);
    await MessagesService.Send(values);
    setSubmitting(false);
    resetForm();
  };
  return (
    <Formik
      initialValues={{ text: "" }}
      validationSchema={SendMessageSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, handleSubmit, handleChange, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Space.Compact>
            <Input
              name="text"
              required
              value={values.text}
              status={errors.text ? "error" : ""}
              onChange={handleChange}
            />
            <Button
              htmlType="submit"
              type="primary"
              icon={<SendOutlined />}
              loading={isSubmitting}
              disabled={!!errors.text || isSubmitting}
            ></Button>
          </Space.Compact>
        </Form>
      )}
    </Formik>
  );
};

// {errors.email && touched.email && errors.email}
export default HttpInput;
