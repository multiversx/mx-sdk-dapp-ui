import type { EventEmitter, VNode } from '@stencil/core';

export interface IMvxGenericModalProps {
  body: VNode;
  modalTitle: string | VNode;
  modalSubtitle?: string | VNode;
  close: EventEmitter<void>;
}
