import { Aaron, AaronFront, AaronBack } from 'shared/components/designs/linedrawings/aaron.mjs'
import { Albert, AlbertFront } from 'shared/components/designs/linedrawings/albert.mjs'
import { Bee, BeeFront } from 'shared/components/designs/linedrawings/bee.mjs'
import { Bruce, BruceFront, BruceBack } from 'shared/components/designs/linedrawings/bruce.mjs'
import { Simon, SimonFront, SimonBack } from 'shared/components/designs/linedrawings/simon.mjs'
import { Wahid, WahidFront, WahidBack } from 'shared/components/designs/linedrawings/wahid.mjs'

export const lineDrawingsFront = {
  aaron: AaronFront,
  albert: AlbertFront,
  bee: BeeFront,
  bruce: BruceFront,
  simon: SimonFront,
  wahid: WahidFront,
}

export const lineDrawingsBack = {
  aaron: AaronBack,
  bruce: BruceBack,
  simon: SimonBack,
  wahid: WahidBack,
}

export const lineDrawings = {
  aaron: Aaron,
  albert: Albert,
  bee: Bee,
  bruce: Bruce,
  simon: Simon,
  wahid: Wahid,
}
