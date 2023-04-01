import { Component, h, Prop, State } from '@stencil/core'
import { Theme, Menu, Query } from '@webpress/core'
import '@webpress/theme'

@Component({
  tag: 'bhaa-menu',
  styleUrl: 'bhaa-menu.scss',
})
export class BHAAMenu {
  @Prop() theme: Theme
  @State() menu: Menu

  render() {
    return (
      <wp-menu
        // class={'toggleable' + this.toggleClass}
        query={
          new Query<Menu>(
            this.theme.connection,
            Menu.QueryArgs({
              location: 'main',
            }),
          )
        }
        options={{
          classForMenuItem: item => (item.title === 'Donate' ? 'donate' : ''),
          domForItem: null,
        }}
      />
    )
  }
}
