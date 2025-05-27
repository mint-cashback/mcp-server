# MCP Server ⚙️

A Model Context Protocol (MCP) that provides tools for fetching Mint Cashback data and content.

## 🔧 Available Tools (Features)

### `what_is_mint_cashback()`

Fetches the Mint Cashback about page.

**Parameters:**

- None

**Returns:**

- A string containing a detailed explanation of what Mint Cashback is (from about.txt).

### `get_blog_post_categories()`

Fetches Mint Cashback blog post categories.

**Returns:**

- A list of blog post categories.

### `get_blog_posts()`

Fetches Mint Cashback blog posts.

**Parameters:**

- `page` (required): The page number to return.
- `search_query` (optional): Filter blog posts by search query.
- `slug` (optional): If provided, returns a single blog post matching the slug.

**Returns:**

- If `slug` is provided: a single blog post.
- Otherwise: a list of blog posts (paginated).

### `create_blog_post()`

Creates a new Mint Cashback blog post.

**Parameters:**

- `title` (required): The title of the blog post.
- `body` (required): The content of the blog post. Format is markdown.
- `slug` (required): The slug of the blog post.
- `categoryId` (required): The ID of the blog post category.

**Returns:**

- The created blog post.

### `get_brands()`

Fetches Mint Cashback brands.

**Parameters:**

- `page` (required): The page number to return.
- `search_query` (optional): Filter brands by search query.

**Returns:**

- A list of brands (paginated).

### `get_brand()`

Fetches a single Mint Cashback brand.

**Parameters:**

- `slug` (optional): The slug of the brand to return.
- `id` (optional): The ID of the brand to return.
  - **One of `slug` or `id` is required.**

**Returns:**

- A single brand matching the provided `slug` or `id`.

## 🔌 Installation

1. `git clone https://github.com/alexandros-lekkas/mint-cashback-mcp-server`

. Create a `.env` file based on `.env.example`

5. Run with `npm run dev` and open the inspection server (http://127.0.0.1:6274/)

6. If the connection works, add this to your MCP config (for Cursor or Claude, depending on which agent you are using)

```json
  "mcpServers": {
    "mint-cashback": {
      "command": "node",
      "args": [
        "C:\\path\\to\\mcp-server\\build\\index.js" // Replace this with your local path to build/index.js
      ],
      "env": {
        "SUPABASE_URL": "https://your-supabase-url.com", // Replace this with your Supabase URL
        "SUPABASE_SERVICE_ROLE_KEY": "your-supabase-service-role-key" // Replace this with your Supabase service role key
      }
    }
  }
```

The server must be built first with `npm run build` before trying to access the MCP server.

## 📚 Credits

- Inspiration for the structure of this project came from [Alexandros Lekkas](https://github.com/alexandros-lekkas/reddit-mcp-server)

- Credit goes to [Eugene Sh](https://medium.com/@eugenesh4work/how-to-build-an-mcp-server-fast-a-step-by-step-tutorial-e09faa5f7e3b) for the tutorial on how to build an MCP server (which was used as a reference for this implementation).
