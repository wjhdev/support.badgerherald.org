import { Component, h, Host } from '@stencil/core'

@Component({
  tag: 'bhaa-loading-spinner',
  styleUrl: 'bhaa-loading-spinner.scss',
})
export class BHAALoadingSpinner {
  render() {
    return (
      <Host>
        <div class="dotdotdot">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Host>
    )
  }
}
