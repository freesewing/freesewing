import React from 'react'
import Workbench from 'workbench'
import freesewing from "freesewing";
import Aaron from "@freesewing/aaron";
import Brian from "@freesewing/brian";
import bundle from "@freesewing/plugin-bundle";

export default props => <Workbench
  freesewing={freesewing}
  patterns={{
    Aaron,
    Brian
  }}
  plugins={{bundle}}
/>
