#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

import dotenv from "dotenv";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

import * as tools from "./tools";

dotenv.config();

class MCPServer {
  private server: Server;
  private supabase: SupabaseClient;
  static instance: MCPServer;

  constructor() {
    MCPServer.instance = this;
    console.log("[Setup] Initializing MCP Server...");

    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    this.server = new Server(
      {
        name: "mint-cashback-mcp-server",
        version: "0.1.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();

    this.server.onerror = (error) =>
      console.error("[Error] Server error:", error);
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  static getClient() {
    return MCPServer.instance.supabase;
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "what_is_mint_cashback",
          description:
            "Fetch Mint Cashback about page. Returns the about page as a string explaining what Mint Cashback is.",
          inputSchema: {
            type: "object",
            properties: {
              // No properties needed
            },
          },
        },
        {
          name: "get_blog_post_categories",
          description:
            "Fetch Mint Cashback blog post categories. Returns a list of categories.",
          inputSchema: {
            type: "object",
            properties: {
              // No properties needed
            },
          },
        },
        {
          name: "get_blog_posts",
          description:
            "Fetch Mint Cashback blog posts. Returns a list or a single post if 'slug' is provided.",
          inputSchema: {
            type: "object",
            properties: {
              page: {
                type: "number",
                description: "The page number to return.",
              },
              search_query: {
                type: "string",
                description: "Filter blog posts by search query.",
              },
              slug: {
                type: "string",
                description:
                  "If provided, returns a single blog post matching the slug.",
              },
            },
            required: ["page"],
          },
        },
        {
          name: "create_blog_post",
          description:
            "Create a new Mint Cashback blog post. Returns the created post.",
          inputSchema: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "The title of the blog post.",
              },
              body: {
                type: "string",
                description:
                  'The content of the blog post. Format the post as markdown (use the markdown syntax for bold, italic, etc.). Do NOT include the title in the body, the title should be in the "title" property. Make sure to include newlines in the body to format it correctly.',
              },
              slug: {
                type: "string",
                description: "The slug of the blog post.",
              },
              categoryId: {
                type: "number",
                description: "The ID of the blog post category.",
              },
            },
            required: ["title", "body", "slug", "categoryId"],
          },
        },
        {
          name: "get_brands",
          description:
            "Fetch Mint Cashback brands. Returns a paginated list of brands.",
          inputSchema: {
            type: "object",
            properties: {
              page: {
                type: "number",
                description: "The page number to return.",
              },
              search_query: {
                type: "string",
                description: "Filter brands by search query.",
              },
            },
            required: ["page"],
          },
        },
        {
          name: "get_brand",
          description:
            "Fetch a single Mint Cashback brand by slug or id. One of 'slug' or 'id' is required.",
          inputSchema: {
            type: "object",
            properties: {
              slug: {
                type: "string",
                description: "The slug of the brand to return.",
              },
              id: {
                type: "string",
                description: "The ID of the brand to return.",
              },
            },
            required: [], // One of slug or id is required, but not both. This will be validated in the handler.
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        const toolName = request.params.name;
        const toolParams = request.params.arguments || {};

        console.log(`[Request] Tool call: ${toolName}`, toolParams);

        switch (toolName) {
          case "what_is_mint_cashback":
            return await tools.whatIsMintCashback();
          case "get_blog_post_categories":
            return await tools.getBlogPostCategories();
          case "get_blog_posts":
            return await tools.getBlogPosts(
              toolParams as {
                page: number;
                search_query?: string;
                slug?: string;
              }
            );
          case "create_blog_post":
            try {
              return await tools.createBlogPost(
                toolParams as {
                  title: string;
                  body: any;
                  slug: string;
                  categoryId: number;
                }
              );
            } catch (err) {
              console.error("[Error] Error in create_blog_post:", err);
              return {
                error: `Failed to create blog post: ${
                  err instanceof Error ? err.message : String(err)
                }`,
              };
            }
          case "get_brands":
            return await tools.getBrands(
              toolParams as {
                page: number;
                search_query?: string;
              }
            );
          case "get_brand":
            return await tools.getBrand(toolParams);
          default:
            return { error: `Unknown tool: ${toolName}` };
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("[Error] Error calling tool:", error.message);

          throw new McpError(
            ErrorCode.InternalError,
            `Failed to fetch data: ${error.message}`
          );
        }

        throw error;
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.log("[Server] Server is running");
  }
}

const server = new MCPServer();
server.run().catch(console.error);

export function getClient() {
  return MCPServer.getClient();
}
