import { Component, h, Prop, State } from '@stencil/core'
import { Query, Page, Author } from '@webpress/core'

@Component({
  tag: 'bhaa-page',
  styleUrl: 'bhaa-page.scss',
})
export class BhaaPage {
  @Prop() query: Query<Page>
  @State() page: Page
  @State() author: Author

  async componentWillRender() {
    if (!this.query) {
      return
    }

    this.page = await this.query.result
  }

  render() {
    if (!this.page) {
      return
    }
    if (this.page.title == 'Donate') {
      return <bhaa-donate post={this.page}></bhaa-donate>
    }
    return (
      <bhaa-main-section>
        <bhaa-post-breadcrumbs post={this.page} title="Updates" />
        <span class="meta">
          Published <wp-date post={this.page} />
          {this.page.modified.getTime() > this.page.date.getTime()
            ? ['. Last Updated ', <wp-modified post={this.page} />]
            : ''}
        </span>
        <wp-title post={this.page} />
        <wp-running-copy post={this.page}></wp-running-copy>
        <div style={{ clear: 'both' }} />
      </bhaa-main-section>
    )
  }
}
