import { Component, h, Prop } from "@stencil/core";
import { Theme } from "@webpress/core";

@Component({
  tag: "bhaa-heart-herald",
  styleUrl: "bhaa-heart-herald.scss",
})
export class BHAAHeartHerald {
  @Prop() theme: Theme;

  render() {
    return [
      <img src={this.theme.definition.dir + "/assets/heart.svg"} />,
      <img src={this.theme.definition.dir + "/assets/newspaper.svg"} />,
    ];
  }
}
