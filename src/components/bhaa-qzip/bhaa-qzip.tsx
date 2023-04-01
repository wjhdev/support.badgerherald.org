import { Component, h, Prop, State } from '@stencil/core'
import { Media, Single } from '@webpress/core'
import * as ShopifyBuy from '@shopify/buy-button-js'

@Component({
  tag: 'bhaa-qzip',
  styleUrl: 'bhaa-qzip.scss',
})
export class BhaaQzip {
  private client: ShopifyBuy.Client

  @Prop() post: Single
  @State() image: Media

  componentWillLoad() {
    this.client = ShopifyBuy.buildClient({
      domain: 'store.badgerherald.org',
      storefrontAccessToken: '646756802c54f105cdf0f9958ba72969',
    })
  }
  render() {
    if (this.image) {
      return [
        <wp-media media={this.image} />,
        <div id="product-component-1635619604428" class="button" />,
      ]
    } else {
      return <div id="product-component-1635619604428" class="button" />
    }
  }

  componentDidLoad() {
    this.shopifyBuyInit()
  }

  async componentDidRender() {
    if (this.post != null && this.image == null) {
      this.image = await this.post.featuredMedia
    }
  }

  shopifyBuyInit() {
    let ui = ShopifyBuy.UI.init(this.client)
    ui.createComponent('product', {
      id: '6599592181921',
      node: document.getElementById('product-component-1635619604428'),
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
