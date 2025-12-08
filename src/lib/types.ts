export type OrderStatus = 'Pending' | 'Out for delivery' | 'Delivered' | 'Cancelled'

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

export type Database = {
  public: {
    Tables: {
      orders: {
        Row: Order
        Insert: Partial<Order>
        Update: Partial<Order>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
