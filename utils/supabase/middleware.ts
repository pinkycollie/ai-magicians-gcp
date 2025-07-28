import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  // Refresh session if expired
  await supabase.auth.getUser()

  return response
}

// Middleware for AI agent access control
export async function checkAgentAccess(request: NextRequest, agentType: string): Promise<boolean> {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set() {},
        remove() {},
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  // Check user permissions for specific agent types
  const { data: permissions } = await supabase
    .from("user_agent_permissions")
    .select("agent_types")
    .eq("user_id", user.id)
    .single()

  if (!permissions) {
    return false
  }

  return permissions.agent_types.includes(agentType)
}

// HIPAA compliance logging
export async function logAccess(request: NextRequest, userId: string, resource: string, action: string) {
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get() {
        return undefined
      },
      set() {},
      remove() {},
    },
  })

  await supabase.from("access_logs").insert({
    user_id: userId,
    resource: resource,
    action: action,
    ip_address: request.ip || "unknown",
    user_agent: request.headers.get("user-agent") || "unknown",
    timestamp: new Date().toISOString(),
  })
}

// Rate limiting for AI agents
export async function checkRateLimit(userId: string, agentType: string, limit = 100): Promise<boolean> {
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get() {
        return undefined
      },
      set() {},
      remove() {},
    },
  })

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

  const { count } = await supabase
    .from("agent_interactions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("agent_type", agentType)
    .gte("created_at", oneHourAgo)

  return (count || 0) < limit
}
