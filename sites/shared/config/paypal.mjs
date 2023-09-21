export const paypalConfig = {
  /*
   * This is the plan ID for FreeSewing Patron Subscriptions.
   * Note that to maximize flexibility, and have a sort of pay-what-you-wnat
   * system, we have only 1 plan: 1 euro/month.
   *
   * But we use quantity pricing. So if a person selects a 15/month plan,
   * we subscribe them to the 1/month plan but set the quantity to 15.
   */
  planId: 'P-41W64036N5201172WMTEKMIA',
  /*
   * List of amounts we display
   * (users can also enter their own amount, which we'll floor to an int)
   */
  amounts: [5, 10, 15, 25, 50, 75, 100],
  /*
   * Currencies supported by PayPal that we use
   * https://developer.paypal.com/api/nvp-soap/currency-codes#paypal
   */
  currencies: ['aud', 'cad', 'eur', 'usd'],
  /*
   * Language mapping to languages supported by PayPal
   * https://developer.paypal.com/api/rest/reference/locale-codes/
   */
  languages: {
    en: 'en_US',
    nl: 'nl_NL',
    fr: 'fr_FR',
    es: 'es_ES',
    de: 'de_DE',
    uk: 'en_US', // Paypal does not support UK
  },
  /*
   * Periods for recurring payments
   * x means donation, not subscription
   */
  periods: ['w', 'm', '3m', '6m', 'y', 'x'],
  /*
   * Variables to set in the form
   * https://developer.paypal.com/api/nvp-soap/paypal-payments-standard/integration-guide/Appx-websitestandard-htmlvariables/
   */
  vars: {
    // Subscribe form
    subscribe: {
      /*
       * This value indicates it is a subscribe button that was clicked
       */
      cmd: '_xclick-subscriptions',
      /*
       * Item name as shown to the user
       *
       * Will be replaced with the translated value at run time, but this is
       * here as a safe default.
       */
      item_name: 'FreeSewing Patron Subscription',
      /*
       * Return URL the user will be redirected to after completion
       * of the payment.
       */
      return: 'https://freesewing.org/patrons/thanks',
      /*
       * This needs to be set to 1 to indicate that recurring
       * payments should be collected.
       */
      src: 1,
    },
    // Donate form
    donate: {
      /*
       * This value indicates it is a donate button that was clicked
       */
      cmd: '_donations',
      /*
       * Item name as shown to the user
       *
       * Will be replaced with the translated value at run time, but this is
       * here as a safe default.
       */
      item_name: 'FreeSewing Donation',
      /*
       * Return URL the user will be redirected to after completion
       * of the payment.
       */
      return: 'https://freesewing.org/donate/thanks',
    },
    // Included in both forms
    shared: {
      /*
       * This is required. It is the email address tied to FreeSewing's PayPal account.
       */
      business: 'info@freesewing.org',
      /*
       * Do not let users include a note. It just clutters up the UI.
       */
      no_note: 1,
      /*
       * This setting means the user will be redirected using GET
       * without any payment variables included. It's the cleanest UI.
       */
      rm: 1,
      /*
       * Image to display on the PayPal checkkout page
       * Should be 150x50 pixels (which is small)
       */
      image_url: 'https://data.freesewing.org/static/img/paypal-logo.png',
    },
  },
}
