import { Component, h, Host, Prop, State } from '@stencil/core'
import { Theme, Menu } from '@webpress/core'
import '@webpress/theme'

@Component({
  tag: 'bhaa-menu',
  styleUrl: 'bhaa-menu.scss',
})
export class BHAAMenu {
  @Prop() theme: Theme
  @State() menu: Menu
  @State() toggle: boolean
  @State() hasBeenToggled: boolean

  toggleMobileMenu(event: Event) {
    event.preventDefault()
    this.toggle = !this.toggle
    this.hasBeenToggled = true
  }

  get toggleClass() {
    if (!this.hasBeenToggled) {
      return ''
    }
    if (this.toggle === true) {
      return ' toggled'
    }
    if (this.toggle === false) {
      return ' toggled-off'
    }
  }

  render() {
    return (
      <Host class={'nav-menu' + this.toggleClass}>
        <a
          href="#"
          onClick={event => this.toggleMobileMenu(event)}
          class={'toggle' + this.toggleClass}
        >
          {this.toggle ? 'Close' : 'Menu'}
        </a>
        <wp-menu
          class={'toggleable' + this.toggleClass}
          query={this.theme.getMenu('main')}
          options={{
            classForMenuItem: item => (item.title === 'Donate' ? 'donate' : ''),
            domForItem: null,
          }}
        />
      </Host>
    )
  }
}
