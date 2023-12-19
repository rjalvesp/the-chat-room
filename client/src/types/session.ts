export interface Session {
  id: string;
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
}
