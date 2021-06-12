import { Component, h, Prop } from "@stencil/core";
import { Theme, Template } from "@webpress/core";

@Component({
  tag: "bhaa-root",
  styleUrl: "bhaa-root.scss",
})
export class BadgerHeraldAlumniAssociation {
  @Prop() theme: Theme;
  @Prop() query: Template.Query;

  render() {
    return [
      <bhaa-header theme={this.theme} query={this.query}></bhaa-header>,
      <wp-router query={this.query}>
        <wp-template
          definition={{
            type: Template.TemplateType.FrontPage,
            frontPageType: Template.FrontPageType.Page,
          }}
          component="bhaa-front-page"
        ></wp-template>
        <wp-template
          definition={{
            type: Template.TemplateType.Single,
          }}
          component="bhaa-post"
        ></wp-template>
        <wp-template
          definition={{
            type: Template.TemplateType.Single,
            singleType: Template.SingleType.Page,
          }}
          component="bhaa-page"
        ></wp-template>
        <wp-template
          definition={{ type: Template.TemplateType.PageNotFound }}
          component="bhaa-404"
        ></wp-template>
        <wp-template
          definition={{ type: Template.TemplateType.Blog }}
          component="bhaa-updates"
        ></wp-template>
      </wp-router>,
      <bhaa-footer theme={this.theme} />,
    ];
  }
}
