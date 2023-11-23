import { Aaron, AaronFront, AaronBack } from 'shared/components/designs/linedrawings/aaron.mjs'
import { Albert, AlbertFront } from 'shared/components/designs/linedrawings/albert.mjs'
import { Bella, BellaFront, BellaBack } from 'shared/components/designs/linedrawings/bella.mjs'
import { Bruce, BruceFront, BruceBack } from 'shared/components/designs/linedrawings/bruce.mjs'
import { Simon, SimonFront, SimonBack } from 'shared/components/designs/linedrawings/simon.mjs'
import { Wahid, WahidFront, WahidBack } from 'shared/components/designs/linedrawings/wahid.mjs'

export const lineDrawingsFront = {
  aaron: AaronFront,
  albert: AlbertFront,
  bella: BellaFront,
  bruce: BruceFront,
  simon: SimonFront,
  wahid: WahidFront,
}

export const lineDrawingsBack = {
  aaron: AaronBack,
  bella: BellaBack,
  bruce: BruceBack,
  simon: SimonBack,
  wahid: WahidBack,
}

export const lineDrawings = {
  aaron: Aaron,
  albert: Albert,
  bella: Bella,
  bruce: Bruce,
  simon: Simon,
  wahid: Wahid,
}
