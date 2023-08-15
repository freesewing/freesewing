export const CodeBox = ({ children }) => (
  <div className="hljs my-4">
    <pre className="language-md hljs text-base lg:text-lg whitespace-break-spaces overflow-scroll pr-4">
      {children}
    </pre>
  </div>
)
