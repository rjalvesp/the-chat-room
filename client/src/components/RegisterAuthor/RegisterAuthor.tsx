import { useEffect, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import styled from "styled-components";
import { v4 } from "uuid";
import { Button, Input, Modal } from "antd";
import { AuthorBody } from "@sellia/types/authors";
import { AuthorsService } from "@sellia/services/AuthorsService";
import { SaveOutlined } from "@ant-design/icons";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;

  .ant-btn-primary {
    margin-top: 1rem;
    width: fit-content;
    align-self: end;
  }
`;

interface RegisterAuthorProps {
  onSessionStarted: () => void;
}

const RegisterAuthor = ({ onSessionStarted }: RegisterAuthorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (!sessionStorage.id) {
      sessionStorage.setItem("id", v4());
    }
  }, []);

  const onSubmit = async (
    values: AuthorBody,
    { setSubmitting }: FormikHelpers<AuthorBody>
  ) => {
    setSubmitting(true);
    const { _id } = await AuthorsService.Save(values);
    sessionStorage.setItem("id", _id);
    setIsModalOpen(false);
    setSubmitting(false);
    onSessionStarted();
  };

  return (
    <Modal
      title="Welcome to The Chat Room"
      open={isModalOpen}
      closable={false}
      maskClosable={false}
    >
      <Formik initialValues={{ nickname: "" }} onSubmit={onSubmit}>
        {({ values, errors, handleSubmit, handleChange, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Input
              name="nickname"
              value={values.nickname}
              onChange={handleChange}
            />
            <Button
              htmlType="submit"
              type="primary"
              icon={<SaveOutlined />}
              loading={isSubmitting}
              disabled={!!errors.nickname || isSubmitting}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RegisterAuthor;
