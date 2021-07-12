const npm = 'https://www.npmjs.com/package/@freesewing'
const shields = 'https://img.shields.io'
const pkg = '@freesewing'
const repo = 'https://github.com/freesewing/freesewing'
const org = 'https://freesewing.org'

const PatternPage = ({ pattern }) => {
  const Pattern = pattern.charAt(0).toUpperCase() + pattern.slice(1)

  return (
    <>
      <div className="flex flex-row gap-2">
        <a
          href={`${npm}/${pattern}`}
          title={`${pkg}/${pattern} on NPM`}
        >
          <img
            src={`${shields}/npm/v/${pkg}/${pattern}.svg`}
            alt={`${pkg}/${pattern} on NPM`}
          />
        </a>
        <a href="https://opensource.org/licenses/MIT" title="License: MIT">
          <img
            src={`${shields}/npm/l/${pkg}/${pattern}.svg?label=License`}
            alt="License: MIT"
          />
        </a>
        <a
          href="https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256"
          title="Code quality on DeepScan"
        >
          <img
            src="https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg"
            alt="Code quality on DeepScan"
          />
        </a>
        <a
          href={`${repo}/tree/develop/packages/${pattern}`}
          title={`Open issues tagged 📦 ${pattern}`}
        >
          <img
            src={`${shields}/github/issues/freesewing/freesewing/:package:%20${pattern}?label=%F0%9F%93%A6%20${pattern}%20issues`}
            alt={`Open issues tagged 📦 ${pattern}`}
          />
        </a>
      </div>
      <p>This is the FreeSewing {Pattern} pattern:</p>
        <ul>
          <li>
            <a href={`${org}/designs/${pattern}`}>{Pattern} on FreeSewing.org</a>
          </li>
          <li>
            <a href={`${org}/showcase/designs/${pattern}`}>{Pattern} examples</a>
          </li>
          <li>
            <a href={`${org}/docs/patterns/${pattern}`}>{Pattern} documentation</a>
          </li>
          <li>
            <a href={`${npm}/${pattern}`}>Package on NPM</a>
          </li>
          <li>
            <a href={`${repo}/tree/develop/packages/${pattern}`}>Code on GitHub</a>
          </li>
        </ul>
      </>
  )
}

export default PatternPage


