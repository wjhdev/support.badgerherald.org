import { Component,  h, Prop } from '@stencil/core';
import { Theme, TemplateQuery, TemplateType, TemplateSingleType, TemplateFrontPageType } from '@webpress/core'

@Component({
  tag: 'bhaa-root',
  styleUrl: 'bhaa-root.scss',
})
export class BadgerHeraldAlumniAssociation {

  @Prop() theme : Theme
  @Prop() query : TemplateQuery

  render() {
    return (
      [<bhaa-header theme={this.theme} query={this.query}></bhaa-header>,
      <wp-router query={this.query}>
        <wp-template args={ { type : TemplateType.FrontPage, frontPageType: TemplateFrontPageType.Page  } } component="bhaa-front-page"></wp-template>
        <wp-template args={ { 
          type : TemplateType.Single
        } } component="bhaa-post"></wp-template>
        <wp-template args={ { 
          type : TemplateType.Single,
          singleType: TemplateSingleType.Page 
        } }  component="bhaa-page"></wp-template>
        <wp-template args={ { type : TemplateType.PageNotFound} }  component="bhaa-404"></wp-template>
        <wp-template args={ { type : TemplateType.Blog} }  component="bhaa-updates"></wp-template>
      </wp-router>,
      <bhaa-footer theme={this.theme} />
      ]
    )
  }
}
