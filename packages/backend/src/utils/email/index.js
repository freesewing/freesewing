import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { log } from "../../utils";
import config from "../../config";
import { email as i18n } from "@freesewing/i18n";
import fo from "@freesewing/i18n";
import templates from "../../templates";

const email = {};

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: 587,
  secure: false, // Only needed or SSL, not for TLS
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass
  }
});

const loadTemplate = (type, format, language) => {
  let template = templates.header[format]
    + templates[type][format]
    + templates.footer[format];
  let toTranslate = templates[type].i18n
    .concat(templates.footer.i18n);
  let from = [];
  let to = [];
  for (let key of toTranslate) {
    from.push(`__${key}__`);
    to.push(i18n[language][key] || key);
  }
  for(let id in from) template = template.replace(from[id], to[id]);

  return template;
}

const replace = (text, from, to) => {
  for(let id in from) text = text.replace(from[id], to[id] || from[id]);

  return text;
}


email.signup = (recipient, language, id) => {
  let html = loadTemplate("signup", "html", language);
  let text = loadTemplate("signup", "text", language);
  let from = [
    '__signupActionLink__',
    '__headerOpeningLine__',
    '__hiddenIntro__',
    '__footerWhy__',
  ];
  let to = [
    `${config.website}/confirm/signup/${id}`,
    i18n[language].signupHeaderOpeningLine,
    i18n[language].signupHiddenIntro,
    i18n[language].signupWhy,
  ];
  html = replace(html, from, to);
  text = replace(text, from, to);

	let options = {
    from: `"${i18n[language].joostFromFreesewing}" <info@freesewing.org>`,
    to: recipient,
    subject: i18n[language].signupSubject,
    text,
    html
  };
	transporter.sendMail(options, (error, info) => {
    if (error) return console.log(error);
		console.log('Message sent', info);
  });
}

email.emailchange = (newAddress, currentAddress, language, id) => {
  let html = loadTemplate("emailchange", "html", language);
  let text = loadTemplate("emailchange", "text", language);
  let from = [
    '__emailchangeActionLink__',
    '__headerOpeningLine__',
    '__hiddenIntro__',
    '__footerWhy__',
  ];
  let to = [
    `${config.website}/confirm/email/${id}`,
    i18n[language].emailchangeHeaderOpeningLine,
    i18n[language].emailchangeHiddenIntro,
    i18n[language].emailchangeWhy,
  ];
  html = replace(html, from, to);
  text = replace(text, from, to);

	let options = {
    from: `"${i18n[language].joostFromFreesewing}" <info@freesewing.org>`,
    to: newAddress,
    cc: currentAddress,
    subject: i18n[language].emailchangeSubject,
    text,
    html
  };
	transporter.sendMail(options, (error, info) => {
    if (error) return console.log(error);
		console.log('Message sent', info);
  });
}

email.passwordreset = (recipient, language, id) => {
  let html = loadTemplate("passwordreset", "html", language);
  let text = loadTemplate("passwordreset", "text", language);
  let from = [
    '__passwordresetActionLink__',
    '__headerOpeningLine__',
    '__hiddenIntro__',
    '__footerWhy__',
  ];
  let to = [
    `${config.website}/confirm/reset/${id}`,
    i18n[language].passwordresetHeaderOpeningLine,
    i18n[language].passwordresetHiddenIntro,
    i18n[language].passwordresetWhy,
  ];
  html = replace(html, from, to);
  text = replace(text, from, to);

	let options = {
    from: `"${i18n[language].joostFromFreesewing}" <info@freesewing.org>`,
    to: recipient,
    subject: i18n[language].passwordresetSubject,
    text,
    html
  };
	transporter.sendMail(options, (error, info) => {
    if (error) return console.log(error);
		console.log('Message sent', info);
  });
}

email.goodbye = async (recipient, language) => {
  let html = loadTemplate("goodbye", "html", language);
  let text = loadTemplate("goodbye", "text", language);
  let from = [
    '__headerOpeningLine__',
    '__hiddenIntro__',
    '__footerWhy__',
  ];
  let to = [
    i18n[language].goodbyeHeaderOpeningLine,
    i18n[language].goodbyeHiddenIntro,
    i18n[language].goodbyeWhy,
  ];
  html = replace(html, from, to);
  text = replace(text, from, to);

	let options = {
    from: `"${i18n[language].joostFromFreesewing}" <info@freesewing.org>`,
    to: recipient,
    subject: i18n[language].goodbyeSubject,
    text,
    html
  };
	await transporter.sendMail(options, (error, info) => {
    if (error) return console.log(error);
		console.log('Message sent', info);
    return true;
  });
}

export default email;
