//  Accessories
import florence        from "@freesewing/florence"
import florent         from "@freesewing/florent"
import holmes          from "@freesewing/holmes"
import hortensia       from "@freesewing/hortensia"
import lucy            from "@freesewing/lucy"
import trayvon         from "@freesewing/trayvon"

// Blocks
import bella           from "@freesewing/bella"
import bent            from "@freesewing/bent"
import brian           from "@freesewing/brian"
import titan           from "@freesewing/titan"

// Garments
import aaron           from "@freesewing/aaron"
import albert          from "@freesewing/albert"
import bee             from "@freesewing/bee"
import benjamin        from "@freesewing/benjamin"
import breanna         from "@freesewing/breanna"
import bruce           from "@freesewing/bruce"
import carlita         from "@freesewing/carlita"
import carlton         from "@freesewing/carlton"
import cathrin         from "@freesewing/cathrin"
import charlie         from "@freesewing/charlie"
import cornelius       from "@freesewing/cornelius"
import diana           from "@freesewing/diana"
import huey            from "@freesewing/huey"
import hugo            from "@freesewing/hugo"
import jaeger          from "@freesewing/jaeger"
import lunetius        from "@freesewing/lunetius"
import paco            from "@freesewing/paco"
import penelope        from "@freesewing/penelope"
import sandy           from "@freesewing/sandy"
import shin            from "@freesewing/shin"
import simon           from "@freesewing/simon"
import simone          from "@freesewing/simone"
import sven            from "@freesewing/sven"
import tamiko          from "@freesewing/tamiko"
import teagan          from "@freesewing/teagan"
import theo            from "@freesewing/theo"
import tiberius        from "@freesewing/tiberius"
import ursula          from "@freesewing/ursula"
import wahid           from "@freesewing/wahid"
import walburga        from "@freesewing/walburga"
import waralee         from "@freesewing/waralee"
import yuri            from "@freesewing/yuri"

// Utilities
import examples        from "@freesewing/examples"
import legend          from "@freesewing/examples"
import plugintest      from "@freesewing/examples"
import rendertest      from "@freesewing/examples"
import tutorial        from "@freesewing/examples"

export const designs = {
  // Accessories
  florence,
  florent,
  holmes,
  hortensia,
  lucy,
  trayvon,
  // Blocks
  bella,
  bent,
  brian,
  titan,
  // Garments
  aaron,
  albert,
  bee,
  benjamin,
  breanna,
  bruce,
  carlita,
  carlton,
  cathrin,
  charlie,
  cornelius,
  diana,
  huey,
  hugo,
  jaeger,
  lunetius,
  paco,
  penelope,
  sandy,
  shin,
  simon,
  simone,
  sven,
  tamiko,
  teagan,
  theo,
  tiberius,
  ursula,
  wahid,
  walburga,
  waralee,
  yuri,
  // Utilities
  examples,
  legend,
  plugintest,
  rendertest,
  tutorial,
}

export const configs = {}
for (const d in designs) configs[d] = designs[d].config

export const getDesign = design => designs[design] || false

export const getConfig = design => designs[design]
  ? designs[design].config
  : false


