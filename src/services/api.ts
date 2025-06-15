
import type { StockResponse, StockFilters } from '../types'

const RAIZ = import.meta.env.VITE_RAIZ_URL
const API_BASE_URL = import.meta.env.VITE_API_URL

class StockAPI {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {

    // console.log('${API_BASE_URL}${endpoint}', `${API_BASE_URL}${endpoint}`)
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

    // return this.request<StockResponse>(`${RAIZ}/stocks?${params.toString()}`)
    return this.request<StockResponse>(`${RAIZ}/stocks`)
  }

  async getRecommendations(): Promise<{ recommendations: any[] }> {
    return this.request<{ recommendations: any[] }>(`${RAIZ}/recommendations`)
  }

  async healthCheck(): Promise<{ status: string; message: string }> {
    return this.request<{ status: string; message: string }>(`${RAIZ}/health`) 
  }
}

export const stockAPI = new StockAPI()