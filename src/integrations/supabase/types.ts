export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      active_games: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          last_sub_check_time: number | null
          pitch_state: Json
          team_id: string | null
          timer_state: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          last_sub_check_time?: number | null
          pitch_state?: Json
          team_id?: string | null
          timer_state?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          last_sub_check_time?: number | null
          pitch_state?: Json
          team_id?: string | null
          timer_state?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "active_games_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "active_games_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      app_ad_analytics: {
        Row: {
          ad_id: string
          context: string
          created_at: string
          event_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          ad_id: string
          context: string
          created_at?: string
          event_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          ad_id?: string
          context?: string
          created_at?: string
          event_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_ad_analytics_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "app_ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_ad_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      app_ad_settings: {
        Row: {
          created_at: string
          id: string
          is_enabled: boolean
          location: string
          override_sponsors: boolean
          show_only_when_no_sponsors: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_enabled?: boolean
          location: string
          override_sponsors?: boolean
          show_only_when_no_sponsors?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_enabled?: boolean
          location?: string
          override_sponsors?: boolean
          show_only_when_no_sponsors?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      app_ads: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          image_url: string
          is_active: boolean
          link_url: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url: string
          is_active?: boolean
          link_url?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string
          is_active?: boolean
          link_url?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      app_stripe_config: {
        Row: {
          created_at: string | null
          id: string
          is_enabled: boolean | null
          stripe_publishable_key: string
          stripe_secret_key: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          stripe_publishable_key: string
          stripe_secret_key: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          stripe_publishable_key?: string
          stripe_secret_key?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action_type: string
          actor_id: string | null
          created_at: string
          details: Json | null
          id: string
          target_user_id: string | null
          target_user_name: string | null
        }
        Insert: {
          action_type: string
          actor_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          target_user_id?: string | null
          target_user_name?: string | null
        }
        Update: {
          action_type?: string
          actor_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          target_user_id?: string | null
          target_user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      broadcast_messages: {
        Row: {
          author_id: string
          created_at: string
          id: string
          image_url: string | null
          reply_to_id: string | null
          text: string
        }
        Insert: {
          author_id: string
          created_at?: string
          id?: string
          image_url?: string | null
          reply_to_id?: string | null
          text: string
        }
        Update: {
          author_id?: string
          created_at?: string
          id?: string
          image_url?: string | null
          reply_to_id?: string | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "broadcast_messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broadcast_messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "broadcast_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_groups: {
        Row: {
          allowed_roles: Database["public"]["Enums"]["app_role"][]
          club_id: string | null
          created_at: string
          created_by: string
          id: string
          name: string
          team_id: string | null
          updated_at: string
        }
        Insert: {
          allowed_roles: Database["public"]["Enums"]["app_role"][]
          club_id?: string | null
          created_at?: string
          created_by: string
          id?: string
          name: string
          team_id?: string | null
          updated_at?: string
        }
        Update: {
          allowed_roles?: Database["public"]["Enums"]["app_role"][]
          club_id?: string | null
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          team_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_groups_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_groups_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_groups_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_mute_preferences: {
        Row: {
          chat_id: string
          chat_type: string
          id: string
          muted_at: string
          user_id: string
        }
        Insert: {
          chat_id: string
          chat_type: string
          id?: string
          muted_at?: string
          user_id: string
        }
        Update: {
          chat_id?: string
          chat_type?: string
          id?: string
          muted_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_mute_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      child_team_assignments: {
        Row: {
          child_id: string
          created_at: string
          id: string
          team_id: string
        }
        Insert: {
          child_id: string
          created_at?: string
          id?: string
          team_id: string
        }
        Update: {
          child_id?: string
          created_at?: string
          id?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "child_team_assignments_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "child_team_assignments_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      children: {
        Row: {
          created_at: string
          id: string
          ignite_points: number
          name: string
          parent_id: string
          year_of_birth: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          ignite_points?: number
          name: string
          parent_id: string
          year_of_birth?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          ignite_points?: number
          name?: string
          parent_id?: string
          year_of_birth?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "children_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      club_invites: {
        Row: {
          club_id: string
          created_at: string
          created_by: string
          expires_at: string | null
          id: string
          max_uses: number | null
          role: Database["public"]["Enums"]["app_role"]
          token: string
          uses_count: number
        }
        Insert: {
          club_id: string
          created_at?: string
          created_by: string
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          role: Database["public"]["Enums"]["app_role"]
          token: string
          uses_count?: number
        }
        Update: {
          club_id?: string
          created_at?: string
          created_by?: string
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          role?: Database["public"]["Enums"]["app_role"]
          token?: string
          uses_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "club_invites_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_invites_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      club_messages: {
        Row: {
          author_id: string
          club_id: string
          created_at: string
          id: string
          image_url: string | null
          reply_to_id: string | null
          text: string
        }
        Insert: {
          author_id: string
          club_id: string
          created_at?: string
          id?: string
          image_url?: string | null
          reply_to_id?: string | null
          text: string
        }
        Update: {
          author_id?: string
          club_id?: string
          created_at?: string
          id?: string
          image_url?: string | null
          reply_to_id?: string | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_messages_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "club_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      club_rewards: {
        Row: {
          club_id: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          is_default: boolean
          logo_url: string | null
          name: string
          points_required: number
          qr_code_url: string | null
          reward_type: string
          show_qr_code: boolean
          sponsor_id: string | null
          updated_at: string
        }
        Insert: {
          club_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_default?: boolean
          logo_url?: string | null
          name: string
          points_required?: number
          qr_code_url?: string | null
          reward_type?: string
          show_qr_code?: boolean
          sponsor_id?: string | null
          updated_at?: string
        }
        Update: {
          club_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_default?: boolean
          logo_url?: string | null
          name?: string
          points_required?: number
          qr_code_url?: string | null
          reward_type?: string
          show_qr_code?: boolean
          sponsor_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_rewards_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_rewards_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
        ]
      }
      club_stripe_configs: {
        Row: {
          club_id: string
          created_at: string | null
          id: string
          is_enabled: boolean | null
          stripe_publishable_key: string
          stripe_secret_key: string
          updated_at: string | null
        }
        Insert: {
          club_id: string
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          stripe_publishable_key: string
          stripe_secret_key: string
          updated_at?: string | null
        }
        Update: {
          club_id?: string
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          stripe_publishable_key?: string
          stripe_secret_key?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "club_stripe_configs_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      club_subscriptions: {
        Row: {
          activated_at: string | null
          admin_pro_football_override: boolean
          admin_pro_override: boolean
          club_id: string
          created_at: string
          expires_at: string | null
          id: string
          is_pro: boolean
          is_pro_football: boolean
          is_trial: boolean
          member_payments_enabled: boolean
          member_subscription_amount: number | null
          plan: Database["public"]["Enums"]["club_subscription_plan"]
          promo_code_id: string | null
          scheduled_storage_downgrade_gb: number | null
          storage_downgrade_at: string | null
          storage_purchased_gb: number
          stripe_subscription_id: string | null
          team_limit: number | null
          trial_ends_at: string | null
          trial_is_annual: boolean | null
          trial_plan: string | null
          trial_tier: string | null
          updated_at: string
        }
        Insert: {
          activated_at?: string | null
          admin_pro_football_override?: boolean
          admin_pro_override?: boolean
          club_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_pro?: boolean
          is_pro_football?: boolean
          is_trial?: boolean
          member_payments_enabled?: boolean
          member_subscription_amount?: number | null
          plan?: Database["public"]["Enums"]["club_subscription_plan"]
          promo_code_id?: string | null
          scheduled_storage_downgrade_gb?: number | null
          storage_downgrade_at?: string | null
          storage_purchased_gb?: number
          stripe_subscription_id?: string | null
          team_limit?: number | null
          trial_ends_at?: string | null
          trial_is_annual?: boolean | null
          trial_plan?: string | null
          trial_tier?: string | null
          updated_at?: string
        }
        Update: {
          activated_at?: string | null
          admin_pro_football_override?: boolean
          admin_pro_override?: boolean
          club_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_pro?: boolean
          is_pro_football?: boolean
          is_trial?: boolean
          member_payments_enabled?: boolean
          member_subscription_amount?: number | null
          plan?: Database["public"]["Enums"]["club_subscription_plan"]
          promo_code_id?: string | null
          scheduled_storage_downgrade_gb?: number | null
          storage_downgrade_at?: string | null
          storage_purchased_gb?: number
          stripe_subscription_id?: string | null
          team_limit?: number | null
          trial_ends_at?: string | null
          trial_is_annual?: boolean | null
          trial_plan?: string | null
          trial_tier?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_subscriptions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_subscriptions_promo_code_id_fkey"
            columns: ["promo_code_id"]
            isOneToOne: false
            referencedRelation: "promo_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      clubs: {
        Row: {
          auto_reward_threshold: number | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_pro: boolean
          logo_only_mode: boolean | null
          logo_url: string | null
          name: string
          primary_sponsor_id: string | null
          show_logo_in_header: boolean
          show_name_in_header: boolean | null
          sport: string | null
          storage_used_bytes: number
          theme_accent_h: number | null
          theme_accent_l: number | null
          theme_accent_s: number | null
          theme_dark_accent_h: number | null
          theme_dark_accent_l: number | null
          theme_dark_accent_s: number | null
          theme_dark_primary_h: number | null
          theme_dark_primary_l: number | null
          theme_dark_primary_s: number | null
          theme_dark_secondary_h: number | null
          theme_dark_secondary_l: number | null
          theme_dark_secondary_s: number | null
          theme_primary_h: number | null
          theme_primary_l: number | null
          theme_primary_s: number | null
          theme_secondary_h: number | null
          theme_secondary_l: number | null
          theme_secondary_s: number | null
          updated_at: string
        }
        Insert: {
          auto_reward_threshold?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_pro?: boolean
          logo_only_mode?: boolean | null
          logo_url?: string | null
          name: string
          primary_sponsor_id?: string | null
          show_logo_in_header?: boolean
          show_name_in_header?: boolean | null
          sport?: string | null
          storage_used_bytes?: number
          theme_accent_h?: number | null
          theme_accent_l?: number | null
          theme_accent_s?: number | null
          theme_dark_accent_h?: number | null
          theme_dark_accent_l?: number | null
          theme_dark_accent_s?: number | null
          theme_dark_primary_h?: number | null
          theme_dark_primary_l?: number | null
          theme_dark_primary_s?: number | null
          theme_dark_secondary_h?: number | null
          theme_dark_secondary_l?: number | null
          theme_dark_secondary_s?: number | null
          theme_primary_h?: number | null
          theme_primary_l?: number | null
          theme_primary_s?: number | null
          theme_secondary_h?: number | null
          theme_secondary_l?: number | null
          theme_secondary_s?: number | null
          updated_at?: string
        }
        Update: {
          auto_reward_threshold?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_pro?: boolean
          logo_only_mode?: boolean | null
          logo_url?: string | null
          name?: string
          primary_sponsor_id?: string | null
          show_logo_in_header?: boolean
          show_name_in_header?: boolean | null
          sport?: string | null
          storage_used_bytes?: number
          theme_accent_h?: number | null
          theme_accent_l?: number | null
          theme_accent_s?: number | null
          theme_dark_accent_h?: number | null
          theme_dark_accent_l?: number | null
          theme_dark_accent_s?: number | null
          theme_dark_primary_h?: number | null
          theme_dark_primary_l?: number | null
          theme_dark_primary_s?: number | null
          theme_dark_secondary_h?: number | null
          theme_dark_secondary_l?: number | null
          theme_dark_secondary_s?: number | null
          theme_primary_h?: number | null
          theme_primary_l?: number | null
          theme_primary_s?: number | null
          theme_secondary_h?: number | null
          theme_secondary_l?: number | null
          theme_secondary_s?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clubs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clubs_primary_sponsor_id_fkey"
            columns: ["primary_sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
        ]
      }
      duties: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          event_id: string
          id: string
          name: string
          points_awarded: boolean
          status: Database["public"]["Enums"]["duty_status"]
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          event_id: string
          id?: string
          name: string
          points_awarded?: boolean
          status?: Database["public"]["Enums"]["duty_status"]
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          event_id?: string
          id?: string
          name?: string
          points_awarded?: boolean
          status?: Database["public"]["Enums"]["duty_status"]
        }
        Relationships: [
          {
            foreignKeyName: "duties_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "duties_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_payments: {
        Row: {
          created_at: string
          event_id: string
          id: string
          marked_by: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          marked_by: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          marked_by?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_payments_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_payments_marked_by_fkey"
            columns: ["marked_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_sponsors: {
        Row: {
          created_at: string
          display_order: number
          event_id: string
          id: string
          sponsor_id: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          event_id: string
          id?: string
          sponsor_id: string
        }
        Update: {
          created_at?: string
          display_order?: number
          event_id?: string
          id?: string
          sponsor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_sponsors_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_sponsors_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          address: string | null
          club_id: string
          created_at: string
          created_by: string | null
          description: string | null
          event_date: string
          id: string
          is_cancelled: boolean
          is_recurring: boolean
          opponent: string | null
          parent_event_id: string | null
          postcode: string | null
          price: number | null
          recurrence_days: number[] | null
          recurrence_end_date: string | null
          recurrence_interval: number | null
          recurrence_pattern: string | null
          reminder_hours_before: number | null
          reminder_sent: boolean
          state: string | null
          suburb: string | null
          team_id: string | null
          title: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at: string
        }
        Insert: {
          address?: string | null
          club_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date: string
          id?: string
          is_cancelled?: boolean
          is_recurring?: boolean
          opponent?: string | null
          parent_event_id?: string | null
          postcode?: string | null
          price?: number | null
          recurrence_days?: number[] | null
          recurrence_end_date?: string | null
          recurrence_interval?: number | null
          recurrence_pattern?: string | null
          reminder_hours_before?: number | null
          reminder_sent?: boolean
          state?: string | null
          suburb?: string | null
          team_id?: string | null
          title: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at?: string
        }
        Update: {
          address?: string | null
          club_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date?: string
          id?: string
          is_cancelled?: boolean
          is_recurring?: boolean
          opponent?: string | null
          parent_event_id?: string | null
          postcode?: string | null
          price?: number | null
          recurrence_days?: number[] | null
          recurrence_end_date?: string | null
          recurrence_interval?: number | null
          recurrence_pattern?: string | null
          reminder_hours_before?: number | null
          reminder_sent?: boolean
          state?: string | null
          suburb?: string | null
          team_id?: string | null
          title?: string
          type?: Database["public"]["Enums"]["event_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_parent_event_id_fkey"
            columns: ["parent_event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_event_titles: {
        Row: {
          created_at: string
          event_type: string
          id: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_event_titles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_opponents: {
        Row: {
          club_id: string | null
          created_at: string
          id: string
          opponent_name: string
          team_id: string | null
          user_id: string
        }
        Insert: {
          club_id?: string | null
          created_at?: string
          id?: string
          opponent_name: string
          team_id?: string | null
          user_id: string
        }
        Update: {
          club_id?: string | null
          created_at?: string
          id?: string
          opponent_name?: string
          team_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_opponents_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_opponents_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_opponents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          created_at: string
          description: string | null
          id: string
          status: Database["public"]["Enums"]["feedback_status"]
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          status?: Database["public"]["Enums"]["feedback_status"]
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          status?: Database["public"]["Enums"]["feedback_status"]
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      game_player_stats: {
        Row: {
          created_at: string
          event_id: string
          fill_in_player_name: string | null
          goals_scored: number
          id: string
          jersey_number: number | null
          minutes_played: number
          position_minutes: Json | null
          positions_played: string[]
          started_on_pitch: boolean
          substitutions_count: number
          team_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_id: string
          fill_in_player_name?: string | null
          goals_scored?: number
          id?: string
          jersey_number?: number | null
          minutes_played?: number
          position_minutes?: Json | null
          positions_played?: string[]
          started_on_pitch?: boolean
          substitutions_count?: number
          team_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string
          fill_in_player_name?: string | null
          goals_scored?: number
          id?: string
          jersey_number?: number | null
          minutes_played?: number
          position_minutes?: Json | null
          positions_played?: string[]
          started_on_pitch?: boolean
          substitutions_count?: number
          team_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_player_stats_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_player_stats_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_player_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      game_summaries: {
        Row: {
          created_at: string
          event_id: string
          formation_used: string | null
          half_duration: number
          id: string
          team_id: string
          team_size: number
          total_game_time: number
          total_substitutions: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          event_id: string
          formation_used?: string | null
          half_duration?: number
          id?: string
          team_id: string
          team_size?: number
          total_game_time?: number
          total_substitutions?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          event_id?: string
          formation_used?: string | null
          half_duration?: number
          id?: string
          team_id?: string
          team_size?: number
          total_game_time?: number
          total_substitutions?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_summaries_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: true
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_summaries_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      group_messages: {
        Row: {
          author_id: string
          created_at: string
          group_id: string
          id: string
          image_url: string | null
          reply_to_id: string | null
          text: string
        }
        Insert: {
          author_id: string
          created_at?: string
          group_id: string
          id?: string
          image_url?: string | null
          reply_to_id?: string | null
          text: string
        }
        Update: {
          author_id?: string
          created_at?: string
          group_id?: string
          id?: string
          image_url?: string | null
          reply_to_id?: string | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_messages_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "chat_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "group_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      member_subscription_payments: {
        Row: {
          amount: number | null
          club_id: string
          created_at: string
          id: string
          marked_by: string
          notes: string | null
          paid_at: string
          payment_period: string
          user_id: string
        }
        Insert: {
          amount?: number | null
          club_id: string
          created_at?: string
          id?: string
          marked_by: string
          notes?: string | null
          paid_at?: string
          payment_period: string
          user_id: string
        }
        Update: {
          amount?: number | null
          club_id?: string
          created_at?: string
          id?: string
          marked_by?: string
          notes?: string | null
          paid_at?: string
          payment_period?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_subscription_payments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_subscription_payments_marked_by_fkey"
            columns: ["marked_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_subscription_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_reactions: {
        Row: {
          broadcast_message_id: string | null
          club_message_id: string | null
          created_at: string
          group_message_id: string | null
          id: string
          reaction_type: string
          team_message_id: string | null
          user_id: string
        }
        Insert: {
          broadcast_message_id?: string | null
          club_message_id?: string | null
          created_at?: string
          group_message_id?: string | null
          id?: string
          reaction_type?: string
          team_message_id?: string | null
          user_id: string
        }
        Update: {
          broadcast_message_id?: string | null
          club_message_id?: string | null
          created_at?: string
          group_message_id?: string | null
          id?: string
          reaction_type?: string
          team_message_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reactions_broadcast_message_id_fkey"
            columns: ["broadcast_message_id"]
            isOneToOne: false
            referencedRelation: "broadcast_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reactions_club_message_id_fkey"
            columns: ["club_message_id"]
            isOneToOne: false
            referencedRelation: "club_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reactions_group_message_id_fkey"
            columns: ["group_message_id"]
            isOneToOne: false
            referencedRelation: "group_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reactions_team_message_id_fkey"
            columns: ["team_message_id"]
            isOneToOne: false
            referencedRelation: "team_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_reads: {
        Row: {
          broadcast_message_id: string | null
          club_message_id: string | null
          group_message_id: string | null
          id: string
          read_at: string
          team_message_id: string | null
          user_id: string
        }
        Insert: {
          broadcast_message_id?: string | null
          club_message_id?: string | null
          group_message_id?: string | null
          id?: string
          read_at?: string
          team_message_id?: string | null
          user_id: string
        }
        Update: {
          broadcast_message_id?: string | null
          club_message_id?: string | null
          group_message_id?: string | null
          id?: string
          read_at?: string
          team_message_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reads_broadcast_message_id_fkey"
            columns: ["broadcast_message_id"]
            isOneToOne: false
            referencedRelation: "broadcast_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reads_club_message_id_fkey"
            columns: ["club_message_id"]
            isOneToOne: false
            referencedRelation: "club_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reads_group_message_id_fkey"
            columns: ["group_message_id"]
            isOneToOne: false
            referencedRelation: "group_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reads_team_message_id_fkey"
            columns: ["team_message_id"]
            isOneToOne: false
            referencedRelation: "team_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          created_at: string
          events_enabled: boolean
          id: string
          media_enabled: boolean
          membership_enabled: boolean
          messages_enabled: boolean
          pitch_board_enabled: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          events_enabled?: boolean
          id?: string
          media_enabled?: boolean
          membership_enabled?: boolean
          messages_enabled?: boolean
          pitch_board_enabled?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          events_enabled?: boolean
          id?: string
          media_enabled?: boolean
          membership_enabled?: boolean
          messages_enabled?: boolean
          pitch_board_enabled?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          related_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          related_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          related_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      passkey_challenges: {
        Row: {
          challenge: string
          created_at: string
          expires_at: string
          id: string
          type: string
          user_id: string | null
        }
        Insert: {
          challenge: string
          created_at?: string
          expires_at?: string
          id?: string
          type: string
          user_id?: string | null
        }
        Update: {
          challenge?: string
          created_at?: string
          expires_at?: string
          id?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "passkey_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_invites: {
        Row: {
          accepted_at: string | null
          club_id: string | null
          created_at: string
          created_by: string
          id: string
          invite_token: string
          invited_label: string | null
          invited_user_id: string | null
          role: string
          status: string
          team_id: string | null
        }
        Insert: {
          accepted_at?: string | null
          club_id?: string | null
          created_at?: string
          created_by: string
          id?: string
          invite_token: string
          invited_label?: string | null
          invited_user_id?: string | null
          role: string
          status?: string
          team_id?: string | null
        }
        Update: {
          accepted_at?: string | null
          club_id?: string | null
          created_at?: string
          created_by?: string
          id?: string
          invite_token?: string
          invited_label?: string | null
          invited_user_id?: string | null
          role?: string
          status?: string
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pending_invites_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_invites_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_invites_invited_user_id_fkey"
            columns: ["invited_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_invites_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      photo_comment_reactions: {
        Row: {
          comment_id: string
          created_at: string
          id: string
          reaction_type: string
          user_id: string
        }
        Insert: {
          comment_id: string
          created_at?: string
          id?: string
          reaction_type?: string
          user_id: string
        }
        Update: {
          comment_id?: string
          created_at?: string
          id?: string
          reaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "photo_comment_reactions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "photo_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photo_comment_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      photo_comments: {
        Row: {
          created_at: string
          id: string
          photo_id: string
          reply_to_id: string | null
          text: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          photo_id: string
          reply_to_id?: string | null
          text: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          photo_id?: string
          reply_to_id?: string | null
          text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "photo_comments_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photo_comments_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "photo_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photo_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      photo_reactions: {
        Row: {
          created_at: string
          id: string
          photo_id: string
          reaction_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          photo_id: string
          reaction_type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          photo_id?: string
          reaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "photo_reactions_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photo_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      photos: {
        Row: {
          club_id: string | null
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          file_size: number | null
          file_url: string
          folder_id: string | null
          id: string
          show_in_feed: boolean
          team_id: string | null
          title: string | null
          uploader_id: string
        }
        Insert: {
          club_id?: string | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          file_size?: number | null
          file_url: string
          folder_id?: string | null
          id?: string
          show_in_feed?: boolean
          team_id?: string | null
          title?: string | null
          uploader_id: string
        }
        Update: {
          club_id?: string | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          file_size?: number | null
          file_url?: string
          folder_id?: string | null
          id?: string
          show_in_feed?: boolean
          team_id?: string | null
          title?: string | null
          uploader_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "photos_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photos_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photos_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "vault_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photos_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photos_uploader_id_fkey"
            columns: ["uploader_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pitch_formations: {
        Row: {
          created_at: string
          created_by: string
          drawing_data: string | null
          formation_data: Json
          id: string
          name: string
          team_id: string
          team_size: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          drawing_data?: string | null
          formation_data: Json
          id?: string
          name: string
          team_id: string
          team_size: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          drawing_data?: string | null
          formation_data?: Json
          id?: string
          name?: string
          team_id?: string
          team_size?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pitch_formations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitch_formations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      player_of_match: {
        Row: {
          awarded_by: string
          child_id: string | null
          created_at: string
          event_id: string
          id: string
          points_awarded: number
          user_id: string | null
        }
        Insert: {
          awarded_by: string
          child_id?: string | null
          created_at?: string
          event_id: string
          id?: string
          points_awarded?: number
          user_id?: string | null
        }
        Update: {
          awarded_by?: string
          child_id?: string | null
          created_at?: string
          event_id?: string
          id?: string
          points_awarded?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_of_match_awarded_by_fkey"
            columns: ["awarded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_of_match_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_of_match_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: true
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_of_match_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          has_sausage_reward: boolean
          id: string
          ignite_points: number
          photo_consent_given_at: string | null
          profile_visibility: string
          scheduled_deletion_at: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          has_sausage_reward?: boolean
          id: string
          ignite_points?: number
          photo_consent_given_at?: string | null
          profile_visibility?: string
          scheduled_deletion_at?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          has_sausage_reward?: boolean
          id?: string
          ignite_points?: number
          photo_consent_given_at?: string | null
          profile_visibility?: string
          scheduled_deletion_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          access_level: string
          club_id: string | null
          code: string
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean
          scope_type: string
          storage_gb: number | null
          team_id: string | null
          uses_count: number
        }
        Insert: {
          access_level?: string
          club_id?: string | null
          code: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          scope_type?: string
          storage_gb?: number | null
          team_id?: string | null
          uses_count?: number
        }
        Update: {
          access_level?: string
          club_id?: string | null
          code?: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          scope_type?: string
          storage_gb?: number | null
          team_id?: string | null
          uses_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "promo_codes_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promo_codes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promo_codes_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      push_notification_logs: {
        Row: {
          created_at: string
          endpoint: string
          error_message: string | null
          id: string
          notification_id: string | null
          status: string
          status_code: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          endpoint: string
          error_message?: string | null
          id?: string
          notification_id?: string | null
          status: string
          status_code?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          endpoint?: string
          error_message?: string | null
          id?: string
          notification_id?: string | null
          status?: string
          status_code?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_notification_logs_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "push_notification_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string
          endpoint: string
          id: string
          p256dh: string
          updated_at: string
          user_id: string
        }
        Insert: {
          auth: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh: string
          updated_at?: string
          user_id: string
        }
        Update: {
          auth?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_redemptions: {
        Row: {
          child_id: string | null
          club_id: string
          fulfilled_at: string | null
          fulfilled_by: string | null
          id: string
          notes: string | null
          points_spent: number
          redeemed_at: string
          reward_id: string
          status: string
          user_id: string
        }
        Insert: {
          child_id?: string | null
          club_id: string
          fulfilled_at?: string | null
          fulfilled_by?: string | null
          id?: string
          notes?: string | null
          points_spent: number
          redeemed_at?: string
          reward_id: string
          status?: string
          user_id: string
        }
        Update: {
          child_id?: string | null
          club_id?: string
          fulfilled_at?: string | null
          fulfilled_by?: string | null
          id?: string
          notes?: string | null
          points_spent?: number
          redeemed_at?: string
          reward_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reward_redemptions_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_redemptions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_redemptions_fulfilled_by_fkey"
            columns: ["fulfilled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "club_rewards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_redemptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      role_requests: {
        Row: {
          club_id: string | null
          created_at: string
          id: string
          processed_by: string | null
          role: Database["public"]["Enums"]["app_role"]
          status: Database["public"]["Enums"]["role_request_status"]
          team_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          club_id?: string | null
          created_at?: string
          id?: string
          processed_by?: string | null
          role: Database["public"]["Enums"]["app_role"]
          status?: Database["public"]["Enums"]["role_request_status"]
          team_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          club_id?: string | null
          created_at?: string
          id?: string
          processed_by?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          status?: Database["public"]["Enums"]["role_request_status"]
          team_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_requests_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_requests_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_requests_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rsvps: {
        Row: {
          child_id: string | null
          created_at: string
          event_id: string
          guest_count: number | null
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["rsvp_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          child_id?: string | null
          created_at?: string
          event_id: string
          guest_count?: number | null
          id?: string
          notes?: string | null
          status: Database["public"]["Enums"]["rsvp_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          child_id?: string | null
          created_at?: string
          event_id?: string
          guest_count?: number | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["rsvp_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rsvps_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rsvps_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rsvps_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_locations: {
        Row: {
          address: string
          created_at: string
          id: string
          name: string | null
          postcode: string | null
          state: string | null
          suburb: string | null
          user_id: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          name?: string | null
          postcode?: string | null
          state?: string | null
          suburb?: string | null
          user_id: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          name?: string | null
          postcode?: string | null
          state?: string | null
          suburb?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_locations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsor_analytics: {
        Row: {
          context: string
          created_at: string
          event_type: string
          id: string
          sponsor_id: string
          user_id: string | null
        }
        Insert: {
          context: string
          created_at?: string
          event_type: string
          id?: string
          sponsor_id: string
          user_id?: string | null
        }
        Update: {
          context?: string
          created_at?: string
          event_type?: string
          id?: string
          sponsor_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsor_analytics_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsors: {
        Row: {
          club_id: string
          created_at: string
          description: string | null
          display_order: number
          id: string
          is_active: boolean
          is_team_only: boolean
          logo_url: string | null
          name: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          club_id: string
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          is_team_only?: boolean
          logo_url?: string | null
          name: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          club_id?: string
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          is_team_only?: boolean
          logo_url?: string | null
          name?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsors_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      team_folders: {
        Row: {
          club_id: string
          color: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          club_id: string
          color?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          club_id?: string
          color?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_folders_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_folders_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      team_invites: {
        Row: {
          created_at: string
          created_by: string
          expires_at: string | null
          id: string
          max_uses: number | null
          role: Database["public"]["Enums"]["app_role"]
          team_id: string
          token: string
          uses_count: number
        }
        Insert: {
          created_at?: string
          created_by: string
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          role: Database["public"]["Enums"]["app_role"]
          team_id: string
          token: string
          uses_count?: number
        }
        Update: {
          created_at?: string
          created_by?: string
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          role?: Database["public"]["Enums"]["app_role"]
          team_id?: string
          token?: string
          uses_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "team_invites_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_invites_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_messages: {
        Row: {
          author_id: string
          created_at: string
          id: string
          image_url: string | null
          reply_to_id: string | null
          team_id: string
          text: string
        }
        Insert: {
          author_id: string
          created_at?: string
          id?: string
          image_url?: string | null
          reply_to_id?: string | null
          team_id: string
          text: string
        }
        Update: {
          author_id?: string
          created_at?: string
          id?: string
          image_url?: string | null
          reply_to_id?: string | null
          team_id?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "team_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_messages_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_player_positions: {
        Row: {
          created_at: string
          id: string
          jersey_number: number | null
          preferred_positions: string[]
          team_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          jersey_number?: number | null
          preferred_positions?: string[]
          team_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          jersey_number?: number | null
          preferred_positions?: string[]
          team_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_player_positions_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_player_positions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      team_sponsor_allocations: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          sponsor_id: string
          team_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          sponsor_id: string
          team_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          sponsor_id?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_sponsor_allocations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_sponsor_allocations_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_sponsor_allocations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_subscriptions: {
        Row: {
          activated_at: string | null
          admin_pro_football_override: boolean
          admin_pro_override: boolean
          created_at: string
          disable_auto_subs: boolean
          disable_batch_subs: boolean
          disable_position_swaps: boolean
          expires_at: string | null
          formation: string | null
          id: string
          is_pro: boolean
          is_pro_football: boolean
          is_trial: boolean
          minutes_per_half: number
          promo_code_id: string | null
          rotation_speed: number
          show_match_header: boolean
          stripe_subscription_id: string | null
          team_id: string
          team_size: number
          trial_ends_at: string | null
          trial_is_annual: boolean | null
          trial_plan: string | null
          trial_tier: string | null
          updated_at: string
        }
        Insert: {
          activated_at?: string | null
          admin_pro_football_override?: boolean
          admin_pro_override?: boolean
          created_at?: string
          disable_auto_subs?: boolean
          disable_batch_subs?: boolean
          disable_position_swaps?: boolean
          expires_at?: string | null
          formation?: string | null
          id?: string
          is_pro?: boolean
          is_pro_football?: boolean
          is_trial?: boolean
          minutes_per_half?: number
          promo_code_id?: string | null
          rotation_speed?: number
          show_match_header?: boolean
          stripe_subscription_id?: string | null
          team_id: string
          team_size?: number
          trial_ends_at?: string | null
          trial_is_annual?: boolean | null
          trial_plan?: string | null
          trial_tier?: string | null
          updated_at?: string
        }
        Update: {
          activated_at?: string | null
          admin_pro_football_override?: boolean
          admin_pro_override?: boolean
          created_at?: string
          disable_auto_subs?: boolean
          disable_batch_subs?: boolean
          disable_position_swaps?: boolean
          expires_at?: string | null
          formation?: string | null
          id?: string
          is_pro?: boolean
          is_pro_football?: boolean
          is_trial?: boolean
          minutes_per_half?: number
          promo_code_id?: string | null
          rotation_speed?: number
          show_match_header?: boolean
          stripe_subscription_id?: string | null
          team_id?: string
          team_size?: number
          trial_ends_at?: string | null
          trial_is_annual?: boolean | null
          trial_plan?: string | null
          trial_tier?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_subscriptions_promo_code_id_fkey"
            columns: ["promo_code_id"]
            isOneToOne: false
            referencedRelation: "promo_codes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_subscriptions_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: true
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          club_id: string
          created_at: string
          created_by: string | null
          description: string | null
          folder_id: string | null
          id: string
          level_age: string | null
          logo_url: string | null
          name: string
          sponsor_id: string | null
          updated_at: string
        }
        Insert: {
          club_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          folder_id?: string | null
          id?: string
          level_age?: string | null
          logo_url?: string | null
          name: string
          sponsor_id?: string | null
          updated_at?: string
        }
        Update: {
          club_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          folder_id?: string | null
          id?: string
          level_age?: string | null
          logo_url?: string | null
          name?: string
          sponsor_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "team_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
        ]
      }
      user_passkeys: {
        Row: {
          counter: number
          created_at: string
          credential_id: string
          device_name: string | null
          id: string
          public_key: string
          transports: string[] | null
          user_id: string
        }
        Insert: {
          counter?: number
          created_at?: string
          credential_id: string
          device_name?: string | null
          id?: string
          public_key: string
          transports?: string[] | null
          user_id: string
        }
        Update: {
          counter?: number
          created_at?: string
          credential_id?: string
          device_name?: string | null
          id?: string
          public_key?: string
          transports?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_passkeys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          club_id: string | null
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          team_id: string | null
          user_id: string
        }
        Insert: {
          club_id?: string | null
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          team_id?: string | null
          user_id: string
        }
        Update: {
          club_id?: string | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          team_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vault_files: {
        Row: {
          club_id: string | null
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          file_size: number | null
          file_url: string
          folder_id: string | null
          id: string
          name: string
          team_id: string | null
          uploader_id: string
        }
        Insert: {
          club_id?: string | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          file_size?: number | null
          file_url: string
          folder_id?: string | null
          id?: string
          name: string
          team_id?: string | null
          uploader_id: string
        }
        Update: {
          club_id?: string | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          file_size?: number | null
          file_url?: string
          folder_id?: string | null
          id?: string
          name?: string
          team_id?: string | null
          uploader_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vault_files_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vault_files_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vault_files_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "vault_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vault_files_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vault_files_uploader_id_fkey"
            columns: ["uploader_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vault_folders: {
        Row: {
          club_id: string | null
          created_at: string
          created_by: string
          id: string
          name: string
          parent_folder_id: string | null
          team_id: string | null
        }
        Insert: {
          club_id?: string | null
          created_at?: string
          created_by: string
          id?: string
          name: string
          parent_folder_id?: string | null
          team_id?: string | null
        }
        Update: {
          club_id?: string | null
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          parent_folder_id?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vault_folders_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vault_folders_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vault_folders_parent_folder_id_fkey"
            columns: ["parent_folder_id"]
            isOneToOne: false
            referencedRelation: "vault_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vault_folders_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_chat_group: {
        Args: { _group_id: string; _user_id: string }
        Returns: boolean
      }
      can_admin_view_child: {
        Args: { _child_id: string; _user_id: string }
        Returns: boolean
      }
      can_view_child_via_team: {
        Args: { _child_id: string; _user_id: string }
        Returns: boolean
      }
      extract_mentioned_user_ids: {
        Args: { message_text: string }
        Returns: string[]
      }
      get_club_invite_by_token: {
        Args: { _token: string }
        Returns: {
          club_description: string
          club_id: string
          club_logo_url: string
          club_name: string
          created_at: string
          created_by: string
          expires_at: string
          id: string
          max_uses: number
          role: Database["public"]["Enums"]["app_role"]
          token: string
          uses_count: number
        }[]
      }
      get_club_team_count: { Args: { _club_id: string }; Returns: number }
      get_team_invite_by_token: {
        Args: { _token: string }
        Returns: {
          club_id: string
          club_name: string
          created_at: string
          created_by: string
          expires_at: string
          id: string
          max_uses: number
          role: Database["public"]["Enums"]["app_role"]
          team_id: string
          team_logo_url: string
          team_name: string
          token: string
          uses_count: number
        }[]
      }
      get_user_by_email_for_passkey: {
        Args: { lookup_email: string }
        Returns: {
          id: string
        }[]
      }
      has_role: {
        Args: {
          _club_id?: string
          _role: Database["public"]["Enums"]["app_role"]
          _team_id?: string
          _user_id: string
        }
        Returns: boolean
      }
      is_club_member: {
        Args: { _club_id: string; _user_id: string }
        Returns: boolean
      }
      is_team_member: {
        Args: { _team_id: string; _user_id: string }
        Returns: boolean
      }
      notify_all_users: {
        Args: {
          _exclude_user_id: string
          _message: string
          _related_id?: string
          _type: string
        }
        Returns: undefined
      }
      notify_club_members: {
        Args: {
          _club_id: string
          _exclude_user_id: string
          _message: string
          _related_id?: string
          _type: string
        }
        Returns: undefined
      }
      notify_team_members: {
        Args: {
          _exclude_user_id: string
          _message: string
          _related_id?: string
          _team_id: string
          _type: string
        }
        Returns: undefined
      }
      shares_team_or_club_with: {
        Args: { _profile_id: string; _viewer_id: string }
        Returns: boolean
      }
      team_has_club_pro_access: { Args: { _team_id: string }; Returns: boolean }
      team_has_club_pro_football_access: {
        Args: { _team_id: string }
        Returns: boolean
      }
      validate_promo_code:
        | {
            Args: { _code: string }
            Returns: {
              expires_at: string
              id: string
              is_valid: boolean
            }[]
          }
        | {
            Args: { _club_id?: string; _code: string }
            Returns: {
              access_level: string
              club_id: string
              expires_at: string
              id: string
              is_valid: boolean
            }[]
          }
    }
    Enums: {
      app_role:
        | "basic_user"
        | "club_admin"
        | "team_admin"
        | "coach"
        | "player"
        | "parent"
        | "app_admin"
      club_subscription_plan: "starter" | "standard" | "unlimited"
      duty_status: "open" | "completed"
      event_type: "game" | "training" | "social"
      feedback_status: "open" | "in_progress" | "resolved"
      role_request_status: "pending" | "approved" | "denied"
      rsvp_status: "going" | "maybe" | "not_going"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "basic_user",
        "club_admin",
        "team_admin",
        "coach",
        "player",
        "parent",
        "app_admin",
      ],
      club_subscription_plan: ["starter", "standard", "unlimited"],
      duty_status: ["open", "completed"],
      event_type: ["game", "training", "social"],
      feedback_status: ["open", "in_progress", "resolved"],
      role_request_status: ["pending", "approved", "denied"],
      rsvp_status: ["going", "maybe", "not_going"],
    },
  },
} as const
