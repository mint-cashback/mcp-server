import { getClient } from "../index";

export async function getBlogPostCategories() {
  try {
    const { data, error } = await getClient()
      .from("blog_post_categories")
      .select("*");

    if (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching blog post categories: ${error.message}`,
          },
        ],
      };
    }

    if (!data || data.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "No blog post categories found.",
          },
        ],
      };
    }

    const categoriesList = data
      .map(
        (cat: any) =>
          `- ${cat.name || cat.slug || JSON.stringify(cat)} (ID: ${cat.id})`
      )
      .join("\n");
    return {
      content: [
        {
          type: "text",
          text: `Blog Post Categories:\n${categoriesList}`,
        },
      ],
    };
  } catch (e) {
    return {
      content: [
        {
          type: "text",
          text: `Exception in getBlogCategories: ${
            e instanceof Error ? e.message : String(e)
          }`,
        },
      ],
    };
  }
}
