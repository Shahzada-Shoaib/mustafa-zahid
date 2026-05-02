import React from 'react';

/** Match one markdown-style link: [label](url) */
const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/;

/**
 * Allow only safe hrefs for user-authored [text](url) segments.
 * Blocks javascript:, data:, vbscript:, and protocol-relative URLs.
 */
export function sanitizeHref(raw: string): string | null {
  const href = raw.trim();
  if (!href) return null;
  const lower = href.slice(0, 16).toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('vbscript:')
  ) {
    return null;
  }
  if (lower.startsWith('http://') || lower.startsWith('https://')) {
    return href;
  }
  if (href.startsWith('/')) {
    if (href.startsWith('//')) return null;
    return href;
  }
  if (lower.startsWith('mailto:')) {
    const rest = href.slice(7);
    if (/[\s<>()]/.test(rest)) return null;
    return href;
  }
  return null;
}

/** Replace [label](url) with label — useful for JSON-LD and meta text. */
export function plainTextFromInlineMarkdown(text: string): string {
  if (!text) return text;
  return text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
}

const DEFAULT_LINK_CLASS =
  'text-red-400 underline underline-offset-2 hover:text-red-300 transition-colors';

/**
 * Renders plain text with inline links using markdown syntax: [visible text](https://example.com).
 * Multiple links in one string are supported. Invalid URLs are left as literal text.
 */
export function renderInlineMarkdownLinks(
  text: string,
  linkClassName: string = DEFAULT_LINK_CLASS
): React.ReactNode {
  if (text == null || text === '') return text;

  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const match = remaining.match(LINK_PATTERN);
    if (!match || match.index === undefined) {
      nodes.push(remaining);
      break;
    }
    const idx = match.index;
    if (idx > 0) {
      nodes.push(remaining.slice(0, idx));
    }
    const linkText = match[1];
    const rawUrl = match[2];
    const safeHref = sanitizeHref(rawUrl);
    if (safeHref) {
      const isExternal = /^https?:\/\//i.test(safeHref);
      nodes.push(
        <a
          key={`mdl-${key++}`}
          href={safeHref}
          className={linkClassName}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {linkText}
        </a>
      );
    } else {
      nodes.push(match[0]);
    }
    remaining = remaining.slice(idx + match[0].length);
  }

  if (nodes.length === 0) return null;
  if (nodes.length === 1) return nodes[0];
  return <>{nodes}</>;
}
