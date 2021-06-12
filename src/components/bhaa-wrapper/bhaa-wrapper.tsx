import { Component, h, Listen, EventEmitter, Event } from '@stencil/core';
import '@webpress/theme'

@Component({
  tag: 'bhaa-wrapper',
  styleUrl: 'bhaa-wrapper.scss',
})
export class BHAAWrapper {

  @Event({
    eventName: 'breakpointChanged',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) breakpointEvent: EventEmitter<number>;

  ref : HTMLElement

  @Listen('resize', { target : 'window'})
  updateBreakpoint() {
    if(!this.ref) {
      return
    }
    if(window.innerWidth < 800) {
      this.breakpointEvent.emit(1)
    } else {
      this.breakpointEvent.emit(2)
    }
    this.ref.classList
  }
  
  render() {
    return <div ref={ref => this.ref = ref} class="wrapper"><slot /><div class="clearfix" /></div>
  }

  componentDidRender() {
    this.updateBreakpoint()
  }
}
