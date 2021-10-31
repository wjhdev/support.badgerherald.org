import { Component, h, Prop, State } from "@stencil/core";
import { Theme, Menu, Template } from "@webpress/core";
import "@webpress/theme";

@Component({
  tag: "bhaa-sticker",
  styleUrl: "bhaa-sticker.scss",
})
export class BHAASticker {

  render() {
    return <div class="banner">
      <bhaa-top-buffer>
        <h3>Before you leave</h3>
      </bhaa-top-buffer>
      <p>The Badger Herald depended on community support from sustainers, local community advertisers <strong>and alumni like you</strong>!</p>
    <a class="button" href="https://badgerherald.com/donate">
    Donate
  </a>
  </div>
  }
}
