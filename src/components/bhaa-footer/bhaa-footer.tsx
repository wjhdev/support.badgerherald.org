import { Component, h, Prop, State } from '@stencil/core'
import { Theme, Menu, TemplateQuery } from '@webpress/core'
import '@webpress/tags'

@Component({
  tag: 'bhaa-footer',
  styleUrl: 'bhaa-footer.scss',
})
export class BHAAHeader {
  @Prop() theme : Theme
  @State() mainMenu : Menu

  @Prop() query : TemplateQuery

  
  render() {
    return (
      <div>
        <bhaa-heart-herald theme={this.theme} />
        © Copyright 2020 · Powered by WordPress
      </div>
    )
  }
}
