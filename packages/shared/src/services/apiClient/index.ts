export class ApiClient {
  private baseURL: string
  private apiKey: string

  constructor(baseURL: string, apiKey: string) {
    this.baseURL = baseURL
    this.apiKey = apiKey
  }

  async get<T>(url: string, params?: Record<string, string>): Promise<T> {
    const urlObj = new URL(url, this.baseURL)
    
    // Add API key to params
    urlObj.searchParams.set('api_key', this.apiKey)
    
    // Add any additional params
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          urlObj.searchParams.set(key, value)
        }
      })
    }

    const response = await fetch(urlObj.toString())
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }
}
