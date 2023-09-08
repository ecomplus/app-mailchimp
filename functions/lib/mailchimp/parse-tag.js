module.exports = (resourceType, rules) => {
    let configStatus
    switch (resourceType) {
        case 'canceled_order':
            configStatus = 'pedido cancelado'
            break
        case 'open_cart':
            configStatus = 'carrinho aberto'
            break
        case 'closed_cart':
            configStatus = 'carrinho completado'
            break
        case 'open_order':
            configStatus = 'pedido aberto'
            break
        case 'closed_order':
            configStatus = 'pedido pago'
            break
    }
    const bestRule = rules.find(rule => rule.tag_type === configStatus)
    const tagName = bestRule && bestRule.tag_name || null
    return { tagName  }
}