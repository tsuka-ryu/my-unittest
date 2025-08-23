import type { Article, ArticleInput, Articles, Profile } from "./type";

async function handleResponse(res: Response) {
  const data = await res.json();
  if (!res.ok) {
    throw data;
  }
  return data;
}

const host = (path: string) => `https://myapi.testing.com${path}`;

export async function getMyProfile(): Promise<Profile> {
  const res = await fetch(host("/my/profile"));
  return handleResponse(res);
}

export async function getMyArticles(): Promise<Articles> {
  const res = await fetch(host("/my/articles"));
  return handleResponse(res);
}

export async function postMyArticle(input: ArticleInput): Promise<Article> {
  const res = await fetch(host("/my/articles"), {
    method: "POST",
    body: JSON.stringify(input),
  });
  return handleResponse(res);
}
