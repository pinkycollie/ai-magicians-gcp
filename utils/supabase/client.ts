import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/database"

let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export const createClient = () => {
  // Create a singleton client for the browser
  if (!supabaseClient) {
    supabaseClient = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }

  return supabaseClient
}

// Real-time subscription helpers for AI agents
export const subscribeToAgentUpdates = (userId: string, callback: (payload: any) => void) => {
  const supabase = createClient()

  return supabase
    .channel("agent_updates")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "agent_interactions",
        filter: `user_id=eq.${userId}`,
      },
      callback,
    )
    .subscribe()
}

// PinkSync progress tracking
export const subscribeToProgressUpdates = (clientId: string, callback: (payload: any) => void) => {
  const supabase = createClient()

  return supabase
    .channel("progress_updates")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "progress_tracking",
        filter: `client_id=eq.${clientId}`,
      },
      callback,
    )
    .subscribe()
}

// DeafAUTH accommodation requests
export const subscribeToAccommodationUpdates = (userId: string, callback: (payload: any) => void) => {
  const supabase = createClient()

  return supabase
    .channel("accommodation_updates")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "accommodation_requests",
        filter: `user_id=eq.${userId}`,
      },
      callback,
    )
    .subscribe()
}

// Helper function for AI agent analytics
export const trackAgentUsage = async (agentType: string, action: string) => {
  const supabase = createClient()

  const { error } = await supabase.from("agent_analytics").insert({
    agent_type: agentType,
    action: action,
    timestamp: new Date().toISOString(),
    user_agent: navigator.userAgent,
  })

  if (error) {
    console.error("Error tracking agent usage:", error)
  }
}
