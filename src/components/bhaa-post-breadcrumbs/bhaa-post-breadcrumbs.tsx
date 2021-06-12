import { Component, h, Prop } from "@stencil/core";
import { Post } from "@webpress/core";
import "@webpress/theme";

@Component({
  tag: "bhaa-post-breadcrumbs",
  styleUrl: "bhaa-post-breadcrumbs.scss",
})
export class BhaaPostBreadcrumbs {
  @Prop() post: Post;

  render() {
    return (
      <div>
        <wp-link class="back" path="/updates">
          <span class="arrow"></span> Updates
        </wp-link>
      </div>
    );
  }
}
