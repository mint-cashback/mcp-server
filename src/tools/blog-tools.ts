import { getClient } from "../index";

export async function getBlogPosts(params: {
  page: number;
  search_query?: string;
  slug?: string;
}) {
  try {
    const { page, search_query, slug } = params;
    const pageSize = 10;

    if (slug) {
      const { data, error } = await getClient()
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error fetching blog post: ${error.message}`,
            },
          ],
          data: null,
        };
      }
      if (!data) {
        return {
          content: [
            {
              type: "text",
              text: `No blog post found for slug: ${slug}`,
            },
          ],
          data: null,
        };
      }
      return {
        content: [
          {
            type: "text",
            text: `Blog Post: ${data.title || data.slug}\nSlug: ${
              data.slug
            }\nBody: ${typeof data.body === "string" ? data.body : (data.body && data.body.html ? data.body.html : JSON.stringify(data.body) || "(no body)")}`,
          },
        ],
        data: data,
      };
    }

    let query = getClient()
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (search_query) {
      query = query.ilike("title", `%${search_query}%`);
    }

    const { data, error } = await query;
    if (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching blog posts: ${error.message}`,
          },
        ],
        data: null,
      };
    }
    if (!data || data.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "No blog posts found.",
          },
        ],
        data: [],
      };
    }
    const postsList = data
      .map((post: any) => `- ${post.title || post.slug} (slug: ${post.slug})`)
      .join("\n");
    return {
      content: [
        {
          type: "text",
          text: `Blog Posts (page ${page}):\n${postsList}`,
        },
      ],
      data: data,
    };
  } catch (e) {
    return {
      content: [
        {
          type: "text",
          text: `Exception in getBlogPosts: ${
            e instanceof Error ? e.message : String(e)
          }`,
        },
      ],
      data: null,
    };
  }
}

export async function createBlogPost(params: {
  title: string;
  body: any;
  slug: string;
  categoryId: number;
}) {
  try {
    const { title, body, slug, categoryId } = params;
    if (typeof body !== "object" || body === null) {
      const errMsg = "'body' must be a JSON object.";
      console.error("[createBlogPost]", errMsg, { body });
      return {
        content: [
          {
            type: "text",
            text: `Error: ${errMsg}`,
          },
        ],
      };
    }
    const { data, error } = await getClient()
      .from("blog_posts")
      .insert({
        title,
        body,
        slug,
        blog_post_category_id: categoryId,
      })
      .select();
    if (error) {
      console.error("[createBlogPost] Error creating blog post:", error.message, { error });
      return {
        content: [
          {
            type: "text",
            text: `Error creating blog post: ${error.message}`,
          },
        ],
      };
    }
    if (!data || data.length === 0) {
      const errMsg = "Blog post creation failed.";
      console.error("[createBlogPost]", errMsg, { data });
      return {
        content: [
          {
            type: "text",
            text: errMsg,
          },
        ],
      };
    }
    const post = data[0];
    return {
      content: [
        {
          type: "text",
          text: `Blog post created!\nTitle: ${post.title}\nSlug: ${post.slug}`,
        },
      ],
    };
  } catch (e) {
    console.error("[createBlogPost] Exception:", e);
    return {
      content: [
        {
          type: "text",
          text: `Exception in createBlogPost: ${
            e instanceof Error ? e.message : String(e)
          }`,
        },
      ],
    };
  }
}
