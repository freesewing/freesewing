// Line breaks
const nl = "\n"
const nl2 = "\n\n"

export const templates = {
  emailChange: t => [
    t.emailchangeTitle,
    t.emailchangeCopy1,
    t.emailchangeActionLink,
    t.questionsJustReply,
  ].join(nl2),
  goodbye: t => [
    goodbyeTitle,
    goodbyeCopy1,
  ].join(nl2),
  newsletterSubscribe: t => `Confirm your newsletter subscription.${nl}
Somebody asked to subscribe this email address to the FreeSewing newsletter.
If it was you, please click below to confirm your subscription:${nl}
${t.newsletterConfirmationLink}${nl}`,
  newsletterWelcome: t => `You are now subscribed to the FreeSewing newsletter${nl}
If you'd like to catch up, we keep an online archive of previous editions at: https://freesewing.org/newsletter/${nl}
You can unsubscribe at any time by visiting this link: ${t.newsletterUnsubscribeLink}${nl}`,
  passwordReset: t => [
    t.passwordresetTitle,
    t.passwordresetCopy1,
    t.passwordresetActionLink,
    t.questionsJustReply,
  ].join(nl2),
  signup: (t, to, url) => [
    t.signupCopy1,
    t.signupCopy2,
    url,
    t.questionsJustReply,
    'joost',
    '--',
    `${t.signupWhy} [${to}]`,
  ].join(nl2),
}
