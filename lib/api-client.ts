// Cross-domain API client for 360magicians.com -> mbtq.dev
const API_BASE = process.env.NODE_ENV === "production" ? "https://mbtq.dev/api" : "http://localhost:3000/api"

export class APIClient {
  private baseURL: string
  private headers: Record<string, string>

  constructor() {
    this.baseURL = API_BASE
    this.headers = {
      "Content-Type": "application/json",
      Origin: "https://360magicians.com",
    }
  }

  async callAgent(agentType: string, payload: any) {
    try {
      const response = await fetch(`${this.baseURL}/agents/${agentType}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(payload),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.error("API call error:", error)
      throw error
    }
  }

  async getAgentStatus(agentType: string) {
    try {
      const response = await fetch(`${this.baseURL}/agents/${agentType}/status`, {
        method: "GET",
        headers: this.headers,
        credentials: "include",
      })

      return response.json()
    } catch (error) {
      console.error("Status check error:", error)
      throw error
    }
  }

  async streamAgent(agentType: string, payload: any) {
    try {
      const response = await fetch(`${this.baseURL}/agents/${agentType}/stream`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(payload),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error(`Stream failed: ${response.status}`)
      }

      return response.body
    } catch (error) {
      console.error("Stream error:", error)
      throw error
    }
  }
}

export const apiClient = new APIClient()
