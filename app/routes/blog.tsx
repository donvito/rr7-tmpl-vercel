import type { Route } from "./+types/blog";
import { db } from "~/db";
import { blogPosts } from "~/db/schema";
import { desc } from "drizzle-orm";

export function meta(args: Route.MetaArgs) {
  return [
    { title: "Blog Posts" },
    { name: "description", content: "Read our latest blog posts" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  return { posts };
}

export default function BlogPosts({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">By {post.author}</p>
            <p className="text-gray-800">{post.content}</p>
            <div className="mt-4 text-sm text-gray-500">
              Posted: {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 