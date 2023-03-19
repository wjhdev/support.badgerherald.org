import { Component, h, Prop } from '@stencil/core'
import { Theme, Template, Query } from '@webpress/core'
import '@webpress/theme'

@Component({
  tag: 'bhaa-header',
  styleUrl: 'bhaa-header.scss',
})
export class BHAAHeader {
  @Prop() theme: Theme
  @Prop() query: Query<Template>

  render() {
    return (
      <header>
        <div class="mobile-fixed">
          <bhaa-heart-herald theme={this.theme} />
          <bhaa-menu theme={this.theme} />
        </div>
        <h1>
          Badger Herald <br />
          Alumni Association
        </h1>
      </header>
    )
  }
}
