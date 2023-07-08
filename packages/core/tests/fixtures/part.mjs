export const fixtureDraft = ({ part }) => part
export const fixturePart = (name, config = {}) => ({
  name,
  draft: fixtureDraft,
  ...config,
})
