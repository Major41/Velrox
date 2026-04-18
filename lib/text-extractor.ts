import DOMPurify from "isomorphic-dompurify";

/**
 * Extracts plain text from HTML content
 * Removes all HTML tags and returns truncated text
 */
export function extractPlainText(
  html: string,
  maxLength: number = 150,
): string {
  // Strip HTML tags
  const plainText = html
    .replace(/<[^>]*>/g, " ") // Remove tags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ") // Collapse multiple spaces
    .trim();

  // Truncate to maxLength
  if (plainText.length > maxLength) {
    return plainText.substring(0, maxLength).trim() + "...";
  }

  return plainText;
}
