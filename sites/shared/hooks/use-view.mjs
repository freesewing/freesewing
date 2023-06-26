import { useAtom } from 'jotai'
import { atomWithHash } from 'jotai-location'

const viewAtom = atomWithHash('view', 'draft')

export const useView = () => {
  return useAtom(viewAtom)
}
