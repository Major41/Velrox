import { PostForm } from "@/components/PostForm";

export const metadata = {
  title: "Create Post | Velrox Admin",
  description: "Create a new blog post",
};

export default function CreatePostPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
        <p className="text-muted-foreground">
          Write and publish a new blog post about smartphone repair tips.
        </p>
      </div>

      <PostForm />
    </div>
  );
}
