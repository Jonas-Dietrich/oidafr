export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      rss_category: {
        Row: {
          category_id: number
          category_name: string | null
          domain: string | null
        }
        Insert: {
          category_id: number
          category_name?: string | null
          domain?: string | null
        }
        Update: {
          category_id?: number
          category_name?: string | null
          domain?: string | null
        }
        Relationships: []
      }
      rss_channel: {
        Row: {
          category_category_id: number | null
          copyright: string | null
          description: string | null
          docs: string | null
          feed_url: string
          generator: string | null
          language: string | null
          last_build_date: string | null
          link: string | null
          managing_editor: string | null
          rating: string | null
          rss_image_image_id: number | null
          title: string | null
          web_master: string | null
        }
        Insert: {
          category_category_id?: number | null
          copyright?: string | null
          description?: string | null
          docs?: string | null
          feed_url: string
          generator?: string | null
          language?: string | null
          last_build_date?: string | null
          link?: string | null
          managing_editor?: string | null
          rating?: string | null
          rss_image_image_id?: number | null
          title?: string | null
          web_master?: string | null
        }
        Update: {
          category_category_id?: number | null
          copyright?: string | null
          description?: string | null
          docs?: string | null
          feed_url?: string
          generator?: string | null
          language?: string | null
          last_build_date?: string | null
          link?: string | null
          managing_editor?: string | null
          rating?: string | null
          rss_image_image_id?: number | null
          title?: string | null
          web_master?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fkhrqg4g1lwbotjoymh1f5v51cv"
            columns: ["category_category_id"]
            isOneToOne: false
            referencedRelation: "rss_category"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "fkyfbuaovpr3aeciqk4lxl7ww5"
            columns: ["rss_image_image_id"]
            isOneToOne: true
            referencedRelation: "rss_image"
            referencedColumns: ["image_id"]
          },
        ]
      }
      rss_enclosureurl: {
        Row: {
          length: string | null
          type: string | null
          url: string | null
          url_id: number
        }
        Insert: {
          length?: string | null
          type?: string | null
          url?: string | null
          url_id: number
        }
        Update: {
          length?: string | null
          type?: string | null
          url?: string | null
          url_id?: number
        }
        Relationships: []
      }
      rss_image: {
        Row: {
          description: string | null
          height: number | null
          image_id: number
          link: string | null
          title: string | null
          url: string | null
          width: number | null
        }
        Insert: {
          description?: string | null
          height?: number | null
          image_id: number
          link?: string | null
          title?: string | null
          url?: string | null
          width?: number | null
        }
        Update: {
          description?: string | null
          height?: number | null
          image_id?: number
          link?: string | null
          title?: string | null
          url?: string | null
          width?: number | null
        }
        Relationships: []
      }
      rss_item: {
        Row: {
          author: string | null
          category_category_id: number | null
          comments: string | null
          description: string | null
          enclosureurl_url_id: number | null
          guid: string | null
          item_id: number
          link: string | null
          pub_date: string | null
          rss_channel_feed_url: string | null
          source_source_id: number | null
          title: string | null
        }
        Insert: {
          author?: string | null
          category_category_id?: number | null
          comments?: string | null
          description?: string | null
          enclosureurl_url_id?: number | null
          guid?: string | null
          item_id: number
          link?: string | null
          pub_date?: string | null
          rss_channel_feed_url?: string | null
          source_source_id?: number | null
          title?: string | null
        }
        Update: {
          author?: string | null
          category_category_id?: number | null
          comments?: string | null
          description?: string | null
          enclosureurl_url_id?: number | null
          guid?: string | null
          item_id?: number
          link?: string | null
          pub_date?: string | null
          rss_channel_feed_url?: string | null
          source_source_id?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk6jvu1j2gotwwpdk4qmemwphxg"
            columns: ["enclosureurl_url_id"]
            isOneToOne: true
            referencedRelation: "rss_enclosureurl"
            referencedColumns: ["url_id"]
          },
          {
            foreignKeyName: "fkj430ues5q5ihpijgc584jt40o"
            columns: ["source_source_id"]
            isOneToOne: false
            referencedRelation: "rss_source"
            referencedColumns: ["source_id"]
          },
          {
            foreignKeyName: "fkkewrworg5g1mho5e6j543t1mn"
            columns: ["rss_channel_feed_url"]
            isOneToOne: false
            referencedRelation: "rss_channel"
            referencedColumns: ["feed_url"]
          },
          {
            foreignKeyName: "fkn6vdw4daddkckbivrqmfonb3x"
            columns: ["category_category_id"]
            isOneToOne: false
            referencedRelation: "rss_category"
            referencedColumns: ["category_id"]
          },
        ]
      }
      rss_source: {
        Row: {
          source_id: number
          source_name: string | null
          url: string | null
        }
        Insert: {
          source_id: number
          source_name?: string | null
          url?: string | null
        }
        Update: {
          source_id?: number
          source_name?: string | null
          url?: string | null
        }
        Relationships: []
      }
      todo: {
        Row: {
          description: string | null
          due_date: string | null
          id: number
          title: string | null
        }
        Insert: {
          description?: string | null
          due_date?: string | null
          id?: never
          title?: string | null
        }
        Update: {
          description?: string | null
          due_date?: string | null
          id?: never
          title?: string | null
        }
        Relationships: []
      }
      user_feeds: {
        Row: {
          created_at: string
          feedUrl: string
          invalid_since: string | null
          is_favorite: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          feedUrl: string
          invalid_since?: string | null
          is_favorite?: boolean
          user_id?: string
        }
        Update: {
          created_at?: string
          feedUrl?: string
          invalid_since?: string | null
          is_favorite?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_feeds_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      change_user_password: {
        Args: {
          current_plain_password: string
          new_plain_password: string
        }
        Returns: Json
      }
      count_users: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
