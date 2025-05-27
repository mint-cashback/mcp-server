export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      affiliate_balance_entries: {
        Row: {
          affiliate_id: string
          balance_difference_usd: number
          balance_usd: number
          created_at: string
          id: string
          note: string
          previous_balance_usd: number
          referred_user_balance_difference_usd: number | null
          referred_user_balance_usd: number | null
          referred_user_id: string | null
          referred_user_previous_balance_usd: number | null
          transaction_id: string | null
        }
        Insert: {
          affiliate_id: string
          balance_difference_usd: number
          balance_usd: number
          created_at?: string
          id?: string
          note: string
          previous_balance_usd: number
          referred_user_balance_difference_usd?: number | null
          referred_user_balance_usd?: number | null
          referred_user_id?: string | null
          referred_user_previous_balance_usd?: number | null
          transaction_id?: string | null
        }
        Update: {
          affiliate_id?: string
          balance_difference_usd?: number
          balance_usd?: number
          created_at?: string
          id?: string
          note?: string
          previous_balance_usd?: number
          referred_user_balance_difference_usd?: number | null
          referred_user_balance_usd?: number | null
          referred_user_id?: string | null
          referred_user_previous_balance_usd?: number | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_balance_entries_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_balance_entries_referred_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_balance_entries_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_balance_entries_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_codes: {
        Row: {
          affiliate_id: string | null
          code: string
          created_at: string
          id: string
        }
        Insert: {
          affiliate_id?: string | null
          code: string
          created_at?: string
          id?: string
        }
        Update: {
          affiliate_id?: string | null
          code?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_codes_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliates: {
        Row: {
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_post_categories: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          blog_post_category_id: number | null
          body: Json
          created_at: string
          id: number
          image_url: string
          slug: string
          title: string
        }
        Insert: {
          blog_post_category_id?: number | null
          body: Json
          created_at?: string
          id?: number
          image_url: string
          slug: string
          title: string
        }
        Update: {
          blog_post_category_id?: number | null
          body?: Json
          created_at?: string
          id?: number
          image_url?: string
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_blog_post_category_id_fkey"
            columns: ["blog_post_category_id"]
            isOneToOne: false
            referencedRelation: "blog_post_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_categories: {
        Row: {
          created_at: string
          emoji: string
          id: number
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          emoji?: string
          id?: number
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      brands: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          domain: string
          id: number
          image_url: string | null
          is_enabled: boolean
          metadata: Json | null
          name: string
          network_id: number
          priority: number
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          domain: string
          id?: number
          image_url?: string | null
          is_enabled?: boolean
          metadata?: Json | null
          name: string
          network_id: number
          priority?: number
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          domain?: string
          id?: number
          image_url?: string | null
          is_enabled?: boolean
          metadata?: Json | null
          name?: string
          network_id?: number
          priority?: number
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "advertisers_network_id_fkey"
            columns: ["network_id"]
            isOneToOne: false
            referencedRelation: "networks"
            referencedColumns: ["id"]
          },
        ]
      }
      brands_categories: {
        Row: {
          brand_category_id: number
          brand_id: number
          created_at: string
          id: string
        }
        Insert: {
          brand_category_id: number
          brand_id: number
          created_at?: string
          id?: string
        }
        Update: {
          brand_category_id?: number
          brand_id?: number
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "brands_categories_brand_category_id_fkey"
            columns: ["brand_category_id"]
            isOneToOne: false
            referencedRelation: "brand_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "brands_categories_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      networks: {
        Row: {
          created_at: string
          domain: string
          id: number
          name: string
          transactions_last_updated_at: string
        }
        Insert: {
          created_at?: string
          domain: string
          id?: number
          name: string
          transactions_last_updated_at?: string
        }
        Update: {
          created_at?: string
          domain?: string
          id?: number
          name?: string
          transactions_last_updated_at?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount_usd: number
          brand_id: number
          commission_usd: number
          company_share_usd: number
          created_at: string
          id: string
          metadata: Json | null
          network_id: number
          status: Database["public"]["Enums"]["transaction_status"]
          updated_at: string
          user_id: string
          user_share_usd: number
        }
        Insert: {
          amount_usd: number
          brand_id: number
          commission_usd: number
          company_share_usd: number
          created_at?: string
          id?: string
          metadata?: Json | null
          network_id: number
          status?: Database["public"]["Enums"]["transaction_status"]
          updated_at?: string
          user_id: string
          user_share_usd: number
        }
        Update: {
          amount_usd?: number
          brand_id?: number
          commission_usd?: number
          company_share_usd?: number
          created_at?: string
          id?: string
          metadata?: Json | null
          network_id?: number
          status?: Database["public"]["Enums"]["transaction_status"]
          updated_at?: string
          user_id?: string
          user_share_usd?: number
        }
        Relationships: [
          {
            foreignKeyName: "transactions_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_network_id_fkey"
            columns: ["network_id"]
            isOneToOne: false
            referencedRelation: "networks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_balance_entries: {
        Row: {
          balance_difference_usd: number
          balance_usd: number
          created_at: string
          id: string
          note: string
          previous_balance_usd: number
          transaction_id: string | null
          type: Database["public"]["Enums"]["balance_entry_type"]
          user_id: string
        }
        Insert: {
          balance_difference_usd: number
          balance_usd: number
          created_at?: string
          id?: string
          note: string
          previous_balance_usd: number
          transaction_id?: string | null
          type: Database["public"]["Enums"]["balance_entry_type"]
          user_id: string
        }
        Update: {
          balance_difference_usd?: number
          balance_usd?: number
          created_at?: string
          id?: string
          note?: string
          previous_balance_usd?: number
          transaction_id?: string | null
          type?: Database["public"]["Enums"]["balance_entry_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_balance_entries_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_balance_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_user_id: string | null
          bonus_status: Database["public"]["Enums"]["bonus_status"]
          created_at: string
          id: string
          referred_by_affiliate_id: string | null
          tracking_id: string
        }
        Insert: {
          auth_user_id?: string | null
          bonus_status?: Database["public"]["Enums"]["bonus_status"]
          created_at?: string
          id?: string
          referred_by_affiliate_id?: string | null
          tracking_id: string
        }
        Update: {
          auth_user_id?: string | null
          bonus_status?: Database["public"]["Enums"]["bonus_status"]
          created_at?: string
          id?: string
          referred_by_affiliate_id?: string | null
          tracking_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_referred_by_affiliate_id_fkey"
            columns: ["referred_by_affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args:
          | { p_role_name: string; p_auth_uid: string }
          | { p_user_id: string; p_role_id: number }
        Returns: boolean
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      affiliate_balance_entry_type: "commission" | "transferral"
      balance_entry_type:
        | "cashback"
        | "adjustment"
        | "redemption"
        | "bonus"
        | "affiliate"
      bonus_status: "none" | "locked" | "unlocked" | "expired" | "claimed"
      transaction_status: "pending" | "approved" | "paid" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      affiliate_balance_entry_type: ["commission", "transferral"],
      balance_entry_type: [
        "cashback",
        "adjustment",
        "redemption",
        "bonus",
        "affiliate",
      ],
      bonus_status: ["none", "locked", "unlocked", "expired", "claimed"],
      transaction_status: ["pending", "approved", "paid", "cancelled"],
    },
  },
} as const
