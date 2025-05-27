import { getClient } from "../index";

export async function getBrands(params: {
  page: number;
  search_query?: string;
}) {
  const { page, search_query } = params;
  const pageSize = 10;

  let query = getClient()
    .from("brands")
    .select("*")
    .order("priority", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (search_query) {
    query = query.ilike("name", `%${search_query}%`);
  }

  const { data, error } = await query;
  if (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error fetching brands: ${error.message}`,
        },
      ],
    };
  }
  if (!data || data.length === 0) {
    return {
      content: [
        {
          type: "text",
          text: "No brands found.",
        },
      ],
    };
  }
  const brandsList = data.map((brand: any) => `- ${brand.name || brand.slug} (slug: ${brand.slug})`).join("\n");
  return {
    content: [
      {
        type: "text",
        text: `Brands (page ${page}):\n${brandsList}`,
      },
    ],
  };
}

export async function getBrand(params: { slug?: string; id?: string }) {
  const { slug, id } = params;
  if (!slug && !id) {
    return {
      content: [
        {
          type: "text",
          text: "Either slug or id is required.",
        },
      ],
    };
  }

  let query = getClient().from("brands").select("*");

  if (slug) {
    query = query.eq("slug", slug);
  } else if (id) {
    query = query.eq("id", id);
  }

  const { data, error } = await query.single();
  if (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error fetching brand: ${error.message}`,
        },
      ],
    };
  }
  if (!data) {
    return {
      content: [
        {
          type: "text",
          text: "Brand not found.",
        },
      ],
    };
  }
  return {
    content: [
      {
        type: "text",
        text: `Brand: ${data.name || data.slug}\nSlug: ${data.slug}\nDescription: ${data.description || "(no description)"}`,
      },
    ],
  };
}
