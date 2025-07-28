export interface Database {
  public: {
    Tables: {
      agent_interactions: {
        Row: {
          id: string
          user_id: string
          agent_type: string
          message: string
          response: string
          tools_used: string[] | null
          metadata: Record<string, any> | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          agent_type: string
          message: string
          response: string
          tools_used?: string[] | null
          metadata?: Record<string, any> | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          agent_type?: string
          message?: string
          response?: string
          tools_used?: string[] | null
          metadata?: Record<string, any> | null
          created_at?: string
        }
      }
      fibonrose_scores: {
        Row: {
          id: string
          user_id: string
          base_skills: number
          community_endorsements: number
          verified_experience: number
          employer_validations: number
          peer_network_trust: number
          portfolio_quality: number
          total_score: number
          trust_level: string
          blockchain_hash: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          base_skills: number
          community_endorsements: number
          verified_experience: number
          employer_validations: number
          peer_network_trust: number
          portfolio_quality: number
          total_score: number
          trust_level: string
          blockchain_hash?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          base_skills?: number
          community_endorsements?: number
          verified_experience?: number
          employer_validations?: number
          peer_network_trust?: number
          portfolio_quality?: number
          total_score?: number
          trust_level?: string
          blockchain_hash?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      accommodation_requests: {
        Row: {
          id: string
          user_id: string
          accommodation_type: string
          urgency: string
          location: string
          duration: string
          status: string
          deployed_at: string | null
          metadata: Record<string, any> | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          accommodation_type: string
          urgency: string
          location: string
          duration: string
          status?: string
          deployed_at?: string | null
          metadata?: Record<string, any> | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          accommodation_type?: string
          urgency?: string
          location?: string
          duration?: string
          status?: string
          deployed_at?: string | null
          metadata?: Record<string, any> | null
          created_at?: string
        }
      }
      progress_tracking: {
        Row: {
          id: string
          client_id: string
          milestones: Record<string, any>
          goals: Record<string, any>
          accommodation_preferences: Record<string, any>
          visual_dashboard_config: Record<string, any>
          sync_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          milestones: Record<string, any>
          goals: Record<string, any>
          accommodation_preferences: Record<string, any>
          visual_dashboard_config: Record<string, any>
          sync_status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          milestones?: Record<string, any>
          goals?: Record<string, any>
          accommodation_preferences?: Record<string, any>
          visual_dashboard_config?: Record<string, any>
          sync_status?: string
          created_at?: string
          updated_at?: string
        }
      }
      vr_coordination: {
        Row: {
          id: string
          client_id: string
          vr_agency: string
          client_needs: string
          asl_requirements: string
          vr_plan: Record<string, any>
          vura_integration: Record<string, any>
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          vr_agency: string
          client_needs: string
          asl_requirements: string
          vr_plan: Record<string, any>
          vura_integration: Record<string, any>
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          vr_agency?: string
          client_needs?: string
          asl_requirements?: string
          vr_plan?: Record<string, any>
          vura_integration?: Record<string, any>
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_agent_permissions: {
        Row: {
          id: string
          user_id: string
          agent_types: string[]
          permissions: Record<string, any>
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          agent_types: string[]
          permissions: Record<string, any>
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          agent_types?: string[]
          permissions?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
      }
      access_logs: {
        Row: {
          id: string
          user_id: string
          resource: string
          action: string
          ip_address: string
          user_agent: string
          timestamp: string
        }
        Insert: {
          id?: string
          user_id: string
          resource: string
          action: string
          ip_address: string
          user_agent: string
          timestamp: string
        }
        Update: {
          id?: string
          user_id?: string
          resource?: string
          action?: string
          ip_address?: string
          user_agent?: string
          timestamp?: string
        }
      }
      agent_analytics: {
        Row: {
          id: string
          agent_type: string
          action: string
          timestamp: string
          user_agent: string
          metadata: Record<string, any> | null
        }
        Insert: {
          id?: string
          agent_type: string
          action: string
          timestamp: string
          user_agent: string
          metadata?: Record<string, any> | null
        }
        Update: {
          id?: string
          agent_type?: string
          action?: string
          timestamp?: string
          user_agent?: string
          metadata?: Record<string, any> | null
        }
      }
    }
  }
}
