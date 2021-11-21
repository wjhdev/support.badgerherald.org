import { Component, h } from '@stencil/core'

declare const ShopifyBuy

@Component({
  tag: 'bhaa-qzip',
})
export class Thing {
  private scriptURL =
    'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js'

  private client: ShopifyBuy.Client

  render() {
    return <div id="product-component-1635619604428"></div>
  }

  loadScript() {
    var script = document.createElement('script')
    script.async = true
    script.src = this.scriptURL
    ;(
      document.getElementsByTagName('head')[0] ||
      document.getElementsByTagName('body')[0]
    ).appendChild(script)
    script.onload = this.shopifyBuyInit
  }

  componentDidLoad() {
    let anyWindow = window as any
    if (anyWindow.ShopifyBuy) {
      if (anyWindow.ShopifyBuy.UI) {
        this.shopifyBuyInit()
      } else {
        this.loadScript()
      }
    } else {
      this.loadScript()
    }
  }

  shopifyBuyInit() {
    this.client = ShopifyBuy.buildClient({
      domain: 'store.badgerherald.org',
      storefrontAccessToken: '646756802c54f105cdf0f9958ba72969',
    })
    ShopifyBuy.UI.onReady(this.client).then(function (ui) {
      ui.createComponent('product', {
        id: '6599592181921',
        node: document.getElementById('product-component-1635619604428'),
        moneyFormat: '${{ amount_no_decimals }}',
        options: {
          product: {
            /* iframe: false, */
            styles: {
              product: {
                '@media (min-width: 400px)': {
                  'max-width': '100%',
                  'margin-left': '0',
                  'margin-bottom': '0',
                },
              },
              button: {
                'font-family': 'Roboto, sans-serif',
                'font-weight': '600',
                'font-size': '16pt',
                'line-height': '18pt',
                'padding-top': '9pt',
                'padding-bottom': '7pt',
                ':hover': {
                  'background-color': '#1f93bd',
                },
                'background-color': 'black',
                ':focus': {
                  'background-color': '#1f93bd',
                },
                'border-radius': '4px',
                'text-align': 'center',
                'width': '100%',
              },
              price: {
                'font-size': '24px',
                'color': 'black',
                'font-weight': 'bold',
              },
              compareAt: {
                'font-size': '15.299999999999999px',
              },
              unitPrice: {
                'font-size': '15.299999999999999px',
              },
            },
            layout: 'horizontal',
            contents: {
              img: true,
              title: false,
              price: true,
            },
            text: {
              button: 'Add to cart',
            },
            googleFonts: ['Roboto:wght@900'],
          },
          productSet: {
            styles: {
              products: {
                '@media (min-width: 401px)': {
                  'margin-left': '-20px',
                },
              },
            },
          },
          modalProduct: {
            contents: {
              img: false,
              imgWithCarousel: true,
              button: false,
              buttonWithQuantity: true,
            },
            styles: {
              product: {
                '@media (min-width: 400px)': {
                  'max-width': '100%',
                  'margin-left': '0px',
                  'margin-bottom': '0px',
                },
              },
              button: {
                'font-family': 'Arvo, serif',
                'font-weight': 'bold',
                'font-size': '17px',
                'padding-top': '16.5px',
                'padding-bottom': '16.5px',
                ':hover': {
                  'background-color': '#1f93bd',
                },
                'background-color': '#22a3d2',
                ':focus': {
                  'background-color': '#1f93bd',
                },
                'border-radius': '4px',
                'padding-left': '89px',
                'padding-right': '89px',
              },
              quantityInput: {
                'font-size': '17px',
                'padding-top': '16.5px',
                'padding-bottom': '16.5px',
              },
            },
            googleFonts: ['Arvo'],
            text: {
              button: 'Add to cart',
            },
          },
          option: {
            styles: {
              label: {
                'font-size': '16pt',
                'font-family': 'Roboto, sans-serif',
                'font-weight': '900',
              },
              select: {
                'font-size': '16pt',
                'font-family': 'Roboto, sans-serif',
                'font-weight': '900',
              },
            },
          },
          cart: {
            styles: {
              button: {
                'font-family': 'Roboto, serif',
                'font-weight': '900',
                'font-size': '22px',
                'padding-top': '14px',
                'padding-bottom': '14px',
                ':hover': {
                  'background-color': '#1f93bd',
                },
                'background-color': '#22a3d2',
                ':focus': {
                  'background-color': '#1f93bd',
                },
                'border-radius': '4px',
              },
              title: {
                'font-family': 'Roboto, serif',
                'font-weight': '900',
                'font-size': '22px',
                'color': 'black',
              },
              notice: {
                'font-family': 'Roboto, serif',
                'font-weight': '900',
                'font-size': '14px',
                'color': 'darkgrey',
              },
              footer: {
                'font-family': 'Roboto, serif',
                'font-weight': '900',
                'font-size': '20px',
                'color': 'black',
              },
              lineItem: {},
            },
            text: {
              total: 'Total',
              button: 'Checkout',
              notice:
                'Herald Staff & Contributors: Check Slack for discount codes. Code can be applied at checkout. All discounted apparel will be delivered to the Office.',
            },
            popup: false,
            googleFonts: ['Roboto:wght@900'],
          },
          lineItem: {
            googleFonts: ['Roboto:wght@900'],
            styles: {
              itemTitle: {
                'font-family': 'Roboto, serif',
                'font-weight': '900',
                'font-size': '20px',
                'color': 'black',
              },
              price: {
                'font-family': 'Roboto, serif',
                'font-weight': '900',
                'font-size': '20px',
                'color': 'black',
              },
              variantTitle: {
                'font-family': 'Roboto, serif',
                'font-weight': '900',
                'font-size': '16px',
                'color': 'black',
              },
            },
          },
          toggle: {
            iframe: false,
            text: { title: 'Cart' },
            content: {
              count: true,
              icon: true,
              title: true,
            },
          },
        },
      })
    })
  }
}
