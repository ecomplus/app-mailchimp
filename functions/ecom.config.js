/* eslint-disable comma-dangle, no-multi-spaces, key-spacing */

/**
 * Edit base E-Com Plus Application object here.
 * Ref.: https://developers.e-com.plus/docs/api/#/store/applications/
 */

const app = {
  app_id: 126944,
  title: 'Mailchimp',
  slug: 'mailchimp',
  type: 'external',
  state: 'active',
  authentication: true,

  /**
   * Uncomment modules above to work with E-Com Plus Mods API on Storefront.
   * Ref.: https://developers.e-com.plus/modules-api/
   */
  modules: {
    /**
     * Triggered to calculate shipping options, must return values and deadlines.
     * Start editing `routes/ecom/modules/calculate-shipping.js`
     */
    // calculate_shipping:   { enabled: true },

    /**
     * Triggered to validate and apply discount value, must return discount and conditions.
     * Start editing `routes/ecom/modules/apply-discount.js`
     */
    // apply_discount:       { enabled: true },

    /**
     * Triggered when listing payments, must return available payment methods.
     * Start editing `routes/ecom/modules/list-payments.js`
     */
    // list_payments:        { enabled: true },

    /**
     * Triggered when order is being closed, must create payment transaction and return info.
     * Start editing `routes/ecom/modules/create-transaction.js`
     */
    // create_transaction:   { enabled: true },
  },

  /**
   * Uncomment only the resources/methods your app may need to consume through Store API.
   */
  auth_scope: {
    'stores/me': [
      'GET'            // Read store info
    ],
    procedures: [
      'POST'           // Create procedures to receive webhooks
    ],
    products: [
      'GET',           // Read products with public and private fields
      // 'POST',          // Create products
      // 'PATCH',         // Edit products
      // 'PUT',           // Overwrite products
      // 'DELETE',        // Delete products
    ],
    brands: [
      // 'GET',           // List/read brands with public and private fields
      // 'POST',          // Create brands
      // 'PATCH',         // Edit brands
      // 'PUT',           // Overwrite brands
      // 'DELETE',        // Delete brands
    ],
    categories: [
      // 'GET',           // List/read categories with public and private fields
      // 'POST',          // Create categories
      // 'PATCH',         // Edit categories
      // 'PUT',           // Overwrite categories
      // 'DELETE',        // Delete categories
    ],
    customers: [
      'GET',           // List/read customers
      // 'POST',          // Create customers
      // 'PATCH',         // Edit customers
      // 'PUT',           // Overwrite customers
      // 'DELETE',        // Delete customers
    ],
    orders: [
      'GET',           // List/read orders with public and private fields
      // 'POST',          // Create orders
      // 'PATCH',         // Edit orders
      // 'PUT',           // Overwrite orders
      // 'DELETE',        // Delete orders
    ],
    carts: [
      'GET',           // List all carts (no auth needed to read specific cart only)
      // 'POST',          // Create carts
      // 'PATCH',         // Edit carts
      // 'PUT',           // Overwrite carts
      // 'DELETE',        // Delete carts
    ],

    /**
     * Prefer using 'fulfillments' and 'payment_history' subresources to manipulate update order status.
     */
    'orders/fulfillments': [
      // 'GET',           // List/read order fulfillment and tracking events
      // 'POST',          // Create fulfillment event with new status
      // 'DELETE',        // Delete fulfillment event
    ],
    'orders/payments_history': [
      // 'GET',           // List/read order payments history events
      // 'POST',          // Create payments history entry with new status
      // 'DELETE',        // Delete payments history entry
    ],

    /**
     * Set above 'quantity' and 'price' subresources if you don't need access for full product document.
     * Stock and price management only.
     */
    'products/quantity': [
      // 'GET',           // Read product available quantity
      // 'PUT',           // Set product stock quantity
    ],
    'products/variations/quantity': [
      // 'GET',           // Read variaton available quantity
      // 'PUT',           // Set variation stock quantity
    ],
    'products/price': [
      // 'GET',           // Read product current sale price
      // 'PUT',           // Set product sale price
    ],
    'products/variations/price': [
      // 'GET',           // Read variation current sale price
      // 'PUT',           // Set variation sale price
    ],

    /**
     * You can also set any other valid resource/subresource combination.
     * Ref.: https://developers.e-com.plus/docs/api/#/store/
     */
  },

  admin_settings: {
    mc_api_key: {
      schema: {
        type: 'string',
        maxLength: 255,
        title: 'Mailchimp Api Key',
        description: 'Public Key disponível em https://mailchimp.com/pt/help/about-api-keys/'
      },
      hide: true
    },
    mc_store_id: {
      schema: {
        type: 'string',
        maxLength: 255,
        title: 'Mailchimp Store Id',
        description: 'Pode ser verificado ou criado em Avançado'
      },
      hide: false
    },
    mc_store_list: {
      schema: {
        type: 'string',
        maxLength: 255,
        title: 'Mailchimp Store List',
        description: 'Lista que será vinculada a store, pode ser gerado em Avançado'
      },
      hide: false
    },
    mc_campaign_cart: {
      schema: {
        type: 'string',
        maxLength: 255,
        title: 'Id da campanha para carrinho (opcional)',
        description: 'Caso utilize uma campanha específica para carrinhos, preencha com o id da campanha'
      },
      hide: false
    },
    mc_campaign_order: {
      schema: {
        type: 'string',
        maxLength: 255,
        title: 'Id da campanha para pedido (opcional)',
        description: 'Caso utilize uma campanha específica para pedidos, preencha com o id da campanha'
      },
      hide: false
    },
    mc_campaign_order_utm: {
      schema: {
        type: 'boolean',
        default: false,
        title: 'Buscar id da campanha no utm',
        description: 'Caso ative, utm source precisará ser mailchimp e utm term o id da campanha'
      },
      hide: false
    },
    customer_tag: {
      schema: {
        title: 'Filtro de clientes por tag',
        description: 'Para suas automações, utilize tags para filtrar usuários',
        type: 'array',
        maxItems: 4,
        items: {
          title: 'Serviço de entrega',
          type: 'object',
          required: [
            'tag_type',
            'tag_name'
          ],
          properties: {
            tag_type: {
              type: 'string',
              title: 'Tipo da tag',
              enum: [
                'carrinho aberto',
                'carrinho completado',
                'pedido aberto',
                'pedido pago',
                'pedido cancelado'
              ]
            },
            tag_name: {
              type: 'string',
              maxLength: 50,
              title: 'Nome da tag',
              description: 'Mesmo nome da tag inserida no mailchimp'
            }
          }
        }
      },
      hide: true
    }
  }
}

/**
 * List of Procedures to be created on each store after app installation.
 * Ref.: https://developers.e-com.plus/docs/api/#/store/procedures/
 */

const procedures = []

const { baseUri } = require('./__env')

procedures.push({
  title: app.title,

  triggers: [
    // Receive notifications when products/variations stock quantity changes:
    {
      resource: 'products',
      action: 'create'
    },
    {
      resource: 'products',
      field: 'price',
    },
    {
      resource: 'products',
      subresource: 'variations',
      field: 'price',
    },
    // Receive notifications when cart is created:
    {
      resource: 'carts',
      action: 'create',
    },
    // Receive notifications when changes completed status inside cart:
    {
      resource: 'carts',
      field: 'completed',
    },
    // Receive notifications when order change status:
    {
      resource: 'orders',
      field: 'financial_status',
    },
    // Receive notifications when customer is created:
    {
      resource: 'customers',
      action: 'create',
    },
    // Feel free to create custom combinations with any Store API resource, subresource, action and field.
  ],

  webhooks: [
    {
      api: {
        external_api: {
          uri: `${baseUri}/ecom/webhook`
        }
      },
      method: 'POST'
    }
  ]
})

exports.app = app

exports.procedures = procedures
