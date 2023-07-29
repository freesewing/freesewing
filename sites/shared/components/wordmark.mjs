import Link from 'next/link'

export const colors = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'cyan',
  'blue',
  'indigo',
  'violet',
  'purple',
]

export const InnerWordMark = () => (
  <span style={{ letterSpacing: '-0.1rem' }} className="group">
    <span className="text-rainbow-red group-hover:text-rainbow-purple">F</span>
    <span className="text-rainbow-orange group-hover:text-rainbow-violet">r</span>
    <span className="text-rainbow-yellow group-hover:text-rainbow-indigo">e</span>
    <span className="text-rainbow-lime group-hover:text-rainbow-blue">e</span>
    <span className="text-rainbow-green group-hover:text-rainbow-cyan">S</span>
    <span className="text-rainbow-cyan group-hover:text-rainbow-green">e</span>
    <span className="text-rainbow-blue group-hover:text-rainbow-lime">w</span>
    <span className="text-rainbow-indigo group-hover:text-rainbow-yellow">i</span>
    <span className="text-rainbow-violet group-hover:text-rainbow-orange">n</span>
    <span className="text-rainbow-purple group-hover:text-rainbow-red">g</span>
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
