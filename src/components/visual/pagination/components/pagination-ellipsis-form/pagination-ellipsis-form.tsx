import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State, Watch } from '@stencil/core';
import classNames from 'classnames';

const paginationEllipsisFormClasses: Record<string, string> = {
  buttonIcon: 'mvx:p-[10px] mvx:hover:!fill-teal-400',
};

@Component({
  tag: 'mvx-pagination-ellipsis-form',
  styleUrl: 'pagination-ellipsis-form.scss',
  shadow: true,
})
export class PaginationEllipsisForm {
  @State() pageValue: string = '';
  @Event({ bubbles: false, composed: false }) search: EventEmitter<number>;

  @Prop() maxPageToSearchFor: number;
  @Prop() isVisible: boolean = false;

  constructor() {
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleInputReference = this.handleInputReference.bind(this);
  }

  private inputElement!: HTMLInputElement;
  private handleInputReference(inputElement: HTMLInputElement) {
    this.inputElement = inputElement;
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      event.preventDefault();
      this.handleSubmit(event);
    }

    if (['Equal', 'Minus', 'Period', 'KeyE', 'Comma'].includes(event.code)) {
      event.preventDefault();
      return;
    }
  }

  private handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const isBelowMax = parseFloat(input.value) <= this.maxPageToSearchFor;

    if (isBelowMax) {
      this.pageValue = input.value;
    } else {
      input.value = this.pageValue;
    }
  }

  private handleSubmit(event: Event) {
    if (!this.pageValue) {
      return;
    }

    event.preventDefault();
    this.search.emit(parseInt(this.pageValue === '0' ? '1' : this.pageValue));
  }

  @Watch('isVisible')
  handleVisibilityChange(newValue: boolean) {
    if (newValue && this.inputElement) {
      this.inputElement.focus();
    }
  }

  render() {
    return (
      <div class="pagination-ellipsis-form" onClick={(event: MouseEvent) => event.stopPropagation()}>
        <label htmlFor="paginationSearch" class="pagination-ellipsis-form-field-label">
          Page
        </label>

        <div class="pagination-ellipsis-form-field">
          <input
            type="number"
            autoFocus={true}
            autoComplete="off"
            id="paginationSearch"
            value={this.pageValue}
            name="paginationSearch"
            onInput={this.handleInput}
            max={this.maxPageToSearchFor}
            onKeyDown={this.handleKeyDown}
            ref={this.handleInputReference}
            class="pagination-ellipsis-form-field-input"
          />

          <div class="pagination-ellipsis-form-button" onClick={this.handleSubmit}>
            <mvx-magnifying-glass-icon
              class={classNames('pagination-ellipsis-form-button-icon', paginationEllipsisFormClasses.buttonIcon)}
            />
          </div>
        </div>
      </div>
    );
  }
}
