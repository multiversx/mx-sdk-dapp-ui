import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State, Watch } from '@stencil/core';
import { BigNumber } from 'bignumber.js';

@Component({
  tag: 'mvx-pagination-ellipsis-form',
  styleUrl: 'pagination-ellipsis-form.scss',
  shadow: true,
})
export class PaginationEllipsisForm {
  @State() pageValue: string = '';
  @Event() search: EventEmitter<number>;

  @Prop() maxPageToSearchFor: number;
  @Prop() isVisible: boolean = false;

  constructor() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  private inputElement!: HTMLInputElement;
  private handleKeyDown(event: KeyboardEvent) {
    if (['Equal', 'Minus', 'Period', 'KeyE', 'Comma'].includes(event.code)) {
      event.preventDefault();
      return;
    }
  }

  private handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const valueBigNumber = new BigNumber(input.value);
    const isBelowMax = valueBigNumber.isLessThanOrEqualTo(this.maxPageToSearchFor);

    if (valueBigNumber.isNaN() || isBelowMax) {
      this.pageValue = valueBigNumber.toString();
    }
  }

  private handleSubmit(event: Event) {
    const newPageValue = this.pageValue === '0' ? 1 : parseInt(this.pageValue);

    if (!this.pageValue) {
      return;
    }

    event.preventDefault();
    this.search.emit(newPageValue);
  }

  @Watch('isVisible')
  handleVisibilityChange(newValue: boolean) {
    if (newValue && this.inputElement) {
      this.inputElement.focus();
    }
  }

  render() {
    return (
      <form class="pagination-ellipsis-form" onSubmit={this.handleSubmit} onClick={event => event.stopPropagation()}>
        <label htmlFor="paginationSearch" class="pagination-ellipsis-form-field-label">
          Page
        </label>

        <div class="pagination-ellipsis-form-field">
          <input
            autoFocus
            type="number"
            autoComplete="off"
            id="paginationSearch"
            value={this.pageValue}
            name="paginationSearch"
            onInput={this.handleChange}
            onKeyDown={this.handleKeyDown}
            class="pagination-ellipsis-form-field-input"
            ref={inputElement => (this.inputElement = inputElement)}
          />

          <div class="pagination-ellipsis-form-button" onClick={this.handleSubmit}>
            <mvx-magnifying-glass-icon class="pagination-ellipsis-form-button-icon" />
          </div>
        </div>
      </form>
    );
  }
}
