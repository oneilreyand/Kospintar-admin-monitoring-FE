function CodeSnippet({ code }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border bg-background p-4 text-xs leading-6 text-navy">
      <code>{code}</code>
    </pre>
  );
}

export default CodeSnippet;
