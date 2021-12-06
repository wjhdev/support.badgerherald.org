import { Component, h, Prop } from '@stencil/core'
import { Theme, Template } from '@webpress/core'
import '@webpress/router'
import { Hierarchy } from '@webpress/router'

@Component({
  tag: 'bhaa-app',
  styleUrl: 'bhaa-app.scss',
})
export class BadgerHeraldAlumniAssociation {
  @Prop() theme: Theme
  @Prop() query: Template.Query

  render() {
    console.log(this.query.template)
    let hiearchy: Hierarchy.TemplateHierarchy = {
      index: 'bhaa-main',
      frontPage: 'bhaa-main',
      archive: {
        component: 'bhaa-main',
        props: {
          slug: 'updates',
        },
      },
      singular: {
        index: 'bhaa-post',
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
