function CodeSnippet({ code }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs leading-6 text-gray-700">
      <code>{code}</code>
    </pre>
  );
}

export default CodeSnippet;
