import { Component, h, Prop, State } from '@stencil/core'
import { Theme, Template, Query } from '@webpress/core'
import '@webpress/theme'

@Component({
  tag: 'bhaa-header',
  styleUrl: 'bhaa-header.scss',
})
export class BHAAHeader {
  @Prop() theme: Theme
  @Prop() query: Query<Template>
  @State() toggle: boolean
  @State() hasBeenToggled: boolean

  toggleMobileMenu(event: Event) {
    event.preventDefault()
    this.toggle = !this.toggle
    this.hasBeenToggled = true
  }

  get mobileToggleClasses() {
    if (!this.hasBeenToggled) {
      return 'mobile-menu'
    }
    if (this.toggle === true) {
      return 'mobile-menu toggled'
    }
    if (this.toggle === false) {
      return 'mobile-menu toggled-off'
    }
  }

  render() {
    return (
      <header>
        <h1>
          Badger Herald <br />
          Alumni Association
        </h1>
        <div class={this.mobileToggleClasses}>
          <bhaa-heart-herald theme={this.theme} />
          <a
            href="#"
            onClick={event => this.toggleMobileMenu(event)}
            class="toggle"
          >
            {this.toggle ? 'Close' : 'Menu'}
          </a>
          <bhaa-menu theme={this.theme} />
        </div>
      </header>
    )
  }
}
