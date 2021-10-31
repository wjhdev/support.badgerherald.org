import { Component, h, Prop, State } from "@stencil/core";
import { Query, Single, Post, Page, PageQueryArgs } from "@webpress/core";

@Component({
  tag: "bhaa-main-section",
  styleUrl: "bhaa-main-section.scss",
})
export class BhaaMainSection {
  render() {
    return <slot />
  }
}
