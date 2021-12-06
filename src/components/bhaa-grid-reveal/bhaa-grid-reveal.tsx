import { Component, h } from "@stencil/core";

@Component({
  tag: "bhaa-grid-reveal",
  styleUrl: "bhaa-grid-reveal.scss",
})
export class BhaaMainSection {
  render() {
    return [
    <div class="col col-1" />,
    <div class="col col-2" />,
    <div class="col col-3" />,
    <div class="col col-4" />,
    <div class="col col-5" />,
    <div class="col col-6" />,
    <div class="col col-7" />,
    <div class="col col-8" />,
    <div class="col col-9" />,
    <div class="col col-10" />,
    <div class="col col-11" />,
    <div class="col col-12" />,
    <div class="col col-13" />,
    <div class="col col-14" />,
    <div class="col col-15" />,
    ]
  }
}
