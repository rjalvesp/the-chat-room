import { Author, AuthorBody } from "@sellia/types/authors";
import { api } from "@sellia/utils/api";

const entity = "authors";

export const AuthorsService = {
  Save: (author: AuthorBody): Promise<Author> =>
    api.post(`${entity}`, author).then((response) => response.data),
};
