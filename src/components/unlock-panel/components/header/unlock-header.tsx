import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';

@Component({
  tag: 'unlock-header',
  styleUrl: 'unlock-header.scss',
  shadow: true,
})
export class UnlockHeader {
  @Prop() text: string;
  @Prop() backIcon?: IconDefinition;
  @Prop() closeIcon: IconDefinition = faTimes;

  @Event() back: EventEmitter<void>;
  @Event() close: EventEmitter<void>;

  handleBack = () => {
    this.back.emit();
  };

  handleClose = () => {
    this.close.emit();
  };

  render() {
    return (
      <div class={'header'}>
        {this.backIcon && (
          <button class="icon-button" onClick={this.handleBack}>
            <fa-icon icon={this.backIcon} />
          </button>
        )}
        <span class="title">{this.text}</span>
        <button class="icon-button" onClick={this.handleClose}>
          <fa-icon icon={this.closeIcon} />
        </button>
      </div>
    );
  }
}
