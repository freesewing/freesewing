//Fit
export const waistEase = { pct: 15, min: 10, max: 35, menu: 'fit' }

// Front
export const frontHeightRatio = { pct: 40, min: 10, max: 50, menu: 'fit' } //How Tall should the cummerbund be? Should this be a measurement instead? Waist to seat?
export const frontPleats = { count: 7, min: 1, max: 10, menu: 'style.pleats' } // Number of pleats to generate, spread evenly across the face. 1 pleat

// Front Taper - How much and how symmetrically should the front of the Cummerbund taper?
// export const frontTaperTopRatio = { pct: 75, min:0, max:95, menu: "style.taper"} //How much Should the top of the cummerbund taper down to centre?
export const frontTaperTopStartRatio = { pct: 50, min: 0, max: 95, menu: 'style.taper' } //where should the top of the cummerbund start tapering down, as a ratio of the distance from centre to the end

// export const frontTaperBottomRatio = { pct: 75, min:0, max:95, menu: "style.taper"} //How much Should the top of the cummerbund taper down to centre?
export const frontTaperBottomStartRatio = { pct: 50, min: 0, max: 95, menu: 'style.taper' } //where should the top of the cummerbund start tapering down, as a ratio of the distance from centre to the enda ratio of the distance from centre to the end?

//Front side placement

export const frontSideStartRatio = { pct: 50, min: 0, max: 100, menu: 'style.side' } // How far from the top, as a ratio of the total height of the front, should the side start

// Side
export const sideLengthRatio = { pct: 12.5, min: 5, max: 25, menu: 'style.side' } //How long should the side be as a factor of the waist measurement (max of 1/4 as the front is a half of the waist, so 2 sides is the other half)
export const sideHeightRatio = { pct: 50, min: 0, max: 100, menu: 'style.side' } //How big should the inner-side of the side part be, as a ratio of the total height
export const sideStrapTopRatio = { pct: 50, min: 0, max: 100, menu: 'style.side' } // The shape of the side - What % of the [height of the side] - [strap width] Will be on the top
export const sideHorizontalTaperRatio = { pct: 25, min: 5, max: 95, menu: 'style.side' } // How far (as a %) from the front side should it taper to the strap width (how aggressive is the taper?)
export const sideOpening = {
  //Should we leave an opening on the side to allow excess strap to be hidden (as sides are symmetrical, this will add the option to the pattern of which only one side should sew)
  bool: true,
  menu: 'style.side',
}

// Strap
export const strapType = {
  list: ['lining', 'tape'],
  dflt: 'lining',
  menu: 'style.strap',
}

export const strapHeight = { pct: 18, min: 0.5, max: 200, menu: 'style.strap' } // the size of the Strap as a % of the cummerbund side height -
export const strapExtraLength = { pct: 30, min: 10, max: 100, menu: 'style.strap' }
export const strapRightPct = { pct: 50, min: 25, max: 75, menu: 'style.strap' } // For Uneven strap lengths, what percentage of the total strap is on the right. 50% for even lengths

// Fastener
export const fastenerStyle = {
  // What style of fastener should we use?
  list: ['button', 'buckle', 'pressStud', 'hook&Bar', 'hook&Eye'],
  dflt: 'buckle',
  menu: 'style.fastener',
}

export const fastenerCount = {
  //Number of fasteners to generate (Buttons, hooks etc)
  count: 7,
  min: 1,
  max: 10, //Todo: Validate if this is sensible
  menu: 'style.fastener',
}

export const fastenerHoleCount = {
  //Number of fastener 'holes' to generate (Allows one button, multiple holes)
  count: 7,
  min: 0,
  max: 10, //Todo: Validate if this is sensible
  menu: 'style.fastener',
}

export const fastenerRows = {
  //Number of rows of fastenerCount. Most useful for the hook & bar style fasteners
  count: 1,
  min: 1,
  max: 5, //Todo: Validate if this is sensible
  menu: 'style.fastener',
}

// Pocket

export const pocketStyle = {
  //What side should it be on? Right for Right-handedness
  list: ['internal', 'external', 'none'],
  dflt: 'internal',
  menu: 'style.pocket',
}

export const pocketSide = {
  //What side should it be on? Right for Right-handedness
  list: ['left', 'right'],
  dflt: 'right',
  menu: 'style.pocket',
}

export const pocketWidth = { pct: 20, min: 10, max: 50, menu: 'style.pocket' } //Optional fob/internal pocket width as a pct of front width
export const pocketHeightRatio = { pct: 100, min: 50, max: 200, menu: 'style.pocket' } //Optional fob/internal pocket height as a ratio of width (Validate sizing)
export const pocketWeltHeight = { pct: 10, min: 5, max: 25, menu: 'style.pocket' } // height of the welt opening as a % of the overall pocket height
export const pocketWeltExtra = { pct: 10, min: 5, max: 25, menu: 'style.pocket' } // Additional "Width/Height added to pocket welt and pocket as a ratio of pocket width"
export const pocketPointRatio = { pct: 10, min: 0, max: 50, menu: 'style.pocket' } // Height of the bottom taper/point as a % of the pocketHeight

// export const buttonPlacketStyle = {
//     list: ['classic', 'seamless'],
//     dflt: 'classic',
//     hide: ({ options }) => options.seperateButtonPlacket,
//     menu: 'style.closure',
// }
