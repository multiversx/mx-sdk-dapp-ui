import type { EventEmitter } from '@stencil/core';
import { Component, Element, Event, h, Method, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'mvx-side-panel-swiper',
  styleUrl: 'side-panel-swiper.scss',
  shadow: true,
})
export class SidePanelSwiper {
  @Element() sidePanelSwipeElement!: HTMLElement;

  @Prop() open: boolean = false;
  @Prop() sidePanelIdentifier: string = '';

  @Event() sheetDismiss!: EventEmitter<void>;
  @Event() sheetSnapChange!: EventEmitter<{ index: number; snapPoint: string }>;

  @State() isVisible: boolean = false;
  @State() isDragging: boolean = false;
  @State() currentSnapIndex: number = 1;

  private snapPointsArray: string[] = ['100%'];
  private sheetElement!: HTMLElement;

  private dragState = {
    startY: 0,
    currentY: 0,
    startTransform: 100,
    isAnimating: false,
  };

  componentDidLoad() {
    this.isVisible = this.open;

    if (this.sheetElement && window.innerWidth <= 480) {
      this.sheetElement.style.transform = 'translateY(100%)';
    }

    if (this.open) {
      this.openToSnapPoint(this.currentSnapIndex);
    }
  }

  @Watch('open')
  openChanged(newValue: boolean) {
    if (newValue && !this.isVisible) {
      this.openToSnapPoint(this.currentSnapIndex);
    } else if (!newValue && this.isVisible) {
      this.close();
    }
  }

  @Method()
  async openToSnapPoint(snapIndex: number = 1) {
    if (this.dragState.isAnimating) {
      return;
    }

    this.currentSnapIndex = Math.max(0, Math.min(snapIndex, this.snapPointsArray.length - 1));
    this.isVisible = true;

    await new Promise(resolve => setTimeout(resolve, 50));

    if (this.sheetElement && this.isVisible) {
      this.animateToPosition(this.currentSnapIndex, false);
    }
  }

  @Method()
  async close() {
    if (this.dragState.isAnimating || !this.isVisible) {
      return;
    }

    this.animateToClose();
  }

  private animateToPosition(snapIndex: number, emitEvent: boolean = true) {
    if (!this.sheetElement || this.dragState.isAnimating) {
      return;
    }

    const snapPercent = parseFloat(this.snapPointsArray[snapIndex] || '50');
    const targetY = 100 - snapPercent;

    this.dragState.isAnimating = true;
    this.dragState.startTransform = targetY;

    this.sheetElement.style.transition = 'transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    this.sheetElement.style.transform = `translateY(${targetY}%)`;

    setTimeout(() => {
      this.dragState.isAnimating = false;
      if (emitEvent && this.isVisible) {
        this.sheetSnapChange.emit({
          index: snapIndex,
          snapPoint: this.snapPointsArray[snapIndex],
        });
      }
      this.sheetElement.style.transition = '';
    }, 350);
  }

  private animateToClose() {
    if (!this.sheetElement || this.dragState.isAnimating) {
      return;
    }

    this.dragState.isAnimating = true;
    this.sheetElement.style.transition = 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    this.sheetElement.style.transform = 'translateY(100%)';

    setTimeout(() => {
      this.dragState.isAnimating = false;
      this.isVisible = false;
      this.sheetDismiss.emit();
      this.sheetElement.style.transition = '';
    }, 300);
  }

  private handleDragStart = (e: MouseEvent | TouchEvent) => {
    if (this.dragState.isAnimating) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    this.isDragging = true;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    this.dragState.startY = clientY;
    this.dragState.currentY = clientY;

    // Get current transform
    const transform = this.getCurrentTransform();
    this.dragState.startTransform = transform;

    // Add global event listeners
    document.addEventListener('mousemove', this.handleDragMove, {
      passive: false,
    });
    document.addEventListener('touchmove', this.handleDragMove, {
      passive: false,
    });
    document.addEventListener('mouseup', this.handleDragEnd);
    document.addEventListener('touchend', this.handleDragEnd);
  };

  private handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!this.isDragging || !this.sheetElement || this.dragState.isAnimating) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    this.dragState.currentY = clientY;

    const deltaY = this.dragState.currentY - this.dragState.startY;
    const viewportHeight = window.innerHeight;
    const deltaPercent = (deltaY / viewportHeight) * 100;

    const newTransform = Math.min(100, Math.max(0, this.dragState.startTransform + deltaPercent));

    this.sheetElement.style.transform = `translateY(${newTransform}%)`;
  };

  private handleDragEnd = () => {
    if (!this.isDragging || this.dragState.isAnimating) {
      return;
    }

    this.isDragging = false;

    // Remove global event listeners
    document.removeEventListener('mousemove', this.handleDragMove);
    document.removeEventListener('touchmove', this.handleDragMove);
    document.removeEventListener('mouseup', this.handleDragEnd);
    document.removeEventListener('touchend', this.handleDragEnd);

    const currentTransform = this.getCurrentTransform();
    const velocity = this.dragState.currentY - this.dragState.startY;

    // Close if dragged down significantly or fast downward velocity
    if (currentTransform > 70 || velocity > 150) {
      this.close();
      return;
    }

    // Find closest snap point
    const snapPercentages = this.snapPointsArray.map(point => parseFloat(point));
    let closestIndex = 0;
    let closestDistance = Math.abs(100 - currentTransform - snapPercentages[0]);

    for (let i = 1; i < snapPercentages.length; i++) {
      const distance = Math.abs(100 - currentTransform - snapPercentages[i]);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }

    this.currentSnapIndex = closestIndex;
    this.animateToPosition(closestIndex, true);
  };

  private getCurrentTransform(): number {
    if (!this.sheetElement) {
      return 100;
    }

    const transform = this.sheetElement.style.transform;
    if (transform && transform.includes('translateY')) {
      const match = transform.match(/translateY\(([^)]+)%?\)/);
      if (match) {
        return parseFloat(match[1].replace('%', ''));
      }
    }
    return 100;
  }

  render() {
    return (
      <div class={{ 'side-panel-swiper-wrapper': true, 'visible': this.isVisible, 'hidden': !this.isVisible }}>
        <div
          class="side-panel-swiper"
          ref={el => (this.sheetElement = el!)}
          onClick={(event: MouseEvent) => event.stopPropagation()}
        >
          <div class="side-panel-swiper-handle-wrapper">
            <div
              class="side-panel-swiper-handle-container"
              onMouseDown={this.handleDragStart}
              onTouchStart={this.handleDragStart}
            >
              <div class="side-panel-swiper-handle" />
            </div>
          </div>

          <div class="side-panel-swiper-content">
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
