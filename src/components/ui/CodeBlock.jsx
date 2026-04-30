/**
 * Terminal-style code block.
 * Use <span className="key|str|com"> inside children for syntax highlighting.
 */
export default function CodeBlock({ children, className = '' }) {
  return (
    <pre className={`code-block whitespace-pre-wrap ${className}`}>
      <code>{children}</code>
    </pre>
  );
}
