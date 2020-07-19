import { Component, h, Prop, State } from '@stencil/core';
import { Query, Post, QueryContextual, Media, Author } from '@webpress/core';
import '@webpress/tags'

@Component({
  tag: 'bhaa-post',
  styleUrl: 'bhaa-post.scss',
})
export class BhaaPost implements QueryContextual  {
  @Prop() query: Query 
  @State() post: Post
  @State() feature: Media
  @State() author: Author

  async componentWillRender() {
    if(!this.query || this.post) {
      return
    }
    this.post = (await this.query.posts)[0]
    let features = (await this.query.connection.media({id:this.post.featuredMedia}))
    if(features && features.length > 0) {
      this.feature = features[0]
    }
    this.query.connection.authors({id: this.post.author}).then(author => {if(author && author.length > 0) { this.author = author[0] }} )
  }

  render() {
    console.log("feature",this.feature, this.post)
    if(!this.query || !this.post) {
      return
    }
    return [<bhaa-post-breadcrumbs post={this.post} title="Updates" />,<bhaa-wrapper>
      <div class="update right center">
        <wp-title post={this.post} />
        <wp-author author={this.author} />
        <wp-media media={this.feature} class="feature-image" />
        <wp-running-copy post={this.post}></wp-running-copy>
        </div>
        <div style={{"clear": "both"}} />
      </bhaa-wrapper>]
  }
}
