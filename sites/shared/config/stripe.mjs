export const stripeConfig = {
  apiKey: process.env.FS_STRIPE_API_KEY,
  amounts: [5, 10, 25, 50, 100, 250, 500],
  periods: ['w', 'm', '3m', '6m', 'y', 'x'],
  currencies: {
    /*
     * Each currency has a multiplication factor to allow the
     * suggested amounts to remain meaningful in various currencies
     */
    eur: 1, // Euro
    usd: 1, // US Dollar
    aud: 1, // Australian Dollar
    bgn: 2, // Bulgarian Lev
    brl: 5, // Brazilian Real
    cad: 1, // Candadian Dollar
    chf: 1, // Swiss Frank
    czk: 25, // Czech Koruna
    dkk: 10, // Danish Krone
    gbp: 1, // UK Pound
    huf: 500, // Hungary Forint
    pln: 4, // Polish Zloty
    ron: 5, // Romanion Leu
    sek: 10, // Swedish Krona
  },
}
