import React from 'react'
import { logoPath } from '@freesewing/react/components/Logo'

/*
 * Used inside the pattern editor
 */
export const IconWrapper = ({
  className = 'w-6 h-6',
  stroke = 2,
  children = null,
  fill = false,
  fillOpacity = 1,
  dasharray = null,
  wrapped = true,
}) =>
  wrapped ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill ? 'currentColor' : 'none'}
      fillOpacity={fillOpacity}
      strokeOpacity={fillOpacity}
      viewBox="0 0 24 24"
      strokeWidth={stroke}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dasharray ? dasharray : ''}
      className={className + ' icon'}
    >
      {children}
    </svg>
  ) : (
    <> {children} </>
  )

// Looks like a play triangle
export const ApplyIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
  </IconWrapper>
)

// Looks like a lab beaker
export const BeakerIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
  </IconWrapper>
)

// Looks like a left U-turn that we slightly rotate
export const BackIcon = (props) => (
  <IconWrapper {...props} className={`${props.className || 'w-6 h-h'} -rotate-45`}>
    <path d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
  </IconWrapper>
)

// Looks like a red X
export const BoolNoIcon = ({ size = 6 }) => (
  <NoIcon className={`w-${size} h-${size} text-error`} stroke={4} />
)

// Looks like a green checkbox
export const BoolYesIcon = ({ size = 6 }) => (
  <OkIcon className={`w-${size} h-${size} text-success`} stroke={4} />
)

// Looks like a bookmark
export const BookmarkIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
  </IconWrapper>
)

// Looks lik a speech bubble
export const ChatIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </IconWrapper>
)

// Looks like a circle
export const CircleIcon = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="10" />
  </IconWrapper>
)

// Looks like a X
export const CloseIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M6 18L18 6M6 6l12 12" />
  </IconWrapper>
)

// Looks like a museum building
export const CuratedMeasurementsSetIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
  </IconWrapper>
)

// Looks like a coathanger
export const DesignIcon = (props) => (
  <IconWrapper {...props} stroke={0} fill>
    <path d="m11.975 2.9104c-1.5285 0-2.7845 1.2563-2.7845 2.7848 0 0.7494 0.30048 1.4389 0.78637 1.9394a0.79437 0.79437 0 0 0 0.0084 0.00839c0.38087 0.38087 0.74541 0.62517 0.94538 0.82483 0.19998 0.19966 0.25013 0.2645 0.25013 0.51907v0.65964l-9.1217 5.2665c-0.28478 0.16442-0.83603 0.46612-1.3165 0.9611-0.48047 0.49498-0.92451 1.3399-0.66684 2.2585 0.22026 0.78524 0.7746 1.3486 1.3416 1.5878 0.56697 0.23928 1.0982 0.23415 1.4685 0.23415h18.041c0.37033 0 0.90158 0.0051 1.4686-0.23415 0.56697-0.23928 1.1215-0.80261 1.3418-1.5878 0.25767-0.91859-0.18662-1.7636-0.66709-2.2585-0.48046-0.49498-1.0315-0.79669-1.3162-0.9611l-8.9844-5.1873v-0.73889c0-0.70372-0.35623-1.2837-0.71653-1.6435-0.35778-0.3572-0.70316-0.58503-0.93768-0.81789-0.20864-0.21601-0.33607-0.50298-0.33607-0.83033 0-0.67 0.52595-1.1962 1.1959-1.1962 0.67001 0 1.1962 0.5262 1.1962 1.1962a0.79429 0.79429 0 0 0 0.79434 0.79427 0.79429 0.79429 0 0 0 0.79427-0.79427c0-1.5285-1.2563-2.7848-2.7848-2.7848zm-0.06859 8.2927 8.9919 5.1914c0.28947 0.16712 0.69347 0.41336 0.94393 0.67138 0.25046 0.25803 0.31301 0.3714 0.24754 0.60483-0.10289 0.36677-0.19003 0.40213-0.35969 0.47373-0.16967 0.07161-0.47013 0.09952-0.80336 0.09952h-18.041c-0.33323 0-0.6337-0.02792-0.80336-0.09952-0.16967-0.07161-0.25675-0.10696-0.35963-0.47373-0.06548-0.23342-0.00303-0.3468 0.24748-0.60483 0.25046-0.25803 0.65471-0.50426 0.94418-0.67138z" />
  </IconWrapper>
)

// Looks like a left and right pane with different level of detail
export const DetailIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
  </IconWrapper>
)

// Looks like a document icon
export const DocsIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </IconWrapper>
)

// Looks like a down pointing chevron
export const DownIcon = (props) => (
  <IconWrapper {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.stroke || 2}
      d="M19 9l-7 7-7-7"
    />
  </IconWrapper>
)

// Looks like a pencil
export const EditIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </IconWrapper>
)

// Looks like an envelope
export const EmailIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </IconWrapper>
)

// Looks like FIXME
export const ErrorIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
  </IconWrapper>
)

// Looks like arrows pointing outwards
export const ExpandIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
  </IconWrapper>
)

// Looks like a file/sheet with an arrow pointing downwards
export const ExportIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </IconWrapper>
)

// Looks like a ! in a triangle, is intended to be shown on an error background
export const FailureIcon = ({ size = 6 }) => (
  <NoIcon className={`w-${size} h-${size} text-secondary-content`} stroke={4} />
)

// Looks lik a flag
export const FlagIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
  </IconWrapper>
)

// Looks like skully
export const FreeSewingIcon = (props) => (
  <IconWrapper {...props} stroke={0} fill>
    <path d={logoPath} />
  </IconWrapper>
)

// Looks like a gauge or speedometer
export const GaugeIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M 4.9580501,20.694732 A 9.9588146,9.9588156 45 0 1 4.9523103,6.6165865 9.9588146,9.9588156 45 0 1 19.030446,6.5993628 9.9588146,9.9588156 45 0 1 19.059151,20.67748 Z" />
    <path d="m 13.346899,14.905658 c 0.185287,0.691503 -0.22474,1.402361 -0.916092,1.588212 -0.691356,0.185836 -1.402539,-0.223628 -1.588938,-0.914833 -0.186401,-0.691204 0.222481,-1.402721 0.913533,-1.589686 l 4.660195,-6.2056598 z" />
  </IconWrapper>
)

// Looks like the octocat
export const GitHubIcon = (props) => (
  <IconWrapper {...props} stroke={0} fill>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </IconWrapper>
)

// Looks like the Google G
export const GoogleIcon = (props) => (
  <IconWrapper {...props} fill>
    <path d="M 12.25009,0 C 7.5567085,0 3.5033589,2.69334 1.530043,6.613315 0.71674427,8.240005 0.25,10.06676 0.25,12.00009 c 0,1.93333 0.46674427,3.759905 1.280043,5.386595 C 3.5033589,21.30666 7.5567085,24 12.25009,24 c 3.239959,0 5.959944,-1.066635 7.94668,-2.906575 2.266629,-2.093365 3.573349,-5.173415 3.573349,-8.826735 0,-0.98666 -0.08023,-1.70661 -0.253496,-2.453265 l -11.266533,0 0,4.45322 6.613137,0 c -0.133283,1.106705 -0.853233,2.77333 -2.453266,3.89327 -1.013315,0.706675 -2.373243,1.199975 -4.159871,1.199975 -3.173318,0 -5.8666835,-2.09327 -6.826777,-4.986605 -0.2533286,-0.746655 -0.399991,-1.54657 -0.399991,-2.373195 0,-0.82672 0.1467055,-1.62672 0.386706,-2.373375 C 6.3834495,6.73338 9.076772,4.63993 12.25009,4.63993 c 2.253301,0 3.773228,0.973465 4.639932,1.786855 L 20.27666,3.12004 C 18.196718,1.186705 15.490049,0 12.25009,0 Z" />
  </IconWrapper>
)

// Looks like abox
export const GroupIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </IconWrapper>
)

// Looks like a question mark in a circle
export const HelpIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </IconWrapper>
)

// Looks like a pie with a slice a bit out of it
export const IncludeIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
    <path d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
  </IconWrapper>
)

// Looks like a key
export const KeyIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
  </IconWrapper>
)

// Looks like a rectangle with rounded corners (like a full screen display)
export const KioskIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M 3,17.033898 V 7.2838983 c 0,-1.242641 1.007359,-2.25 2.25,-2.25 h 13.5 c 1.242641,0 2.25,1.007359 2.25,2.25 v 9.7499997 m -18,0 c 0,1.242641 1.007359,2.25 2.25,2.25 h 13.5 c 1.242641,0 2.25,-1.007359 2.25,-2.25" />
  </IconWrapper>
)

// Looks like a left pointing chevron
export const LeftIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M15 19l-7-7 7-7" />
  </IconWrapper>
)

// Looks like a bullet list
export const ListIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </IconWrapper>
)

// Looks like a padlock
export const LockIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </IconWrapper>
)

// Looks like 4 boxes spaces out
export const MarginIcon = (props) => (
  <IconWrapper {...props}>
    <path d="m 2.4889452,14.488945 h 7.0221096 v 7.02211 H 2.4889452 Z M 14.488945,2.4889452 h 7.02211 v 7.0221096 h -7.02211 z m -11.9999998,0 H 9.5110548 V 9.5110548 H 2.4889452 Z M 14.488945,14.488945 h 7.02211 v 7.02211 h -7.02211 z" />
  </IconWrapper>
)

// Looks like a tape measure
export const MeasurementsIcon = (props) => (
  <IconWrapper {...props}>
    <path d="m 23.045963,7.9355562 v 3.7987498 l -0.01469,-0.056 C 23.346411,18.817891 1.2185835,21.36545 1.2185835,21.36545 v -3.836793 m 0.075177,-5.192339 V 8.3573441 M 6.7939469,16.638959 C 5.6484749,16.381008 4.6127423,16.03325 3.7570739,15.581871 2.2780992,14.801689 1.3370697,13.711938 1.2971261,12.241292 M 2.0464728,10.122206 C 4.5831883,3.7286119 20.382021,3.7454996 22.30006,10.110938 M 1.2185835,17.535357 c 0,0 23.2148625,-2.584129 21.7494555,-10.2183133 C 21.611034,0.24754253 2.7448834,0.46882453 1.373585,7.5355232 0.41141246,12.493877 8.5647942,13.74509 15.368311,13.344749 v 1.037311" />
  </IconWrapper>
)

// Looks like two people's heads next/behinf to each other, one bigger, one smaller
export const MeasurementsSetIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </IconWrapper>
)

// Looks like 3 horizontal lines (hamburger menu)
export const MenuIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </IconWrapper>
)

// Looks like a X
export const NoIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M6,6 L 18,18 M 18,6 L 6,18" />
  </IconWrapper>
)

// Looks like a checkmark
export const OkIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M4.5 12.75l6 6 9-13.5" />
  </IconWrapper>
)

// Looks like sliders on a mixing panel
export const OptionsIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </IconWrapper>
)

// Looks like a grid
export const PaperlessIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M 1.5867219,1.58672 H 22.413278 V 22.41328 H 1.5867219 Z" />
    <path
      d="M 22.007133,15.500122 H 1.97864 m 20.028493,-7 H 1.97864 M 15.492887,1.9858756 V 22.014369 m -7,-20.0284934 V 22.014369"
      strokeWidth={props.stroke / 2 || 1.1}
    />
  </IconWrapper>
)

// Looks like a +
export const PlusIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </IconWrapper>
)

// Looks like a printer
export const PrintIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  </IconWrapper>
)

// Looks like a single rewind arrow
export const ResetIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M16 18 l 0 -12 l -8 6 z M 6 6 l 0 12 l 1 0 l 0 -10 z" />
  </IconWrapper>
)

// Looks like a double rewind arrow
export const ResetAllIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 18 l 0 -12 l -8 6 z M 20 18 l 0 -12 l -8 6 z M 2 6 l 0 12 l 1 0 l 0 -10 z" />
  </IconWrapper>
)

// Looks like a right pointing chevron
export const RightIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M9 5l7 7-7 7" />
  </IconWrapper>
)

// Looks like a rocket
export const RocketIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </IconWrapper>
)

// Looks like two arrows in a circular layout
export const RotateIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </IconWrapper>
)

// Looks like a cloud with a plus sign in it
export const SaveIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 24V12.5m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
  </IconWrapper>
)

// Looks like a cloud with a plus sign in it
export const SaveAsIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z M 11.5,10 v6 M 8.5,13 h 6" />
  </IconWrapper>
)

// Looks like a small solid circle with a larger dashed circle around it
export const SaIcon = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="10" strokeDasharray="2 4" />
  </IconWrapper>
)

// Looks like lines of varying thickness
export const ScaleIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M 2 20 h 20" strokeWidth={props.stroke / 2 || 1} />
    <path d="M 2 12 h 20" />
    <path d="M 2 4 h 20" strokeWidth={props.stroke * 2 || 4} />
  </IconWrapper>
)

// Looks like a gear
export const SettingsIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </IconWrapper>
)

// Looks like a spinning circle
export const SpinnerIcon = (props) => (
  <IconWrapper
    {...props}
    className={`${props.className ? props.className : 'h-6 w-6'} animate-spin`}
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-85"
      fill="currentColor"
      stroke="none"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </IconWrapper>
)

// Looks like a white checkbox, intended to be shown on a success-colored background
export const SuccessIcon = ({ size = 6 }) => (
  <OkIcon className={`w-${size} h-${size} text-secondary-content`} stroke={4} />
)

// Looks like a light bulb
export const TipIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </IconWrapper>
)

// Looks like a trashcan
export const TrashIcon = (props) => (
  <IconWrapper {...props} stroke={props.stroke || 2}>
    <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </IconWrapper>
)

// Looks like a desktop screen
export const UiIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
  </IconWrapper>
)

// Looks like a rewind arrow, but takes text to go inside it
export const UndoIcon = (props) => (
  <IconWrapper {...props}>
    <path d="m 2.447878,2.716835 v 4.38448 h 4.38448 M 3.1307,6.882055 c 1.771085,-3.0536 5.075566,-5.10727 8.859706,-5.10727 5.65253,0 10.234811,4.58228 10.234811,10.23481 0,5.65253 -4.582281,10.23481 -10.234811,10.23481 -5.440329,0 -9.889258,-4.24469 -10.215624,-9.60291" />
    {props.text ? (
      <text
        x="12"
        y="17"
        style={{
          fontSize: '15px',
          textAnchor: 'middle',
          fontWeight: 500,
          fill: 'currentColor',
          stroke: 'none',
        }}
      >
        {props.text}
      </text>
    ) : null}
  </IconWrapper>
)

// Looks like a bit of measuring tape
export const UnitsIcon = (props) => (
  <IconWrapper {...props}>
    <path d="m 1.5,4.5 h 21 v 15 h -21 z" />
    <path
      d="m 3.5,19.316406 v -3.708984 z m 2.1035156,0 v -3.708984 z m 2.1035156,0 v -3.708984 z m 2.1035157,0 v -3.708984 z m 4.3789061,0 v -3.708984 z m 2.103516,0 v -3.708984 z m 2.103515,0 v -3.708984 z m 2.103516,0 V 15.607422 Z M 12,19.130859 v -5.082031 z m 0,-8.986328 V 5.0625001 Z M 5.6035156,8.5859371 v -3.708984 z m 12.7929684,0 v -3.708984 z"
      strokeWidth={props.stroke / 2 || 1.1}
    />
  </IconWrapper>
)

// Looks like an up pointing chevron
export const UpIcon = (props) => (
  <IconWrapper {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.stroke || 2}
      d="M19 16l-7 -7-7 7"
    />
  </IconWrapper>
)
// Looks like a cloud with an arrow pointing upwards in it
export const UploadIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
  </IconWrapper>
)

// Looks like a person's face
export const UserIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </IconWrapper>
)

// Looks like old-timey scales
export const UxIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
  </IconWrapper>
)

// Looks like an ! in a triangle
export const WarningIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </IconWrapper>
)

// Looks like a wrench
export const WrenchIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
  </IconWrapper>
)

// Looks like a box in dashed lines
export const XrayIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
  </IconWrapper>
)

// These icons all reuse existing icons
export const ViewDraftIcon = OptionsIcon
export const ViewMeasurementsIcon = MeasurementsIcon
export const ViewTestIcon = BeakerIcon
export const ViewTimingIcon = GaugeIcon
export const ViewPrintLayoutIcon = PrintIcon
export const ViewSaveIcon = SaveIcon
export const ViewExportIcon = ExportIcon
export const ViewEditSettingsIcon = EditIcon
export const ViewLogsIcon = ListIcon
export const ViewInspectIcon = XrayIcon
export const ViewDocsIcon = DocsIcon
export const ViewDesignsIcon = DesignIcon
export const ViewViewPickerIcon = UiIcon
export const ViewUndosIcon = BackIcon
// Flag icons
export const FlagNoteIcon = ChatIcon
export const FlagInfoIcon = DocsIcon
export const FlagTipIcon = TipIcon
export const FlagWarningIcon = WarningIcon
export const FlagErrorIcon = ErrorIcon
export const FlagFixmeIcon = WrenchIcon
export const FlagExpandIcon = ExpandIcon
export const FlagOtionsIcon = OptionsIcon
