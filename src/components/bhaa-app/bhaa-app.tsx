import { Component, h, Prop } from "@stencil/core";
import { Theme, Template, Menu } from "@webpress/core";

@Component({
  tag: "bhaa-app",
  styleUrl: "bhaa-app.scss",
})
export class BadgerHeraldAlumniAssociation {
  @Prop() theme: Theme;
  @Prop() query: Template.Query;
  @Prop() menu: Menu

  async componentWillRender() {
    if (!this.menu && this.theme) {
      this.menu = await this.theme.getMenu("main").result;
    }
    console.log(this.menu);
  }

  render() {
    if (!this.menu) {}
    return [
      <bhaa-header theme={this.theme} query={this.query}></bhaa-header>,
      <main>
        <wp-router query={this.query}>
        <wp-template
          definition={{
            type: Template.TemplateType.FrontPage,
            frontPageType: Template.FrontPageType.Page,
          }}
          component="bhaa-main"
        />
        <wp-template
          definition={{
            type: Template.TemplateType.Single,
            frontPageType: Template.FrontPageType.Page,
            slug: "store"
          }}
          component="bhaa-main"
        />
        <wp-template
          definition={{
            type: Template.TemplateType.Single,
            singleType: Template.SingleType.Post,
          }}
          component="bhaa-post"
        />
        <wp-template
          definition={{
            type: Template.TemplateType.Single,
            singleType: Template.SingleType.Page,
          }}
          component="bhaa-page"
          />
        <wp-template
          definition={{ type: Template.TemplateType.PageNotFound }}
          component="bhaa-404"
          />
        <wp-template
          definition={{ type: Template.TemplateType.Blog }}
          component="bhaa-main"
          />
      </wp-router>
      
      

      </main>,
      <bhaa-footer theme={this.theme} />,
      <bhaa-sticker />

    ];
  }
}
