import { Component, h } from "@stencil/core";

@Component({
  tag: "bhaa-main-section",
  styleUrl: "bhaa-main-section.scss",
})
export class BhaaMainSection {
  render() {
    return <slot />
  }
}
