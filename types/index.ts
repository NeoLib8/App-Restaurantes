// types/index.ts

export type Restaurant = {
  id: string
  name: string
  description?: string
  logo_url?: string
}

export type Branch = {
  id: string
  restaurant_id: string
  name: string
  address?: string
  phone?: string
  is_open: boolean
}

export type BranchSettings = {
  id: string
  branch_id: string
  opening_hours: Record<string, string> // JSON tipo { "mon": "10:00-20:00" }
  prep_time_minutes: number
  delivery_enabled: boolean
  pickup_enabled: boolean
}

export type User = {
  id: string
  restaurant_id: string
  email: string
  password_hash: string
  name?: string
  phone?: string
  created_at: string
}

export type Admin = {
  id: string
  user_id: string
  role: 'global' | 'branch_admin'
  restaurant_id?: string
  branch_id?: string
}

export type Address = {
  id: string
  user_id: string
  label?: string
  street: string
  city?: string
  postal_code?: string
  is_default: boolean
}

export type Notification = {
  id: string
  user_id: string
  title: string
  message: string
  category?: string
  read: boolean
  created_at: string
}

export type Category = {
  id: string
  branch_id: string
  name: string
  position: number
}

export type Product = {
  id: string
  branch_id: string
  category_id?: string
  name: string
  description?: string
  price: number
  image_url?: string
}

export type OptionGroup = {
  id: string
  product_id: string
  name: string
  is_required: boolean
  is_multiple: boolean
}

export type OptionItem = {
  id: string
  group_id: string
  name: string
  price: number
}

export type Order = {
  id: string
  user_id: string
  branch_id: string
  restaurant_id: string
  status: string // ejemplo: 'pending', 'confirmed', etc.
  total_price?: number
  created_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_base_price: number
  quantity: number
  unit_price: number
  line_total: number
}

export type OrderItemOption = {
  id: string
  order_item_id: string
  option_item_id: string
  name: string
  price: number
}

export type Payment = {
  id: string
  order_id: string
  provider?: string // 'stripe', etc.
  status?: string
  amount?: number
  payment_intent_id?: string
}

export type Discount = {
  id: string
  restaurant_id?: string
  branch_id?: string
  code: string
  discount_type: 'percentage' | 'fixed'
  amount: number
  valid_from?: string
  valid_until?: string
  max_uses?: number
  used_count: number
  active: boolean
}

export type EventLog = {
  id: string
  user_id?: string
  event_type: string
  description?: string
  created_at: string
}

export type CustomizationType = 'none' | 'options' | 'observations'
