import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import styled from "styled-components";
import { Card } from "antd";
import { Message } from "@sellia/types/messages";
import { AuthorStyling } from "@sellia/types/authors";

dayjs.extend(LocalizedFormat);

const StyledCard = styled(Card)`
  width: fit-content;
  max-width: 60%;
  margin-bottom: 0.5rem;

  .ant-card-head {
    border-bottom: 0;
    min-height: 24px;
  }
  .ant-card-body {
    padding: 0 1rem 0.25rem;
  }

  &.my-message {
    align-self: end;
  }
`;

const DatePlaceholder = styled.small`
  margin-left: 1rem;
  color: #a0a0a0;
`;

const AuthorPlaceholder = styled.small`
  margin-left: 0;
`;

interface ChatBubbleProps {
  message: Message;
  authorStyles: AuthorStyling;
}

const ChatBubble = ({
  message: { authorInfo, created, text },
  authorStyles,
}: ChatBubbleProps) => {
  return (
    <StyledCard
      size="small"
      className={authorStyles.class}
      title={
        <AuthorPlaceholder style={authorStyles.styles}>
          {authorStyles.class ? "Me" : authorInfo.nickname}
        </AuthorPlaceholder>
      }
      bordered={false}
      extra={<DatePlaceholder>{dayjs(created).format("LT")}</DatePlaceholder>}
    >
      {text}
    </StyledCard>
  );
};

export default ChatBubble;
