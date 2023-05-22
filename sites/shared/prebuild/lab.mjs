import { prebuildOrg } from './org.mjs'

//const copyFromOrg = [
//  'pages/account',
//  'pages/confirm',
//  'pages/designs',
//  'pages/new',
//  'pages/signin',
//  'pages/signup',
//  'pages/welcome',
//]

export const prebuildLab = async () => {
  await prebuildOrg('lab')
}
