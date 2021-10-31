import { Component, h, Prop, State } from "@stencil/core";
import { Query, Single, Post, Page, PageQueryArgs } from "@webpress/core";

@Component({
  tag: "bhaa-main",
  styleUrl: "bhaa-main.scss",
})
export class BhaaMain {
  @Prop() query: Query<Single>;

  @State() about: Single;
  @State() updates: Post[];
  @State() newsletter: Page;
  @State() store: Page;

  async componentWillUpdate() {
    if (!this.about) {
      this.about = (await this.query.connection.request(new PageQueryArgs({
        'slug': 'about'
      })))[0]
      console.log("about!", this.about)
      this.store = (await this.query.connection.request(new PageQueryArgs({
        'slug': 'store'
      })))[0]
      this.updates = (await this.query.connection.request(Post.QueryArgs({})))
      this.newsletter = (await this.query.connection.request(new PageQueryArgs({
        'slug': 'newsletter'
      })))[0]
    }
  }

  render() {
    if (!this.about) {
      return;
    }

    return [
      <bhaa-main-section>
        <bhaa-top-buffer>
        </bhaa-top-buffer>
        <h1 class="main">Supporting the<br /> <span class="experiment">Herald Experiment</span></h1>
      </bhaa-main-section>,
        <bhaa-main-section>
          <wp-title class="left absolute" post={this.about} el="h3" />
          <wp-running-copy
            class="right margin"
            post={this.about}
         />
        </bhaa-main-section>,
        <bhaa-main-section>
          <wp-title class="left absolute" post={this.newsletter} />
          <wp-running-copy
            class="right margin"
            post={this.newsletter}
         />
        </bhaa-main-section>,
        <bhaa-main-section>
          <wp-title class="left absolute" post={this.store} />
          <wp-running-copy
            class="right margin"
            post={this.store}
         />
          <bhaa-qzip />
        </bhaa-main-section>
    ]
  }
}
