import { Component, h, Prop, State } from '@stencil/core'
import { Theme, Menu, Template } from '@webpress/core'
import '@webpress/theme'

@Component({
  tag: 'bhaa-footer',
  styleUrl: 'bhaa-footer.scss',
})
export class BHAAHeader {
  @Prop() theme : Theme
  @State() mainMenu : Menu

  @Prop() query : Template.Query

  
  render() {
    return (
      <div>
        <bhaa-heart-herald theme={this.theme} />
        © Copyright 2020 · Powered by WordPress
      </div>
    )
  }
}
