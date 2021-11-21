import { Component, h, Prop, State } from '@stencil/core'
import { Query, Single, Post, Page, PageQueryArgs } from '@webpress/core'

@Component({
  tag: 'bhaa-main',
  styleUrl: 'bhaa-main.scss',
})
export class BhaaMain {
  @Prop() query: Query<Single>
  @Prop() slug: String

  @State() about: Single
  @State() updates: Page
  @State() posts: Post[]
  @State() newsletter: Page
  @State() store: Page

  updateEl: HTMLElement
  storeEl: HTMLElement
  newsletterEl: HTMLElement

  async componentDidLoad() {
    if (!this.query) {
      return
    }
    if (!this.about) {
      this.about = (
        await this.query.connection.request(
          new PageQueryArgs({
            slug: 'about',
          }),
        )
      )[0]
      this.store = (
        await this.query.connection.request(
          new PageQueryArgs({
            slug: 'store',
          }),
        )
      )[0]
      this.updates = (
        await this.query.connection.request(
          new PageQueryArgs({
            slug: 'updates',
          }),
        )
      )[0]
      this.newsletter = (
        await this.query.connection.request(
          new PageQueryArgs({
            slug: 'newsletter',
          }),
        )
      )[0]
      this.posts = await new Query<Post>(
        this.query.connection,
        Post.QueryArgs({}),
      ).results
      this.newsletter = (
        await this.query.connection.request(
          new PageQueryArgs({
            slug: 'newsletter',
          }),
        )
      )[0]
    }
  }

  render() {
    console.log('SLUGGGG', this.slug)
    console.log('Rendering bhaa-main', this.query)
    if (!this.about) {
      return
    }

    return [
      <bhaa-main-section>
        <bhaa-top-buffer></bhaa-top-buffer>
        <h1 class="main">
          Supporting the
          <br /> <span class="experiment">Herald Experiment</span>
        </h1>
        <br /> <br />
        <wp-title class="left absolute" post={this.about} el="h3" />
        <wp-running-copy class="right margin" post={this.about} />
      </bhaa-main-section>,
      <bhaa-main-section ref={el => (this.updateEl = el)} class="updates">
        <wp-title class="left absolute" post={this.updates} />
        {this.posts
          ? this.posts.map((post, index) => {
              if (index > 1) {
                return
              }
              return (
                <div>
                  <wp-link object={post}>
                    <wp-title class="left absolute" post={post} el="h3" />
                  </wp-link>
                  <wp-date class="left absolute" post={post} />
                </div>
              )
            })
          : ''}
      </bhaa-main-section>,
      <bhaa-main-section>
        <wp-title
          class="left absolute"
          ref={el => (this.newsletterEl = el)}
          post={this.newsletter}
          el="h1"
        />
        <wp-running-copy class="right margin" post={this.newsletter} />
      </bhaa-main-section>,
      <bhaa-main-section ref={el => (this.storeEl = el)}>
        <wp-title class="left absolute" post={this.store} el="h1" />
        <wp-running-copy class="right margin" post={this.store} />
        <bhaa-qzip />
      </bhaa-main-section>,
    ]
  }

  componentDidRender() {
    if (this.slug == 'store') {
      window.scrollTo(0, this.storeEl.offsetTop)
    }
    if (this.slug == 'updates') {
      window.scrollTo(0, this.updateEl.offsetTop)
    }
    if (this.slug == 'newsletter') {
      window.scrollTo(0, this.newsletterEl.offsetTop)
    }
  }
}
