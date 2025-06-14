import { prisma } from "@/lib/prisma";

export async function getPosts() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
}

export async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: {
      author: {
        select: {
          name: true
        }
      }
    }
  })
  return post
}

export async function searchPosts(search: string ) {
  // 全角スペースを半角スペースに変換しつつスペースで分割 (空文字などを除外)
  const decodedSearch = decodeURIComponent(search)
  const normalizedSearch = decodedSearch.replace(/[\s ]+/g, ' ').trim()
  const searchWords = normalizedSearch.split(' ').filter(Boolean)

  const filters = searchWords.map( word => ({
    OR : [
      { title: { contains: word}},
      { content: { contains: word}},
    ]
  }))

  // 条件に合う投稿を取得
  return await prisma.post.findMany({
    where: {
      AND: filters
    },
    include: {
      author: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  })

}