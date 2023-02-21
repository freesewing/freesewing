import Link from 'next/link'

export const InnerWordMark = () => (
  <span style={{ letterSpacing: '-0.1rem' }}>
    <span className="text-red-400">F</span>
    <span className="text-orange-400">r</span>
    <span className="text-yellow-400">e</span>
    <span className="text-lime-400">e</span>
    <span className="text-green-400">S</span>
    <span className="text-cyan-400">e</span>
    <span className="text-blue-400">w</span>
    <span className="text-indigo-400">i</span>
    <span className="text-violet-400">n</span>
    <span className="text-purple-400">g</span>
  </span>
)

export const WordMark = () => (
  <Link
    href="/"
    role="button"
    className="btn btn-ghost btn-sm normal-case text-2xl hover:bg-transparent font-bold px-0 -mt-1"
  >
    <InnerWordMark />
  </Link>
)
