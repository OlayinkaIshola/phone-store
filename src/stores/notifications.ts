import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import emailService, { type EmailNotification } from '@/services/emailService'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<EmailNotification[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed properties
  const totalNotifications = computed(() => notifications.value.length)
  const sentNotifications = computed(() => 
    notifications.value.filter(n => n.status === 'sent')
  )
  const pendingNotifications = computed(() => 
    notifications.value.filter(n => n.status === 'pending')
  )
  const failedNotifications = computed(() => 
    notifications.value.filter(n => n.status === 'failed')
  )

  const notificationsByType = computed(() => {
    const types: Record<string, number> = {}
    notifications.value.forEach(n => {
      types[n.type] = (types[n.type] || 0) + 1
    })
    return types
  })

  // Actions
  const loadNotifications = () => {
    try {
      notifications.value = emailService.getNotifications()
    } catch (err) {
      error.value = 'Failed to load notifications'
      console.error('Error loading notifications:', err)
    }
  }

  const sendOrderConfirmation = async (
    customerEmail: string,
    customerName: string,
    order: any
  ) => {
    loading.value = true
    error.value = null

    try {
      const orderItems = order.items.map((item: any) => 
        `<div style="border-bottom: 1px solid #eee; padding: 10px 0;">
          <strong>${item.name}</strong><br>
          Quantity: ${item.quantity}<br>
          Price: ₦${item.price.toLocaleString()}<br>
          Subtotal: ₦${(item.price * item.quantity).toLocaleString()}
        </div>`
      ).join('')

      const orderItemsText = order.items.map((item: any) => 
        `${item.name} (Qty: ${item.quantity}) - ₦${(item.price * item.quantity).toLocaleString()}`
      ).join('\n')

      const variables = {
        customerName,
        orderNumber: order.id,
        orderDate: new Date(order.createdAt).toLocaleDateString(),
        totalAmount: order.total.toLocaleString(),
        orderItems,
        orderItemsText,
        shippingAddress: `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state}`,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        trackingUrl: `${window.location.origin}/account?tab=orders`
      }

      const notification = await emailService.sendEmail(
        customerEmail,
        'order_confirmation',
        variables,
        order.id,
        order.userId
      )

      notifications.value.unshift(notification)
      return notification
    } catch (err) {
      error.value = 'Failed to send order confirmation email'
      console.error('Error sending order confirmation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const sendOrderStatusUpdate = async (
    customerEmail: string,
    customerName: string,
    order: any,
    newStatus: string
  ) => {
    loading.value = true
    error.value = null

    try {
      const statusMessages: Record<string, string> = {
        'processing': 'Your order is being processed and will be shipped soon.',
        'shipped': 'Great news! Your order has been shipped and is on its way to you.',
        'delivered': 'Your order has been successfully delivered. We hope you enjoy your new phone!',
        'cancelled': 'Your order has been cancelled. If you have any questions, please contact our support team.'
      }

      const variables = {
        customerName,
        orderNumber: order.id,
        orderStatus: newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
        statusDate: new Date().toLocaleDateString(),
        statusMessage: statusMessages[newStatus] || 'Your order status has been updated.',
        trackingUrl: `${window.location.origin}/account?tab=orders`
      }

      const notification = await emailService.sendEmail(
        customerEmail,
        'order_status',
        variables,
        order.id,
        order.userId
      )

      notifications.value.unshift(notification)
      return notification
    } catch (err) {
      error.value = 'Failed to send order status update email'
      console.error('Error sending order status update:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const sendWelcomeEmail = async (
    customerEmail: string,
    customerName: string,
    userId: string
  ) => {
    loading.value = true
    error.value = null

    try {
      const variables = {
        customerName,
        shopUrl: `${window.location.origin}/shop`
      }

      const notification = await emailService.sendEmail(
        customerEmail,
        'welcome',
        variables,
        undefined,
        userId
      )

      notifications.value.unshift(notification)
      return notification
    } catch (err) {
      error.value = 'Failed to send welcome email'
      console.error('Error sending welcome email:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const sendPasswordResetEmail = async (
    customerEmail: string,
    customerName: string,
    resetToken: string
  ) => {
    loading.value = true
    error.value = null

    try {
      // For demo purposes, we'll use a simple template
      const resetUrl = `${window.location.origin}/auth?mode=reset&token=${resetToken}`
      
      const customTemplate = {
        id: 'password_reset',
        name: 'Password Reset',
        subject: 'Password Reset Request - Phone Store Nigeria',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #1C1C1E; color: white; padding: 20px; text-align: center;">
              <h1>Phone Store Nigeria</h1>
              <p>Password Reset Request</p>
            </div>
            <div style="padding: 20px;">
              <h2>Reset Your Password</h2>
              <p>Dear #{customerName},</p>
              <p>We received a request to reset your password. Click the button below to create a new password:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="#{resetUrl}" style="background-color: #007AFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Reset Password</a>
              </div>
              
              <p>If you didn't request this password reset, please ignore this email.</p>
              <p>This link will expire in 24 hours for security reasons.</p>
            </div>
            <div style="background-color: #f5f5f5; padding: 20px; text-align: center; color: #666;">
              <p>Phone Store Nigeria - Your trusted mobile phone retailer</p>
              <p>Lagos, Nigeria | support@phonestoreng.com | +234 123 456 7890</p>
            </div>
          </div>
        `,
        textContent: `
Password Reset Request - Phone Store Nigeria

Dear #{customerName},

We received a request to reset your password. Click the link below to create a new password:

#{resetUrl}

If you didn't request this password reset, please ignore this email.
This link will expire in 24 hours for security reasons.

Phone Store Nigeria
Lagos, Nigeria
support@phonestoreng.com
+234 123 456 7890
        `,
        variables: ['customerName', 'resetUrl']
      }

      // Simulate sending with custom template
      const variables = {
        customerName,
        resetUrl
      }

      const notification = await emailService.sendEmail(
        customerEmail,
        'password_reset',
        variables
      )

      notifications.value.unshift(notification)
      return notification
    } catch (err) {
      error.value = 'Failed to send password reset email'
      console.error('Error sending password reset email:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getNotificationsByUser = (userId: string) => {
    return notifications.value.filter(n => n.userId === userId)
  }

  const getNotificationsByOrder = (orderId: string) => {
    return notifications.value.filter(n => n.orderId === orderId)
  }

  const clearError = () => {
    error.value = null
  }

  const clearNotifications = () => {
    emailService.clearNotifications()
    notifications.value = []
  }

  // Initialize store
  loadNotifications()

  return {
    notifications,
    loading,
    error,
    totalNotifications,
    sentNotifications,
    pendingNotifications,
    failedNotifications,
    notificationsByType,
    loadNotifications,
    sendOrderConfirmation,
    sendOrderStatusUpdate,
    sendWelcomeEmail,
    sendPasswordResetEmail,
    getNotificationsByUser,
    getNotificationsByOrder,
    clearError,
    clearNotifications
  }
})
