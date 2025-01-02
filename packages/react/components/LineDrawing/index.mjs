import { Aaron, AaronFront, AaronBack } from './aaron.mjs'
import { Albert, AlbertFront } from './albert.mjs'
import { Bee, BeeFront } from './bee.mjs'
import { Bella, BellaFront, BellaBack } from './bella.mjs'
import { Benjamin, BenjaminFront } from './benjamin.mjs'
import { Bent, BentFront, BentBack } from './bent.mjs'
import { Bibi, BibiFront, BibiBack } from './bibi.mjs'
import { Bob, BobFront, BobBack } from './bob.mjs'
import { Breanna, BreannaFront, BreannaBack } from './breanna.mjs'
import { Brian, BrianFront, BrianBack } from './brian.mjs'
import { Bruce, BruceFront, BruceBack } from './bruce.mjs'
import { Carlita, CarlitaFront, CarlitaBack } from './carlita.mjs'
import { Carlton, CarltonFront, CarltonBack } from './carlton.mjs'
import { Cathrin, CathrinFront, CathrinBack } from './cathrin.mjs'
import { Charlie, CharlieFront, CharlieBack } from './charlie.mjs'
import { Cornelius, CorneliusFront, CorneliusBack } from './cornelius.mjs'
import { Diana, DianaFront, DianaBack } from './diana.mjs'
import { Florence, FlorenceFront } from './florence.mjs'
import { Florent, FlorentFront } from './florent.mjs'
import { Gozer, GozerFront, GozerBack } from './gozer.mjs'
import { Hi, HiFront } from './hi.mjs'
import { Holmes, HolmesFront } from './holmes.mjs'
import { Hortensia, HortensiaFront } from './hortensia.mjs'
import { Huey, HueyFront, HueyBack } from './huey.mjs'
import { Hugo, HugoFront, HugoBack } from './hugo.mjs'
import { Lucy, LucyFront } from './lucy.mjs'
import { Lumina, LuminaFront, LuminaBack } from './lumina.mjs'
import { Lumira, LumiraFront, LumiraBack } from './lumira.mjs'
import { Lunetius, LunetiusFront } from './lunetius.mjs'
import { Noble, NobleFront, NobleBack } from './noble.mjs'
import { Simon, SimonFront, SimonBack } from './simon.mjs'
import { Teagan, TeaganFront, TeaganBack } from './teagan.mjs'
import { Tristan, TristanFront, TristanBack } from './tristan.mjs'
import { Uma, UmaFront, UmaBack } from './uma.mjs'
import { Umbra, UmbraFront, UmbraBack } from './umbra.mjs'
import { Wahid, WahidFront, WahidBack } from './wahid.mjs'

import { MissingLinedrawing } from './missing.mjs'

/*
 * Bundle all fronts
 */
const lineDrawingsFront = {
  aaron: AaronFront,
  albert: AlbertFront,
  bee: BeeFront,
  bella: BellaFront,
  benjamin: BenjaminFront,
  bent: BentFront,
  bibi: BibiFront,
  bob: BobFront,
  breanna: BreannaFront,
  brian: BrianFront,
  bruce: BruceFront,
  carlita: CarlitaFront,
  carlton: CarltonFront,
  cathrin: CathrinFront,
  charlie: CharlieFront,
  cornelius: CorneliusFront,
  diana: DianaFront,
  florence: FlorenceFront,
  florent: FlorentFront,
  gozer: GozerFront,
  hi: HiFront,
  holmes: HolmesFront,
  hortensia: HortensiaFront,
  huey: HueyFront,
  hugo: HugoFront,
  jaeger: MissingLinedrawing,
  jane: MissingLinedrawing,
  lily: MissingLinedrawing,
  lucy: LucyFront,
  lumina: LuminaFront,
  lumira: LumiraFront,
  lunetius: LunetiusFront,
  noble: NobleFront,
  octoplushy: MissingLinedrawing,
  onyx: MissingLinedrawing,
  opal: MissingLinedrawing,
  otis: MissingLinedrawing,
  paco: MissingLinedrawing,
  penelope: MissingLinedrawing,
  sandy: MissingLinedrawing,
  shelly: MissingLinedrawing,
  shin: MissingLinedrawing,
  simon: SimonFront,
  simone: MissingLinedrawing,
  skully: MissingLinedrawing,
  sven: MissingLinedrawing,
  tamiko: MissingLinedrawing,
  teagan: TeaganFront,
  tiberius: MissingLinedrawing,
  titan: MissingLinedrawing,
  tristan: TristanFront,
  uma: UmaFront,
  umbra: UmbraFront,
  wahid: WahidFront,
  walburga: MissingLinedrawing,
  waralee: MissingLinedrawing,
  yuri: MissingLinedrawing,
}

/*
 * Bundle all backs
 */
const lineDrawingsBack = {
  aaron: AaronBack,
  bella: BellaBack,
  bent: BentBack,
  bibi: BibiBack,
  bob: BobBack,
  breanna: BreannaBack,
  brian: BrianBack,
  bruce: BruceBack,
  carlita: CarlitaBack,
  carlton: CarltonBack,
  cathrin: CathrinBack,
  charlie: CharlieBack,
  cornelius: CorneliusBack,
  diana: DianaBack,
  gozer: GozerBack,
  huey: HueyBack,
  hugo: HugoBack,
  lumina: LuminaBack,
  lumira: LumiraBack,
  noble: NobleBack,
  simon: SimonBack,
  teagan: TeaganBack,
  tristan: TristanBack,
  uma: UmaBack,
  umbra: UmbraBack,
  wahid: WahidBack,
}

/*
 * Bundle all linedrawings
 */
const lineDrawings = {
  aaron: Aaron,
  albert: Albert,
  bee: Bee,
  bella: Bella,
  benjamin: Benjamin,
  bent: Bent,
  bibi: Bibi,
  bob: Bob,
  breanna: Breanna,
  brian: Brian,
  bruce: Bruce,
  carlita: Carlita,
  carlton: Carlton,
  cathrin: Cathrin,
  charlie: Charlie,
  cornelius: Cornelius,
  diana: Diana,
  florence: Florence,
  florent: Florent,
  gozer: Gozer,
  hi: Hi,
  holmes: Holmes,
  hortensia: Hortensia,
  huey: Huey,
  hugo: Hugo,
  jaeger: MissingLinedrawing,
  jane: MissingLinedrawing,
  lily: MissingLinedrawing,
  lucy: Lucy,
  lumina: Lumina,
  lumira: Lumira,
  lunetius: Lunetius,
  noble: Noble,
  octoplushy: MissingLinedrawing,
  onyx: MissingLinedrawing,
  opal: MissingLinedrawing,
  otis: MissingLinedrawing,
  paco: MissingLinedrawing,
  penelope: MissingLinedrawing,
  sandy: MissingLinedrawing,
  shelly: MissingLinedrawing,
  shin: MissingLinedrawing,
  simon: Simon,
  simone: MissingLinedrawing,
  skully: MissingLinedrawing,
  sven: MissingLinedrawing,
  tamiko: MissingLinedrawing,
  teagan: Teagan,
  tiberius: MissingLinedrawing,
  titan: MissingLinedrawing,
  tristan: Tristan,
  uma: Uma,
  umbra: Umbra,
  wahid: Wahid,
  walburga: MissingLinedrawing,
  waralee: MissingLinedrawing,
  yuri: MissingLinedrawing,
}

/*
 * Named exports
 */
export {
  // Bundles
  lineDrawings,
  lineDrawingsBack,
  lineDrawingsFront,
  // Aaron
  Aaron,
  AaronFront,
  AaronBack,
  // Albert
  Albert,
  AlbertFront,
  // Bee
  Bee,
  BeeFront,
  // Bella
  Bella,
  BellaFront,
  BellaBack,
  // Benjamin
  Benjamin,
  BenjaminFront,
  // Bent
  Bent,
  BentFront,
  BentBack,
  // Bibi
  Bibi,
  BibiFront,
  BibiBack,
  // Bob
  Bob,
  BobFront,
  BobBack,
  // Breanna
  Breanna,
  BreannaFront,
  BreannaBack,
  // Brian
  Brian,
  BrianFront,
  BrianBack,
  // Bruce
  Bruce,
  BruceFront,
  BruceBack,
  // Carlita
  Carlita,
  CarlitaFront,
  CarlitaBack,
  // Carlton
  Carlton,
  CarltonFront,
  CarltonBack,
  // Cathrin
  Cathrin,
  CathrinFront,
  CathrinBack,
  // Charlie
  Charlie,
  CharlieFront,
  CharlieBack,
  // Cornelius
  Cornelius,
  CorneliusFront,
  CorneliusBack,
  // Diana
  Diana,
  DianaFront,
  DianaBack,
  // Florence
  Florence,
  FlorenceFront,
  // Florent
  Florent,
  FlorentFront,
  // Gozer
  Gozer,
  GozerFront,
  GozerBack,
  // Hi
  Hi,
  HiFront,
  // Holmes
  Holmes,
  HolmesFront,
  // Hortensia
  Hortensia,
  HortensiaFront,
  // Huey
  Huey,
  HueyFront,
  HueyBack,
  // Hugo
  Hugo,
  HugoFront,
  HugoBack,
  // Lucy
  Lucy,
  LucyFront,
  // Lumina
  Lumina,
  LuminaFront,
  LuminaBack,
  // Lumira
  Lumira,
  LumiraFront,
  LumiraBack,
  // Lunetius
  Lunetius,
  LunetiusFront,
  // Noble
  Noble,
  NobleFront,
  NobleBack,
  // Simon
  Simon,
  SimonFront,
  SimonBack,
  // Teagan
  Teagan,
  TeaganFront,
  TeaganBack,
  // Tristan
  Tristan,
  TristanFront,
  TristanBack,
  // Uma
  Uma,
  UmaFront,
  UmaBack,
  // Umbra
  Umbra,
  UmbraFront,
  UmbraBack,
  // Wahid
  Wahid,
  WahidFront,
  WahidBack,
}
