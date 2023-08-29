export const TextOnBg = ({ txt }) => (
  <span
    style={{
      textShadow:
        '1px 1px 1px hsl(var(--b1)), -1px -1px 1px hsl(var(--b1)), -1px 1px 1px hsl(var(--b1)), 1px -1px 1px hsl(var(--b1))',
    }}
  >
    {txt}
  </span>
)
