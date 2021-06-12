import { Component,  h, Prop } from '@stencil/core';
import { Single } from '@webpress/core'

@Component({
  tag: 'bhaa-expanding-copy',
  styleUrl: 'bhaa-expanding-copy.scss'
})
export class BHAAExpandingCopy {
  @Prop() post : Single

  @Prop() linkText : string = ""
  
  runningCopy : HTMLElement

  renderContinueLink() {
    return  <wp-link class="keep-reading" object={this.post}>Read <span class="arrow"></span></wp-link>
  }

  render() {
    if(!this.post) {
      return
    }
    return [
      <wp-running-copy ref={ref => this.runningCopy = ref} post={this.post} />,
      <p>...</p>,
      this.renderContinueLink()
    ]
  }

  componentDidRender() {
    if(!this.post) {
      return
    }
    Array.from(this.runningCopy.children).map( (child, index) => {
      if(index == 0) {
        child.classList.add("lede")
      }
      if(index == 1) {
        child.classList.add("nutgraf")
      }
      if(index == 2) {
        child.classList.add("nutnutgraf")
      }
    })

  }


}
