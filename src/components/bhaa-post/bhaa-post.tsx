import { Component, h, Prop, State } from '@stencil/core'
import { Query, Post, QueryContextual, Media, Author } from '@webpress/core'
import '@webpress/theme'

@Component({
  tag: 'bhaa-post',
  styleUrl: 'bhaa-post.scss',
})
export class BhaaPost implements QueryContextual {
  @Prop() query: Query<Post>
  @State() post: Post
  @State() feature: Media
  @State() author: Author

  async componentWillRender() {
    if (!this.query) {
      return
    }

    this.post = await this.query.result
    this.feature = await this.post.featuredMedia
    this.author = await this.post.author
  }

  render() {
    if (!this.query) {
      return
    }
    return (
      <bhaa-main-section>
        <bhaa-post-breadcrumbs post={this.post} title="Updates" />
        <span class="meta">
          Published by <wp-author author={this.author} /> on{' '}
          <wp-date post={this.post} />
        </span>
        <wp-title post={this.post} />
        <wp-media media={this.feature} class="feature-image" />
        <wp-running-copy post={this.post}></wp-running-copy>
        <div style={{ clear: 'both' }} />
      </bhaa-main-section>
    )
  }
}
