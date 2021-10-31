import { Component, h } from "@stencil/core";

declare const ShopifyBuy;

@Component({
    tag: "bhaa-qzip"
})
export class Thing {
  private scriptURL =
    "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

  render() {
    return <div id="product-component-1635619604428"></div>;
  }

  loadScript() {
    var script = document.createElement("script");
    script.async = true;
    script.src = this.scriptURL;
    (
      document.getElementsByTagName("head")[0] ||
      document.getElementsByTagName("body")[0]
    ).appendChild(script);
    script.onload = this.shopifyBuyInit;
  }

  componentDidLoad() {
    let anyWindow = window as any;
    if (anyWindow.ShopifyBuy) {
      if (anyWindow.ShopifyBuy.UI) {
        this.shopifyBuyInit();
      } else {
        this.loadScript();
      }
    } else {
      this.loadScript();
    }
  }

  shopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: "store.badgerherald.org",
      storefrontAccessToken: "646756802c54f105cdf0f9958ba72969",
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent("product", {
        id: "6599592181921",
        node: document.getElementById("product-component-1635619604428"),
        moneyFormat: "%24%7B%7Bamount%7D%7D",
        options: {
          product: {
            styles: {
              product: {
                "@media (min-width: 601px)": {
                  "max-width": "100%",
                  "margin-left": "0",
                  "margin-bottom": "0",
                },
              },
              button: {
                "font-family": "Arvo, serif",
                "font-weight": "bold",
                "font-size": "17px",
                "padding-top": "16.5px",
                "padding-bottom": "16.5px",
                ":hover": {
                  "background-color": "#1f93bd",
                },
                "background-color": "#22a3d2",
                ":focus": {
                  "background-color": "#1f93bd",
                },
                "border-radius": "4px",
                "padding-left": "89px",
                "padding-right": "89px",
              },
              quantityInput: {
                "font-size": "17px",
                "padding-top": "16.5px",
                "padding-bottom": "16.5px",
              },
              price: {
                "font-size": "18px"
              },
              compareAt: {
                "font-size": "15.299999999999999px"
              },
              unitPrice: {
                "font-size": "15.299999999999999px"
              }
            },
            layout: "horizontal",
            contents: {
              img: true,
              title: true,
              price: true,
            },
            text: {
              button: "Add to cart",
            },
            googleFonts: ["Arvo"],
          },
          productSet: {
            styles: {
              products: {
                "@media (min-width: 601px)": {
                  "margin-left": "-20px",
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
                "@media (min-width: 601px)": {
                  "max-width": "100%",
                  "margin-left": "0px",
                  "margin-bottom": "0px",
                },
              },
              button: {
                "font-family": "Arvo, serif",
                "font-weight": "bold",
                "font-size": "17px",
                "padding-top": "16.5px",
                "padding-bottom": "16.5px",
                ":hover": {
                  "background-color": "#1f93bd",
                },
                "background-color": "#22a3d2",
                ":focus": {
                  "background-color": "#1f93bd",
                },
                "border-radius": "4px",
                "padding-left": "89px",
                "padding-right": "89px",
              },
              quantityInput: {
                "font-size": "17px",
                "padding-top": "16.5px",
                "padding-bottom": "16.5px",
              },
            },
            googleFonts: ["Arvo"],
            text: {
              button: "Add to cart",
            },
          },
          option: {
            styles: {
              label: {
                "font-family": "Gill Sans, sans-serif",
              },
              select: {
                "font-family": "Gill Sans, sans-serif",
              },
            },
          },
          cart: {
            styles: {
              button: {
                "font-family": "Arvo, serif",
                "font-weight": "bold",
                "font-size": "17px",
                "padding-top": "16.5px",
                "padding-bottom": "16.5px",
                ":hover": {
                  "background-color": "#1f93bd",
                },
                "background-color": "#22a3d2",
                ":focus": {
                  "background-color": "#1f93bd",
                },
                "border-radius": "4px",
              },
            },
            text: {
              total: "Subtotal",
              button: "Checkout",
            },
            popup: false,
            googleFonts: ["Arvo"],
          },
          toggle: {
            styles: {
              toggle: {
                  "display": "none",
                "font-family": "Arvo, serif",
                "font-weight": "bold",
                "background-color": "#22a3d2",
                ":hover": {
                  "background-color": "#1f93bd",
                },
                ":focus": {
                  "background-color": "#1f93bd",
                },
              },
              count: {
                "font-size": "17px",
              },
            },
            googleFonts: ["Arvo"],
          },
        },
      });
    });
  }
}
