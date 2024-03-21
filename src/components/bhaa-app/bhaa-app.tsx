import { Component, h, Prop } from '@stencil/core'
import { Hierarchy } from '@webpress/router'
import { Theme, Template, Query } from '@webpress/core'
import '@badgerherald/donate'

@Component({
  tag: 'bhaa-app',
  styleUrl: 'bhaa-app.scss',
})
export class BadgerHeraldAlumniAssociation {
  @Prop() theme: Theme
  @Prop() query: Query<Template>

  render() {
    let hiearchy: Hierarchy.TemplateHierarchy = {
      index: {
        component: 'bhaa-main',
      },
      frontPage: {
        component: 'bhaa-main',
      },
      archive: {
        component: 'bhaa-main',
        props: {
          slug: 'updates',
        },
      },
      singular: {
        post: {
          component: 'bhaa-post',
        },
        page: {
          index: {
            component: 'bhaa-page',
          },
          slug: {
            store: {
              component: 'bhaa-main',
              props: {
                slug: 'store',
              },
            },
            newsletter: {
              component: 'bhaa-main',
              props: {
                slug: 'newsletter',
              },
            },
          },
        },
      },
    }
    return [
      <bhaa-header theme={this.theme} query={this.query}></bhaa-header>,
      <main>
        <wp-router-two query={this.query} hiearchy={hiearchy} />
      </main>,
      <bhaa-footer theme={this.theme} />,
      <bhaa-sticker />,
    ]
  }
}
