import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/database"

export const createClient = () => {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  )
}

// Service role client for admin operations
export const createServiceClient = () => {
  return createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get() {
        return undefined
      },
      set() {},
      remove() {},
    },
  })
}

// Helper functions for AI agent data
export const getAgentInteractions = async (userId: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("agent_interactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching agent interactions:", error)
    return []
  }

  return data
}

export const saveAgentInteraction = async (interaction: {
  user_id: string
  agent_type: string
  message: string
  response: string
  tools_used?: string[]
  metadata?: Record<string, any>
}) => {
  const supabase = createClient()

  const { data, error } = await supabase.from("agent_interactions").insert(interaction).select().single()

  if (error) {
    console.error("Error saving agent interaction:", error)
    throw error
  }

  return data
}

// VR4DEAF specific functions
export const getVRCoordinationData = async (clientId: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("vr_coordination")
    .select(`
      *,
      fibonrose_scores (*),
      accommodation_requests (*),
      progress_tracking (*)
    `)
    .eq("client_id", clientId)

  if (error) {
    console.error("Error fetching VR coordination data:", error)
    return null
  }

  return data
}

export const updateFibonroseScore = async (
  userId: string,
  scoreData: {
    base_skills: number
    community_endorsements: number
    verified_experience: number
    employer_validations: number
    peer_network_trust: number
    portfolio_quality: number
    total_score: number
  },
) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("fibonrose_scores")
    .upsert({
      user_id: userId,
      ...scoreData,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error("Error updating FIBONROSE score:", error)
    throw error
  }

  return data
}
