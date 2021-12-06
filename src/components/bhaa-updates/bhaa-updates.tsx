import { Component, h, Prop, Listen, State } from '@stencil/core'
import { Query, Single } from '@webpress/core'

@Component({
  tag: 'bhaa-updates',
  styleUrl: 'bhaa-updates.scss',
})
export class BHAAUpdates {
  @Prop() query: Query<Single>

  @State() mobile: boolean = false

  private posts: Single[]

  async componentWillRender() {
    if (!this.query) {
      return
    }
    this.posts = await this.query.results
  }

  @Listen('breakpointChanged', { target: 'window' })
  breakpointChanged(event: CustomEvent<number>) {
    this.mobile = event.detail === 1
  }

  renderSidebar() {
    return
  }

  render() {
    if (!this.posts) {
      return
    }
    return (
      <bhaa-wrapper>
        {this.renderSidebar()}
        <ol class="posts center right">
          {this.posts.map(post => (
            <li>
              <wp-title post={post} permalink={true}></wp-title>
              <bhaa-expanding-copy post={post}></bhaa-expanding-copy>
            </li>
          ))}
        </ol>
      </bhaa-wrapper>
    )
  }
}
