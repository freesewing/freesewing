//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { useAtom } from 'jotai'
import { atomWithHash } from 'jotai-location'

const idAtom = atomWithHash('id', null)

export const useId = () => useAtom(idAtom)
