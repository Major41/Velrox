import DOMPurify from "isomorphic-dompurify";

/**
 * Safely renders HTML content with XSS protection
 * @param html - Raw HTML content from TipTap editor
 * @returns Sanitized HTML safe to render
 */
export function renderHtmlContent(html: string): string {
  // Sanitize the HTML to prevent XSS attacks
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "a",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel"],
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    RETURN_DOM_IMPORT: false,
  });

  return clean;
}
