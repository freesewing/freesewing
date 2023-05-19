import fs_ from 'fs'
import path from 'path'
import { capitalize } from '../utils.mjs'
import { plugins, designs } from '../../../config/software/index.mjs'
import { header, prebuildOrg } from './org.mjs'

const fs = fs_.promises

const copyFromOrg = [
  'pages/account',
  'pages/confirm',
  'pages/designs',
  'pages/new',
  'pages/signin',
  'pages/signup',
  'pages/welcome',
]

export const prebuildLab = async () => {
  await prebuildOrg('lab')
}
