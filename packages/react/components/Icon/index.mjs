import React from 'react'
import { logoPath } from '@freesewing/config'

/*
 * Used inside the pattern editor
 */
export const IconWrapper = ({
  className = 'tw-w-6 tw-h-6',
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
  <IconWrapper {...props} className={`${props.className || 'tw-w-6 tw-h-6'} tw--rotate-45`}>
    <path d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
  </IconWrapper>
)

// Looks like a red X
export const BoolNoIcon = ({ size = 6 }) => (
  <NoIcon className={`tw-w-${size} tw-h-${size} tw-text-error`} stroke={4} />
)

// Looks like a green checkbox
export const BoolYesIcon = ({ size = 6 }) => (
  <OkIcon className={`tw-w-${size} tw-h-${size} tw-text-success`} stroke={4} />
)

// Looks like a bookmark
export const BookmarkIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
  </IconWrapper>
)

// Looks like a circle
export const BulletIcon = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="8" />
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
    {props.label ? (
      <text x="12" y="17.5" stroke="none" fill="currentColor" textAnchor="middle">
        {props.label}
      </text>
    ) : null}
  </IconWrapper>
)

// Looks like a female-projecting bathing suit
export const CisFemaleIcon = (props) => (
  <IconWrapper {...props}>
    <path d="m 8.233159,2.5000002 c 0,0 0.03684,1.4367676 0.07562,2.1541457 C 8.413989,6.5901608 7.3671071,6.9496995 7.3372662,8.1692173 7.3029172,9.5719723 8.2152,10.315942 8.255388,12.267223 8.290568,13.973294 7.1739465,15.012709 7.1739465,17.259683 9.46861,17.549817 10.668009,19.205086 11.354231,21.5 h 0.109763 0.93923 0.109803 c 0.686181,-2.294914 1.88558,-3.950183 4.180285,-4.240317 0,-2.246974 -1.116622,-3.286389 -1.081483,-4.99246 0.04015,-1.951281 0.952433,-2.6952507 0.918122,-4.0980057 -0.0298,-1.2195178 -1.076723,-1.5790565 -0.971513,-3.5150714 0.0389,-0.7173781 0.07562,-2.1541457 0.07562,-2.1541457 h -0.722313 c 0,1.5276628 -1.146752,3.7763442 -2.978112,3.7763442 -1.831402,0 -2.978154,-2.2486814 -2.978154,-3.7763442 z" />
  </IconWrapper>
)

// Looks like male-projecting swim trunks
export const CisMaleIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M 6.2021092,6.7988281 C 5.0433189,10.972649 5.2215488,13.211802 5.2215488,16.798828 h 5.8983122 l 0.143133,-1.21128 c 0.331559,-1.834081 0.655671,-2.543616 1.078829,0.07477 l 0.134587,1.136509 h 5.896176 c 0,-3.587026 0.180363,-5.826179 -0.978425,-9.9999999 z" />
  </IconWrapper>
)

// FIXME
export const CloneIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
  </IconWrapper>
)

// Looks like a X
export const CloseIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M6 18L18 6M6 6l12 12" />
  </IconWrapper>
)

// FIXME
export const CompareIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
  </IconWrapper>
)

// Looks like scales of justice
export const ControlIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
  </IconWrapper>
)

// Looks like two rounded squares above each other with a bit of offset
export const CopyIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
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

// Looks like a cloud with an arrow pointing down from it
export const DownloadIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
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
  <NoIcon className={`tw-w-${size} tw-h-${size} tw-text-secondary-content`} stroke={4} />
)

// Looks like a funnel
export const FilterIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </IconWrapper>
)

// Looks like a fingerprint
export const FingerprintIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
  </IconWrapper>
)

// Looks lik an exclamation point inside a circle
export const FixmeIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
  </IconWrapper>
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

// Looks like a heart
export const HeartIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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

// Looks like the Instagram logo
export const InstagramIcon = (props) => (
  <IconWrapper {...props} stroke={0} fill>
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
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

// Looks like a chain link
export const LinkIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
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

// Looks like the Mastodon logo
export const MastodonIcon = (props) => (
  <IconWrapper {...props} fill stroke={0}>
    <path d="m 11.217423,0.1875 c -2.8267978,0.0231106 -5.545964,0.32921539 -7.1306105,1.056962 0,0 -3.14282962,1.4058166 -3.14282962,6.2023445 0,1.0983506 -0.021349,2.4116171 0.013437,3.8043315 0.11412502,4.690743 0.85993502,9.313695 5.19692442,10.461603 1.9996899,0.529281 3.7166529,0.640169 5.0993757,0.564166 2.507534,-0.139021 3.915187,-0.894849 3.915187,-0.894849 l -0.08272,-1.819364 c 0,0 -1.79194,0.564966 -3.804377,0.496111 -1.9938518,-0.06838 -4.0987697,-0.214969 -4.4212502,-2.662908 -0.029782,-0.215025 -0.044673,-0.445024 -0.044673,-0.686494 0,0 1.9573364,0.47844 4.4378282,0.592088 1.516743,0.06957 2.939062,-0.08886 4.383732,-0.261231 2.770451,-0.330816 5.182722,-2.037815 5.485905,-3.597546 0.477704,-2.456993 0.438356,-5.9959075 0.438356,-5.9959075 0,-4.7965279 -3.142655,-6.2023445 -3.142655,-6.2023445 C 16.83453,0.51671539 14.113674,0.21061063 11.286876,0.1875 Z M 8.0182292,3.9352913 c 1.177465,0 2.0690118,0.4525587 2.6585778,1.3578046 l 0.573249,0.9608111 0.573247,-0.9608111 c 0.589448,-0.9052459 1.480995,-1.3578046 2.65858,-1.3578046 1.017594,0 1.837518,0.3577205 2.463657,1.0555661 0.606959,0.6978459 0.909169,1.6411822 0.909169,2.8281631 V 13.626816 H 15.553691 V 7.9896839 c 0,-1.1882914 -0.49996,-1.7914432 -1.500043,-1.7914432 -1.10575,0 -1.659889,0.715401 -1.659889,2.1301529 V 11.413948 H 10.106352 V 8.3283936 c 0,-1.4147519 -0.5543138,-2.1301529 -1.6600628,-2.1301529 -1.000084,0 -1.5000426,0.6031518 -1.5000426,1.7914432 V 13.626816 H 4.6452275 V 7.8190205 c 0,-1.1869809 0.3022656,-2.1303172 0.9093441,-2.8281631 C 6.1805914,4.2930118 7.0005147,3.9352913 8.0182292,3.9352913 Z" />
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

// Looks like a person icon with a + sign
export const NewMeasurementsSetIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
  </IconWrapper>
)

// Looks like page with a + sign in it
export const NewPatternIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </IconWrapper>
)

// Looks like a newspaper
export const NewsletterIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
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

// Looks like a page
export const PatternIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
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

// FIXME
export const PrivacyIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </IconWrapper>
)

// Looks like the Reddit alian
export const RedditIcon = (props) => (
  <IconWrapper {...props} stroke={0} fill>
    <path d="M 11.710829,0.00384705 C 5.0683862,0.16990815 -0.16221405,5.6505729 0.00384705,12.293016 0.16990814,18.686369 5.3178021,23.833614 11.628124,24.082706 18.270567,24.248767 23.833939,19.018167 24,12.375723 V 11.710829 C 23.833939,5.0683862 18.353273,-0.16221404 11.710829,0.00384705 Z m 5.187788,5.10021625 c 0.15698,0.00649 0.313636,0.048326 0.458939,0.1313569 0.581214,0.3321223 0.912687,1.0793971 0.580565,1.660611 C 17.605998,7.4772452 16.858724,7.808718 16.27751,7.4765965 15.862357,7.3105352 15.614238,6.8947339 15.614238,6.3965506 L 13.038995,5.8159854 12.208689,9.55236 c 1.826672,0.08303 3.48858,0.664893 4.651007,1.495199 0.664245,-0.664245 1.826673,-0.664245 2.490917,0 0.332122,0.332121 0.49786,0.747274 0.49786,1.245457 0.249091,0.747275 -0.249092,1.327193 -0.830306,1.576284 v 0.49948 c 0,2.740009 -3.155161,4.897506 -7.057597,4.897506 -3.9024357,0 -7.0575963,-2.157497 -7.0575963,-4.897506 V 13.8693 C 3.9896377,13.454147 3.6578398,12.458754 3.989962,11.545418 c 0.2490916,-0.664245 0.9120387,-1.08037 1.5762832,-0.99734 0.4981831,0 0.9133359,0.167358 1.2454581,0.499481 C 8.2232228,10.134222 9.8848065,9.55236 11.545418,9.55236 l 0.913011,-4.1515273 c 0,-0.083031 0.08271,-0.1654124 0.08271,-0.1654125 0.08303,-0.08303 0.166711,-0.084328 0.249741,-0.084328 l 2.906069,0.664893 C 15.946037,5.3800751 16.427678,5.084603 16.898617,5.1040633 Z M 9.3026198,12.293016 c -0.6642443,0 -1.2454583,0.581214 -1.2454583,1.245458 0,0.664245 0.498183,1.245459 1.2454583,1.245459 0.6642442,0 1.2454582,-0.581214 1.2454582,-1.245459 0,-0.664244 -0.581214,-1.245458 -1.2454582,-1.245458 z m 5.4813132,0 c -0.664245,0 -1.245459,0.581214 -1.245459,1.245458 0,0.664245 0.581214,1.245459 1.245459,1.245459 0.664245,0 1.245458,-0.581214 1.245458,-1.245459 0,-0.664244 -0.581213,-1.245458 -1.245458,-1.245458 z m -5.3872557,3.943952 c -0.072653,0 -0.135249,0.04021 -0.1767645,0.123249 -0.1660605,0.16606 -0.1660605,0.332121 0,0.415152 0.8303052,0.830306 2.4905922,0.914633 2.9887762,0.914633 0.498183,0 2.077061,-0.08433 2.990396,-0.914633 -0.08303,-0.08303 -0.084,-0.249092 -0.167034,-0.415152 -0.166061,-0.166062 -0.332121,-0.166062 -0.415152,0 -0.498183,0.581213 -1.660611,0.747598 -2.490917,0.747598 -0.830305,0 -1.992733,-0.166385 -2.4909165,-0.747598 -0.08303,-0.08303 -0.1657365,-0.123249 -0.2383882,-0.123249 z" />
  </IconWrapper>
)

// FIXME
export const ReloadIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </IconWrapper>
)

// Looks like a backspace key
export const ResetIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
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

// Looks like the RSS symbol
export const RssIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
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

// Looks like a shield
export const ShieldIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </IconWrapper>
)

// Looks like a picture camera
export const ShowcaseIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </IconWrapper>
)

// Looks like an exit door
export const SignoutIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </IconWrapper>
)

// Looks like a spinning circle
export const SpinnerIcon = (props) => (
  <IconWrapper
    {...props}
    className={`${props.className ? props.className : 'tw-h-6 tw-w-6'} tw-animate-spin`}
  >
    <circle
      className="tw-opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="tw-opacity-85"
      fill="currentColor"
      stroke="none"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </IconWrapper>
)

// Looks like a white checkbox, intended to be shown on a success-colored background
export const SuccessIcon = ({ size = 6 }) => (
  <OkIcon className={`tw-w-${size} tw-h-${size} tw-text-secondary-content`} stroke={4} />
)

// Looks like the TikTok t
export const TikTokIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M 21.070629,5.6224629 A 5.7508474,5.7508474 0 0 1 16.547219,0.52913011 V 0 H 12.41376 v 16.404252 a 3.474745,3.474745 0 0 1 -6.2403831,2.091334 l -0.0024,-0.0012 0.0024,0.0012 A 3.4735455,3.4735455 0 0 1 9.9924767,13.084289 V 8.8848362 A 7.5938063,7.5938063 0 0 0 3.5205237,21.713559 7.5950059,7.5950059 0 0 0 16.547219,16.405452 V 8.0233494 a 9.8171151,9.8171151 0 0 0 5.72685,1.8309665 V 5.7472464 A 5.7964413,5.7964413 0 0 1 21.070637,5.6225887 Z" />
  </IconWrapper>
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

// Looks like the twitch logo
export const TwitchIcon = (props) => (
  <IconWrapper {...props} stroke={0} fill>
    <path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z" />
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
