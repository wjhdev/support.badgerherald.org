import { Component, h, Prop, State } from '@stencil/core'
import { Media, Single } from '@webpress/core'
import * as ShopifyBuy from '@shopify/buy-button-js'

@Component({
  tag: 'bhaa-qzip',
  styleUrl: 'bhaa-qzip.scss',
})
export class BhaaQzip {
  private client: ShopifyBuy.Client
  private ui: ShopifyBuy.UI

  private host = (<div id="product-component-1635619604428" class="button" />)

  @Prop() post: Single
  @State() image: Media

  componentWillLoad() {
    this.client = ShopifyBuy.buildClient({
      domain: 'store.badgerherald.org',
      storefrontAccessToken: '646756802c54f105cdf0f9958ba72969',
    })
    this.ui = ShopifyBuy.UI.init(this.client)
    this.shopifyBuyInit()
  }

  render() {
    if (this.image) {
      return [<wp-media media={this.image} />, this.host]
    } else {
      return this.host
    }
  }

  async componentDidRender() {
    if (this.post != null && this.image == null) {
      this.image = await this.post.featuredMedia
    }
  }

  shopifyBuyInit() {
    this.ui.createComponent('product', {
      id: '6599592181921',
      node: this.host,
      moneyFormat: '${{ amount_no_decimals }}',
      options: {
        product: {
          iframe: false,
          layout: 'vertical',
          contents: {
            img: false,
            title: false,
            price: true,
          },
          text: {
            button: 'Add to cart',
          },
        },
        cart: {
          iframe: true,
          text: {
            total: 'Total',
            button: 'Checkout',
            notice:
              'Herald Staff & Contributors: Check Slack for discount codes. Code can be applied at checkout. All discounted apparel will be delivered to the Office.',
          },
          popup: false,
        },
        lineItem: {},
        toggle: {
          iframe: false,
          text: { title: 'Cart' },
          content: {
            count: true,
            icon: true,
            title: false,
          },
        },
      },
    })
  }
}
