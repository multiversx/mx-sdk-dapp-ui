type VNodeStencil = {
  $tag$?: string;
  $attrs$?: Record<string, unknown> | null;
  $children$?: Array<VNodeStencil | VNodeLike | string> | null;
  $text$?: string | null;
};

type VNodeLike = {
  type?: string | ((...args: unknown[]) => unknown);
  props?: Record<string, unknown> & { children?: Array<VNodeLike | string> | VNodeLike | string };
  children?: Array<VNodeLike | string> | VNodeLike | string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function attrsToString(attrs: Record<string, unknown> | null | undefined): string {
  if (!attrs) return '';
  return Object.entries(attrs)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => (v === true ? k : `${k}="${escapeHtml(String(v))}"`))
    .join(' ');
}

function normalizeChildren(children: unknown): Array<VNodeStencil | VNodeLike | string> {
  if (children == null) return [];
  if (Array.isArray(children)) return children as Array<VNodeStencil | VNodeLike | string>;
  return [children as VNodeStencil | VNodeLike | string];
}

function renderStencil(node: VNodeStencil): string {
  if (node.$text$ != null) {
    return escapeHtml(String(node.$text$));
  }
  const tag = node.$tag$ || 'div';
  const attrs = attrsToString(node.$attrs$ || undefined);
  const children = (node.$children$ || []).map(renderAny).join('');
  const attrsStr = attrs ? ` ${attrs}` : '';
  return `<${tag}${attrsStr}>${children}</${tag}>`;
}

function renderLike(node: VNodeLike): string {
  const tag = typeof node.type === 'string' ? node.type : 'div';
  const props = node.props || {};
  const { children, ...rest } = props as Record<string, unknown> & { children?: unknown };
  const attrs = attrsToString(rest);
  const childrenArr = normalizeChildren(children ?? node.children);
  const childrenStr = childrenArr.map(renderAny).join('');
  const attrsStr = attrs ? ` ${attrs}` : '';
  return `<${tag}${attrsStr}>${childrenStr}</${tag}>`;
}

export function renderJsxToHtml(node: unknown): string {
  return renderAny(node);
}

function renderAny(node: unknown): string {
  if (node == null || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number') return escapeHtml(String(node));
  // Heuristics for Stencil VNode
  if (typeof node === 'object') {
    const o = node as Record<string, unknown>;
    if ('$tag$' in o || '$text$' in o || '$children$' in o) {
      return renderStencil(node as VNodeStencil);
    }
    if ('type' in o || 'props' in o || 'children' in o) {
      return renderLike(node as VNodeLike);
    }
  }
  // Fallback
  return escapeHtml(String(node));
}
