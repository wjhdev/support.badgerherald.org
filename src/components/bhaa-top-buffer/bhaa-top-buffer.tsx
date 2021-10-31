import { Component, h, Prop, State } from "@stencil/core";
import { Query, Single, Post, Page, PageQueryArgs } from "@webpress/core";

@Component({
  tag: "bhaa-top-buffer",
  styleUrl: "bhaa-top-buffer.scss",
})
export class BhaaTopBuffer {
  render() {
    return <slot />
  }
}
