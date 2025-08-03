// Email Service for handling email notifications
// In a real application, this would integrate with services like SendGrid, Mailgun, or AWS SES
// For this demo, we'll simulate email sending and store notifications locally

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  htmlContent: string
  textContent: string
  variables: string[]
}

export interface EmailNotification {
  id: string
  to: string
  subject: string
  content: string
  type: 'order_confirmation' | 'order_status' | 'welcome' | 'password_reset' | 'newsletter' | 'promotion'
  status: 'pending' | 'sent' | 'failed'
  sentAt?: string
  createdAt: string
  orderId?: string
  userId?: string
}

class EmailService {
  private notifications: EmailNotification[] = []
  private templates: EmailTemplate[] = []

  constructor() {
    this.loadNotifications()
    this.initializeTemplates()
  }

  // Initialize default email templates
  private initializeTemplates() {
    this.templates = [
      {
        id: 'order_confirmation',
        name: 'Order Confirmation',
        subject: 'Order Confirmation - #{orderNumber}',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #1C1C1E; color: white; padding: 20px; text-align: center;">
              <h1>Phone Store Nigeria</h1>
              <p>Thank you for your order!</p>
            </div>
            <div style="padding: 20px;">
              <h2>Order Confirmation</h2>
              <p>Dear #{customerName},</p>
              <p>Thank you for your order! We're excited to confirm that we've received your order and it's being processed.</p>
              
              <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0;">
                <h3>Order Details</h3>
                <p><strong>Order Number:</strong> #{orderNumber}</p>
                <p><strong>Order Date:</strong> #{orderDate}</p>
                <p><strong>Total Amount:</strong> ₦#{totalAmount}</p>
              </div>
              
              <div style="margin: 20px 0;">
                <h3>Items Ordered</h3>
                #{orderItems}
              </div>
              
              <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0;">
                <h3>Shipping Information</h3>
                <p>#{shippingAddress}</p>
                <p><strong>Estimated Delivery:</strong> #{estimatedDelivery}</p>
              </div>
              
              <p>You can track your order status by logging into your account on our website.</p>
              <p>If you have any questions, please don't hesitate to contact our customer service team.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="#{trackingUrl}" style="background-color: #007AFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Track Your Order</a>
              </div>
            </div>
            <div style="background-color: #f5f5f5; padding: 20px; text-align: center; color: #666;">
              <p>Phone Store Nigeria - Your trusted mobile phone retailer</p>
              <p>Lagos, Nigeria | support@phonestoreng.com | +234 123 456 7890</p>
            </div>
          </div>
        `,
        textContent: `
Order Confirmation - #{orderNumber}

Dear #{customerName},

Thank you for your order! We're excited to confirm that we've received your order and it's being processed.

Order Details:
- Order Number: #{orderNumber}
- Order Date: #{orderDate}
- Total Amount: ₦#{totalAmount}

Items Ordered:
#{orderItemsText}

Shipping Information:
#{shippingAddress}
Estimated Delivery: #{estimatedDelivery}

You can track your order status by logging into your account on our website.

Track your order: #{trackingUrl}

Phone Store Nigeria
Lagos, Nigeria
support@phonestoreng.com
+234 123 456 7890
        `,
        variables: ['customerName', 'orderNumber', 'orderDate', 'totalAmount', 'orderItems', 'orderItemsText', 'shippingAddress', 'estimatedDelivery', 'trackingUrl']
      },
      {
        id: 'order_status',
        name: 'Order Status Update',
        subject: 'Order Status Update - #{orderNumber}',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #1C1C1E; color: white; padding: 20px; text-align: center;">
              <h1>Phone Store Nigeria</h1>
              <p>Order Status Update</p>
            </div>
            <div style="padding: 20px;">
              <h2>Your Order Status Has Been Updated</h2>
              <p>Dear #{customerName},</p>
              <p>We wanted to update you on the status of your recent order.</p>
              
              <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0;">
                <h3>Order Information</h3>
                <p><strong>Order Number:</strong> #{orderNumber}</p>
                <p><strong>Current Status:</strong> <span style="color: #007AFF; font-weight: bold;">#{orderStatus}</span></p>
                <p><strong>Status Updated:</strong> #{statusDate}</p>
              </div>
              
              <div style="margin: 20px 0;">
                <p>#{statusMessage}</p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="#{trackingUrl}" style="background-color: #007AFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Track Your Order</a>
              </div>
            </div>
            <div style="background-color: #f5f5f5; padding: 20px; text-align: center; color: #666;">
              <p>Phone Store Nigeria - Your trusted mobile phone retailer</p>
              <p>Lagos, Nigeria | support@phonestoreng.com | +234 123 456 7890</p>
            </div>
          </div>
        `,
        textContent: `
Order Status Update - #{orderNumber}

Dear #{customerName},

We wanted to update you on the status of your recent order.

Order Information:
- Order Number: #{orderNumber}
- Current Status: #{orderStatus}
- Status Updated: #{statusDate}

#{statusMessage}

Track your order: #{trackingUrl}

Phone Store Nigeria
Lagos, Nigeria
support@phonestoreng.com
+234 123 456 7890
        `,
        variables: ['customerName', 'orderNumber', 'orderStatus', 'statusDate', 'statusMessage', 'trackingUrl']
      },
      {
        id: 'welcome',
        name: 'Welcome Email',
        subject: 'Welcome to Phone Store Nigeria!',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #1C1C1E; color: white; padding: 20px; text-align: center;">
              <h1>Welcome to Phone Store Nigeria!</h1>
            </div>
            <div style="padding: 20px;">
              <h2>Welcome, #{customerName}!</h2>
              <p>Thank you for joining Phone Store Nigeria, your trusted destination for the latest mobile phones and accessories.</p>
              
              <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0;">
                <h3>What's Next?</h3>
                <ul>
                  <li>Browse our extensive collection of smartphones</li>
                  <li>Add items to your wishlist for later</li>
                  <li>Enjoy fast delivery across Nigeria</li>
                  <li>Get exclusive deals and promotions</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="#{shopUrl}" style="background-color: #007AFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Start Shopping</a>
              </div>
            </div>
            <div style="background-color: #f5f5f5; padding: 20px; text-align: center; color: #666;">
              <p>Phone Store Nigeria - Your trusted mobile phone retailer</p>
              <p>Lagos, Nigeria | support@phonestoreng.com | +234 123 456 7890</p>
            </div>
          </div>
        `,
        textContent: `
Welcome to Phone Store Nigeria!

Welcome, #{customerName}!

Thank you for joining Phone Store Nigeria, your trusted destination for the latest mobile phones and accessories.

What's Next?
- Browse our extensive collection of smartphones
- Add items to your wishlist for later
- Enjoy fast delivery across Nigeria
- Get exclusive deals and promotions

Start shopping: #{shopUrl}

Phone Store Nigeria
Lagos, Nigeria
support@phonestoreng.com
+234 123 456 7890
        `,
        variables: ['customerName', 'shopUrl']
      }
    ]
  }

  // Send email notification
  async sendEmail(
    to: string,
    templateId: string,
    variables: Record<string, string>,
    orderId?: string,
    userId?: string
  ): Promise<EmailNotification> {
    const template = this.templates.find(t => t.id === templateId)
    if (!template) {
      throw new Error(`Template ${templateId} not found`)
    }

    // Replace variables in template
    let subject = template.subject
    let content = template.htmlContent

    template.variables.forEach(variable => {
      const value = variables[variable] || ''
      subject = subject.replace(new RegExp(`#{${variable}}`, 'g'), value)
      content = content.replace(new RegExp(`#{${variable}}`, 'g'), value)
    })

    const notification: EmailNotification = {
      id: Date.now().toString(),
      to,
      subject,
      content,
      type: templateId as any,
      status: 'pending',
      createdAt: new Date().toISOString(),
      orderId,
      userId
    }

    // Simulate email sending (in real app, this would call external service)
    try {
      await this.simulateEmailSending(notification)
      notification.status = 'sent'
      notification.sentAt = new Date().toISOString()
    } catch (error) {
      notification.status = 'failed'
    }

    this.notifications.push(notification)
    this.saveNotifications()

    return notification
  }

  // Simulate email sending delay
  private async simulateEmailSending(notification: EmailNotification): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 95% success rate simulation
        if (Math.random() > 0.05) {
          resolve()
        } else {
          reject(new Error('Email sending failed'))
        }
      }, 1000 + Math.random() * 2000) // 1-3 second delay
    })
  }

  // Get all notifications
  getNotifications(): EmailNotification[] {
    return [...this.notifications].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  // Get notifications by user
  getNotificationsByUser(userId: string): EmailNotification[] {
    return this.notifications.filter(n => n.userId === userId)
  }

  // Get notifications by order
  getNotificationsByOrder(orderId: string): EmailNotification[] {
    return this.notifications.filter(n => n.orderId === orderId)
  }

  // Get email templates
  getTemplates(): EmailTemplate[] {
    return [...this.templates]
  }

  // Save notifications to localStorage
  private saveNotifications() {
    localStorage.setItem('email_notifications', JSON.stringify(this.notifications))
  }

  // Load notifications from localStorage
  private loadNotifications() {
    const stored = localStorage.getItem('email_notifications')
    if (stored) {
      try {
        this.notifications = JSON.parse(stored)
      } catch (error) {
        console.error('Error loading email notifications:', error)
        this.notifications = []
      }
    }
  }

  // Clear all notifications (for testing)
  clearNotifications() {
    this.notifications = []
    this.saveNotifications()
  }
}

// Export singleton instance
export const emailService = new EmailService()
export default emailService
