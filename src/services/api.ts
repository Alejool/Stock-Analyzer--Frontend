
import type { StockResponse, StockFilters } from '@/types'


const API_BASE_URL = 'http://localhost:8080/api/v1'

class StockAPI {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      ...options
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async getStocks(filters: StockFilters): Promise<StockResponse> {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString())
      }
    })

    return this.request<StockResponse>(`/stocks?${params.toString()}`)
  }

  async getRecommendations(): Promise<{ recommendations: any[] }> {
    return this.request<{ recommendations: any[] }>('/recommendations')
  }

  async healthCheck(): Promise<{ status: string; message: string }> {
    return this.request<{ status: string; message: string }>('/health')
  }
}

export const stockAPI = new StockAPI()