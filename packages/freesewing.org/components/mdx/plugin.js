const npm = 'https://www.npmjs.com/package/@freesewing/plugin-'
const shields = 'https://img.shields.io'
const pkg = '@freesewing/plugin-'
const repo = 'https://github.com/freesewing/freesewing'

const PluginPage = ({ plugin }) => (
  <>
  <div className="flex flex-row gap-2">
    <a
      href={`${npm}${plugin}`}
      title={`${pkg}${plugin} on NPM`}
    >
      <img
        src={`${shields}/npm/v/${pkg}${plugin}.svg`}
        alt={`${pkg}${plugin} on NPM`}
      />
    </a>
    <a href="https://opensource.org/licenses/MIT" title="License: MIT">
      <img
        src={`${shields}/npm/l/${pkg}${plugin}.svg?label=License`}
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
      href={`${repo}/tree/develop/packages/plugin-${plugin}`}
      title={`Open issues tagged 📦 plugin-${plugin}`}
    >
      <img
        src={`${shields}/github/issues/freesewing/freesewing/:package:%20${plugin}?label=%F0%9F%93%A6%20plugin-${plugin}%20issues`}
        alt={`Open issues tagged 📦 plugin-${plugin}`}
      />
    </a>
  </div>
  <p>This is the {plugin} plugin:</p>
    <ul>
      <li>
        <a href={`/reference/plugins/${plugin}`}>plugin-{plugin} documentation</a>
      </li>
      <li>
        <a href={`${npm}${plugin}`}>Package on NPM</a>
      </li>
      <li>
        <a href={`${repo}/tree/develop/packages/plugin-${plugin}`}>Code on GitHub</a>
      </li>
    </ul>
  </>
)

export default PluginPage


