/*
 * A list of (documentation) authors.
 * The ID is the (future v3) FreeSewing user ID (zero for now)
 * The name is what we'll use as display name
 */
export const authors = {
  /*
   * For these we know their FreeSewing ID and they are ordered by that ID
   * Which means new users/contributors will typically go at the bottom
   */

  // The dinosaurs
  joostdecock: { id: 1, name: 'Joost De Cock' },
  mocked: { id: 8, name: 'Unknown (mocked in dev)' },
  'Prof. dr. Sorcha Ní Dhubhghaill': { id: 9, name: 'Prof. dr. Sorcha Ní Dhubhghaill' },
  woutervdub: { id: 132, name: 'Wouter van Wageningen' },
  tangerineshark: { id: 13050, name: 'tangerineshark' },
  Zee: { id: 13460, name: 'Zee' },
  Natalia: { id: 19867, name: 'Natalia Sayang' },

  // The old guard
  'Sanne Kalkman': { id: 20343, name: 'Sanne Kalkman' },
  bobgeorgethe3rd: { id: 20650, name: 'bobgeorgethe3rd' },
  Tríona: { id: 22104, name: 'Tríona' },
  starfetch: { id: 22708, name: 'starfetch' },
  'Morgan Frost': { id: 23957, name: 'Morgan Frost' },
  jackseye: { id: 25383, name: 'jackseye' },
  'Nick Dower': { id: 26126, name: 'Nick Dower' },
  jgfichte: { id: 26295, name: 'jgfichte' },
  'anna-puk': { id: 26981, name: 'Anna Puk' },
  'Enoch Riese': { id: 28119, name: 'Enoch Riese' },
  benjamesben: { id: 28838, name: 'Benjamin' },
  'Joe Schofield': { id: 28809, name: 'Joe Schofield' },
  'Vili Sinervä': { id: 31336, name: 'Vili Sinervä' },
  Thrunic: { id: 33070, name: 'Thrunic' },

  // The new faces
  'Paula Vidas': { id: 64919, name: 'Paula Vidas' },
  'Jonathan Haas': { id: 71843, name: 'Jonathan Haas' },

  /*
   * For the folowwing authors, we don't have their FreeSewing ID
   * so if they surface, we should try to get it.
   * Then again, these are based on git contributions, so it's
   * entirely possible that they don't have an account.
   * They are all linked to the anonymous user (id 8)
   */
  'Annie Kao': { id: 8, name: 'Annie Kao' },
  Bart: { id: 8, name: 'Bart' },
  'James Bradbury': { id: 8, name: 'James Bradbury' },
  'Glenn Matthews': { id: 8, name: 'Glenn Matthews' },
  'Raphael Sizemore': { id: 8, name: 'Raphael Sizemore' },
  mergerg: { id: 9, name: 'mergerg' },
  'Darigov Research': { id: 8, name: 'Darigov Research' },
  'Jeroen Hoek': { id: 8, name: 'Jeroen Hoek' },
  chri5b: { id: 8, name: 'chri5b' },
  'Ivo Bek': { id: 8, name: 'Ivo Bek' },
  bijay_d: { id: 8, name: 'bijay_d' },
}

/*
 * Maps git commiter name to author for those cases where the
 * name in the authors table is different
 */
export const gitToAuthor = {
  'Joost De Cock': 'joostdecock',
  'Benjamin F': 'benjamesben',
  'Benjamin Fan': 'benjamesben',
  SeaZeeZee: 'Zee',
  'Wouter van Wageningen': 'woutervdub',
  'bobgeorgethe3rd@googlemail.com': 'bobgeorgethe3rd',
  '70777269+tangerineshark@users.noreply.github.com': 'tangerineshark',
  'thijs.assies@gmail.com': 'MA-TATAS',
  'Natalia Sayang': 'Natalia',
  '109869956+BenJamesBen@users.noreply.github.com': 'benjamesben',
  'vili.m.sinerva@gmail.com': 'Vili Sinervä',
  'bekivo@gmail.com': 'Ivo Bek',
  'paulavidas@gmail.com': 'Paula Vidas',
  '104308146+KaerMorhan@users.noreply.github.com': 'Morgan Frost',
}
