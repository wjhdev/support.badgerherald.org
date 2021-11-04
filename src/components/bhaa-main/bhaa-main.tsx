import { Component, h, Prop, State } from "@stencil/core";
import { Query, Single, Post, Page, PageQueryArgs } from "@webpress/core";

@Component({
  tag: "bhaa-main",
  styleUrl: "bhaa-main.scss",
})
export class BhaaMain {
  @Prop() query: Query<Single>;

  @State() about: Single;
  @State() updates: Page;
  @State() posts: Post[];
  @State() newsletter: Page;
  @State() store: Page;


  async componentWillUpdate() {
    if (!this.about) {
      this.about = (
        await this.query.connection.request(
          new PageQueryArgs({
            slug: "about",
          })
        )
      )[0];
      console.log("about!", this.about);
      this.store = (
        await this.query.connection.request(
          new PageQueryArgs({
            slug: "store",
          })
        )
      )[0];
      this.updates = (
        await this.query.connection.request(
          new PageQueryArgs({
            slug: "updates",
          })
        )
      )[0];
      this.posts = await new Query<Post>(
        this.query.connection,
        Post.QueryArgs({})
      ).results;
      this.newsletter = (
        await this.query.connection.request(
          new PageQueryArgs({
            slug: "newsletter",
          })
        )
      )[0];
    }
  }

  render() {
    if (!this.about) {
      return;
    }

    return [
      <bhaa-main-section>
        <bhaa-top-buffer></bhaa-top-buffer>
        <h1 class="main">
          Supporting the
          <br /> <span class="experiment">Herald Experiment</span>
        </h1>
      </bhaa-main-section>,
      <bhaa-main-section>
        <wp-title class="left absolute" post={this.about} el="h3" />
        <wp-running-copy class="right margin" post={this.about} />
      </bhaa-main-section>,
      <bhaa-main-section class="updates">
        <wp-title class="left absolute" post={this.updates} />
        {this.posts.map((post, index) => {
          if(index > 1) {
            return
          }
          return (
            <div>
              <wp-link object={post}><wp-title class="left absolute" post={post} el="h3" /></wp-link>
              <wp-date class="left absolute" post={post} />
            </div>
          );
        })}
      </bhaa-main-section>,
      <bhaa-main-section>
        <wp-title class="left absolute" post={this.newsletter} />
        <wp-running-copy class="right margin" post={this.newsletter} />
      </bhaa-main-section>,
      <bhaa-main-section>
        <wp-title class="left absolute" post={this.store} />
        <wp-running-copy class="right margin" post={this.store} />
        <bhaa-qzip />
      </bhaa-main-section>,
    ];
  }
}
