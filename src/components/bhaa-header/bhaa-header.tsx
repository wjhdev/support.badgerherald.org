import { Component, h, Prop, State } from "@stencil/core";
import { Theme, Menu, Template } from "@webpress/core";
import "@webpress/theme";

@Component({
  tag: "bhaa-header",
  styleUrl: "bhaa-header.scss",
})
export class BHAAHeader {
  @Prop() theme: Theme;
  @State() menu: Menu;  
  @State() toggle: boolean
  @Prop() query: Template.Query;

  async componentWillRender() {
    if (!this.menu && this.theme) {
      this.menu = await this.theme.getMenu("main").result;
    }
    console.log(this.menu);
  }
  toggleMobileMenu() {
    this.toggle = !this.toggle
  }

  render() {
    return (
      <header>
        <bhaa-heart-herald theme={this.theme} />
        <h1>Badger Herald <br />
        Alumni Association</h1>
        <a href="#" onClick={_ => this.toggleMobileMenu()} class={this.toggle ? "toggle toggled" : "toggle"}>{this.toggle ? "Hide" : "Menu"}</a>
        <wp-menu
          query={this.theme.getMenu("main")}
          options={{
            classForMenuItem: (item) =>
              item.title === "Donate" ? "donate" : "",
            domForItem: null,
          }}
        ></wp-menu>
      </header>
    );
  }
}
