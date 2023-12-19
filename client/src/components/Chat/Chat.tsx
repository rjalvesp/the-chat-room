import { useEffect, useRef, useState, UIEvent } from "react";
import { faker } from "@faker-js/faker";
import { Typography } from "antd";
import io from "socket.io-client";
import styled from "styled-components";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import ChatBubble from "@sellia/components/Chat/ChatBubble";
import HttpInput from "@sellia/components/HttpInput/HttpInput";
import { Message } from "@sellia/types/messages";
import { AuthorStyling } from "@sellia/types/authors";
import { MessagesService } from "@sellia/services/MessagesService";

dayjs.extend(LocalizedFormat);

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fafafa;
`;

const Content = styled.div`
  min-height: calc(100vh - 48px - 60px - 0.5em);
  height: calc(100vh - 48px - 60px - 0.5em);
  width: 100%;
  padding: 0.25rem 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [authorStyles, setAuthorStyles] = useState<
    Record<string, AuthorStyling>
  >({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_URL!);

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("serverMessage", (message: Message) => {
      if (!authorStyles[message.authorId]) {
        const isMine = message.authorId === sessionStorage.id;
        authorStyles[message.authorId] = {
          class: isMine ? "my-message" : "",
          styles: {
            color: faker.color.rgb(),
          },
        };
        setAuthorStyles(authorStyles);
      }
      setMessages([...messages, message]);
    });

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    return () => {
      socket.disconnect();
    };
  }, [messages, authorStyles]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const top = (e.target as HTMLDivElement).scrollTop === 0;
    if (!top) {
      return;
    }
    const fetch = async () => {
      const olderMessages = await MessagesService.GetPrevious({
        previousDate: messages[0].created,
        limit: 10,
      });
      setMessages([...(olderMessages || []), ...messages]);
    };
    fetch();
  };

  return (
    <Container>
      <TitleContainer>
        <Typography.Title level={1}>The chat room</Typography.Title>
      </TitleContainer>
      <Content onScroll={handleScroll}>
        {(messages || []).map((message) => {
          return (
            <ChatBubble
              key={message._id}
              message={message}
              authorStyles={authorStyles[message.authorId]}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </Content>
      <HttpInput />
    </Container>
  );
};

export default Chat;
