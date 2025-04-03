import { Component, Element, h, State } from '@stencil/core';

@Component({
  tag: 'mvx-children',
})
export class Children {
  @Element() host: HTMLElement;
  @State() childElements: Element[] = [];

  private childParentRef: HTMLDivElement;

  componentWillLoad() {
    this.childElements = [...this.host.children];
    this.host.innerHTML = '';
  }

  componentDidLoad() {
    this.initializeChild(this.childParentRef, this.childElements);
  }

  private initializeChild(container: HTMLElement, children: Element[]) {
    if (!container) {
      return;
    }

    children.forEach(childElement => {
      container.appendChild(childElement);
    });
  }

  render() {
    return <div class="children" ref={element => (this.childParentRef = element)} />;
  }
}
