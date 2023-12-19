export interface AuthorStyling {
  styles: {
    color: string;
  };
  class: string;
}

export interface Author {
  _id: string;
  nickname: string;
  created: string;
}

export interface AuthorBody {
  nickname: string;
}
