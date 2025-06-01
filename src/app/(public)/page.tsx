import { getPosts, searchPosts } from "@/lib/post"
import PostCard from "@/components/post/PostCard"
import { PostType } from "@/types/post"

type SearchParams = {
  search?: string
}

export default async function PostsPage({searchParams} :{searchParams: Promise<SearchParams>}) {
  const resolvedSearchParams = await searchParams
  const search = resolvedSearchParams.search || ""
  const posts = search ? await searchPosts(search) : await getPosts() as PostType[]
  return (
    <div className="container mx-auto px-5 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
