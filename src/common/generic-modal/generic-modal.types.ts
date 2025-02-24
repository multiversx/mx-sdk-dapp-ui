import type { EventEmitter, VNode } from '@stencil/core';

export interface IGenericModalProps {
  body: VNode;
  modalTitle: string | VNode;
  modalSubtitle?: string | VNode;
  close: EventEmitter<void>;
}
