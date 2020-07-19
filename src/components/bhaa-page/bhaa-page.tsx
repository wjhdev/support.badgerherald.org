import { Component, h, Prop, State } from '@stencil/core';
import { Query, Post, Author } from '@webpress/core';

@Component({
  tag: 'bhaa-page',
  styleUrl: 'bhaa-page.scss',
})
export class BhaaPage {
  @Prop() query : Query
  @State() post: Post
  @State() author : Author

  async componentWillRender() {
    if(!this.query) {
      return
    }
    this.post = (await this.query.posts)[0]
  }

  render() {
    if(!this.post) {
      return
    }
    if(this.post.title == "Donate") {
      return <bhaa-donate post={this.post}></bhaa-donate>
    }
    return <bhaa-wrapper>
      <div class="right center">
        <wp-title post={this.post}></wp-title>
        <wp-author author={this.author} />
        <wp-running-copy post={this.post}></wp-running-copy>
        <div style={{"clear": "both"}} />
      </div>
      </bhaa-wrapper>
  }
}
