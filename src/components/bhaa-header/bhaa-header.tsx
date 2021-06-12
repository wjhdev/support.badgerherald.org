import { Component, h, Prop, State } from '@stencil/core'
import { Theme, Menu, Template } from '@webpress/core'
import '@webpress/theme'

@Component({
  tag: 'bhaa-header',
  styleUrl: 'bhaa-header.scss',
})
export class BHAAHeader {
  @Prop() theme : Theme
  @State() menu : Menu

  @Prop() query : Template.Query

  async componentWillRender() {
    if (!this.menu && this.theme) {
      this.menu = await this.theme.getMenu('main').result
    }
    console.log(this.menu)
  }
  
  render() {
    return (
      <header>
        <h2>Badger Herald Alumni Association</h2>
        <h1>Supporting the Herald Experiment</h1>
        <bhaa-heart-herald theme={this.theme} />
        <wp-menu query={this.theme.getMenu('main')} options={ {classForMenuItem: (item) => item.title === "Donate" ? "donate" : "", domForItem: null } }></wp-menu>
      </header>
    )
  }
}
