export function fontStack(fonts: Array<string>): string {
  return fonts
    .map((font) => (font.includes(' ') ? `"${font}"` : font))
    .join(', ');
}
