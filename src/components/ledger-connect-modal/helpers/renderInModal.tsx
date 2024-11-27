import { h, VNode } from '@stencil/core';

interface IRenderModalProps {
  body: VNode;
  title: string | VNode;
  subtitle: string | VNode;
  onClose: () => void;
}

export const renderInModal = ({ body, title, subtitle, onClose }: IRenderModalProps) => {
  return (
    <div class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <span class="close" onClick={onClose}>
            ✕
          </span>
          <h2>{title}</h2>
          <h4>{subtitle}</h4>
        </div>
        {body}
      </div>
    </div>
  );
};
