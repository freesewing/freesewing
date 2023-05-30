import { Aaron } from '@freesewing/aaron'
import { Albert } from '@freesewing/albert'
import { Bee } from '@freesewing/bee'
import { Bella } from '@freesewing/bella'
import { Benjamin } from '@freesewing/benjamin'
import { Bent } from '@freesewing/bent'
import { Bob } from '@freesewing/bob'
import { Breanna } from '@freesewing/breanna'
import { Brian } from '@freesewing/brian'
import { Bruce } from '@freesewing/bruce'
import { Carlita } from '@freesewing/carlita'
import { Carlton } from '@freesewing/carlton'
import { Cathrin } from '@freesewing/cathrin'
import { Charlie } from '@freesewing/charlie'
import { Cornelius } from '@freesewing/cornelius'
import { Diana } from '@freesewing/diana'
import { Florence } from '@freesewing/florence'
import { Florent } from '@freesewing/florent'
import { Hi } from '@freesewing/hi'
import { Holmes } from '@freesewing/holmes'
import { Hortensia } from '@freesewing/hortensia'
import { Huey } from '@freesewing/huey'
import { Hugo } from '@freesewing/hugo'
import { Jaeger } from '@freesewing/jaeger'
import { Lucy } from '@freesewing/lucy'
import { Lunetius } from '@freesewing/lunetius'
import { Magde } from '@freesewing/magde'
import { Noble } from '@freesewing/noble'
import { Octoplushy } from '@freesewing/octoplushy'
import { Paco } from '@freesewing/paco'
import { Penelope } from '@freesewing/penelope'
import { Sandy } from '@freesewing/sandy'
import { Shin } from '@freesewing/shin'
import { Simon } from '@freesewing/simon'
import { Simone } from '@freesewing/simone'
import { Sven } from '@freesewing/sven'
import { Tamiko } from '@freesewing/tamiko'
import { Teagan } from '@freesewing/teagan'
import { Tiberius } from '@freesewing/tiberius'
import { Titan } from '@freesewing/titan'
import { Trayvon } from '@freesewing/trayvon'
import { Unice } from '@freesewing/unice'
import { Ursula } from '@freesewing/ursula'
import { Wahid } from '@freesewing/wahid'
import { Walburga } from '@freesewing/walburga'
import { Waralee } from '@freesewing/waralee'
import { Yuri } from '@freesewing/yuri'

const designs = {
  aaron: Aaron,
  albert: Albert,
  bee: Bee,
  bella: Bella,
  benjamin: Benjamin,
  bent: Bent,
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
  hi: Hi,
  holmes: Holmes,
  hortensia: Hortensia,
  huey: Huey,
  hugo: Hugo,
  jaeger: Jaeger,
  lucy: Lucy,
  lunetius: Lunetius,
  magde: Magde,
  noble: Noble,
  octoplushy: Octoplushy,
  paco: Paco,
  penelope: Penelope,
  sandy: Sandy,
  shin: Shin,
  simon: Simon,
  simone: Simone,
  sven: Sven,
  tamiko: Tamiko,
  teagan: Teagan,
  tiberius: Tiberius,
  titan: Titan,
  trayvon: Trayvon,
  unice: Unice,
  ursula: Ursula,
  wahid: Wahid,
  walburga: Walburga,
  waralee: Waralee,
  yuri: Yuri,
}

export const useDesign = (design) => (designs[design] ? designs[design] : false)
