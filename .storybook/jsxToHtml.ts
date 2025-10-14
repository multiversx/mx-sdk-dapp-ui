// Interface representing a Stencil VNode structure
interface VNodeStencil {
  $tag$?: string;
  $attrs$?: Record<string, unknown> | null;
  $children$?: Array<VNodeStencil | VNodeLike | string> | null;
  $text$?: string | null;
}

// Interface representing a React-like VNode structure
interface VNodeLike {
  type?: string | ((...args: unknown[]) => unknown);
  props?: Record<string, unknown> & { children?: Array<VNodeLike | string> | VNodeLike | string };
  children?: Array<VNodeLike | string> | VNodeLike | string;
}

// Escapes HTML special characters to prevent XSS attacks
const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Converts attribute object to HTML attribute string
const attrsToString = (attrs: Record<string, unknown> | null | undefined): string => {
  if (!attrs) {
    return '';
  }

  return Object.entries(attrs)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => (v === true ? k : `${k}="${escapeHtml(String(v))}"`))
    .join(' ');
};

// Normalizes children to a consistent array format
const normalizeChildren = (children: unknown): Array<VNodeStencil | VNodeLike | string> => {
  if (children == null) {
    return [];
  }

  if (Array.isArray(children)) {
    return children as Array<VNodeStencil | VNodeLike | string>;
  }

  return [children as VNodeStencil | VNodeLike | string];
};

// Renders a Stencil VNode to HTML string
const renderStencil = (node: VNodeStencil): string => {
  if (node.$text$ != null) {
    return escapeHtml(String(node.$text$));
  }

  const tag = node.$tag$ || 'div';
  const attrs = attrsToString(node.$attrs$ || undefined);
  const children = (node.$children$ || []).map(renderAny).join('');
  const attrsStr = attrs ? ` ${attrs}` : '';

  return `<${tag}${attrsStr}>${children}</${tag}>`;
};

// Renders a React-like VNode to HTML string
const renderLike = (node: VNodeLike): string => {
  const tag = typeof node.type === 'string' ? node.type : 'div';
  const props = node.props || {};
  const { children, ...rest } = props as Record<string, unknown> & { children?: unknown };
  const attrs = attrsToString(rest);
  const childrenArr = normalizeChildren(children ?? node.children);
  const childrenStr = childrenArr.map(renderAny).join('');
  const attrsStr = attrs ? ` ${attrs}` : '';

  return `<${tag}${attrsStr}>${childrenStr}</${tag}>`;
};

// Main export function that converts JSX to HTML string
export const renderJsxToHtml = (node: unknown): string => renderAny(node);

// Renders any node type to HTML string with type detection
const renderAny = (node: unknown): string => {
  if (node == null || node === false) {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return escapeHtml(String(node));
  }

  // Heuristics for detecting node types
  if (typeof node === 'object') {
    const o = node as Record<string, unknown>;

    // Check for Stencil VNode
    if ('$tag$' in o || '$text$' in o || '$children$' in o) {
      return renderStencil(node as VNodeStencil);
    }

    // Check for React-like VNode
    if ('type' in o || 'props' in o || 'children' in o) {
      return renderLike(node as VNodeLike);
    }
  }

  // Fallback for unknown node types
  return escapeHtml(String(node));
};
