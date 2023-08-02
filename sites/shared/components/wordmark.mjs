import Link from 'next/link'

export const InnerWordMark = () => (
  <span style={{ letterSpacing: '-0.1rem' }} className="group">
    <span className="text-spectrum-0 group-hover:text-spectrum-focus-0">F</span>
    <span className="text-spectrum-1 group-hover:text-spectrum-focus-1">r</span>
    <span className="text-spectrum-2 group-hover:text-spectrum-focus-2">e</span>
    <span className="text-spectrum-3 group-hover:text-spectrum-focus-3">e</span>
    <span className="text-spectrum-4 group-hover:text-spectrum-focus-4">S</span>
    <span className="text-spectrum-5 group-hover:text-spectrum-focus-5">e</span>
    <span className="text-spectrum-7 group-hover:text-spectrum-focus-7">w</span>
    <span className="text-spectrum-8 group-hover:text-spectrum-focus-8">i</span>
    <span className="text-spectrum-8 group-hover:text-spectrum-focus-8">n</span>
    <span className="text-spectrum-10 group-hover:text-spectrum-focus-10">g</span>
  </span>
)

export const WordMark = () => (
  <Link
    href="/"
    role="button"
    className="btn btn-ghost btn-sm normal-case text-4xl hover:bg-transparent font-bold px-0 -mt-1"
  >
    <InnerWordMark />
  </Link>
)
