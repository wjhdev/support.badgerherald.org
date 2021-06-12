import { Component, h, Prop,State  } from '@stencil/core';
import { Query, Single } from '@webpress/core';

@Component({
  tag: 'bhaa-front-page',
  styleUrl: 'bhaa-front-page.scss',
})
export class BhaaFrontPage {
  @Prop() query: Query<Single> 
  @State() post: Single

  async componentWillUpdate() {
    if(!this.post) {
      this.post = await this.query.result
    }
  }

  render() {
    if(!this.post) {
      return
    }
    return (
      <bhaa-wrapper class="welcome">
        <wp-title class="left absolute" post={this.post}></wp-title>
        <wp-running-copy class="right margin" post={this.post}></wp-running-copy>
      </bhaa-wrapper>
    )
  }
}
