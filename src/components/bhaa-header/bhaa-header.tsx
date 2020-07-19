import { Component, h, Prop, State } from '@stencil/core'
import { Theme, Menu, TemplateQuery } from '@webpress/core'
import '@webpress/tags'

@Component({
  tag: 'bhaa-header',
  styleUrl: 'bhaa-header.scss',
})
export class BHAAHeader {
  @Prop() theme : Theme
  @State() mainMenu : Menu

  @Prop() query : TemplateQuery

  async componentWillRender() {
    try {
    if(!this.mainMenu && this.theme) {
      this.mainMenu = await this.theme.getMenu('main')
    } }catch(e) {
      console.log(e)
    }
  
  }
  
  render() {
    return (
      <header>
        <h2>Badger Herald Alumni Association</h2>
        <h1>Supporting the Herald Experiment</h1>
        <bhaa-heart-herald theme={this.theme} />
        <wp-menu menu={this.mainMenu} query={this.query} options={ {classForMenuItem: (item) => item.title === "Donate" ? "donate" : ""} }></wp-menu>
      </header>
    )
  }
}
