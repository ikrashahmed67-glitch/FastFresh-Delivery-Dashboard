export type OrderStatus = 'Pending' | 'On The Way' | 'Delivered'

export interface Order {
  id: string
  customer_name: string | null
  email: string | null
  phone: string | null
  address: string | null
  city: string | null
  google_location: string | null
  notes: string | null
  order_items: string | null
  subtotal: number | null
  delivery_charge: number | null
  total_amount: number | null
  order_date: string | null
  status: OrderStatus
}

export interface CreateOrderRequest {
  customer_name: string
  email?: string
  phone: string
  address: string
  city?: string
  google_location?: string
  notes?: string
  order_items: string
  subtotal: number
  delivery_charge: number
  total_amount: number
}
