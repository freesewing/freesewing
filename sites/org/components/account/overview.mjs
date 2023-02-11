import { useTranslation } from 'next-i18next'
import { FingerprintIcon, HeartIcon, UserIcon } from 'shared/components/icons.mjs'
import { AccountLinks } from './links.mjs'

const AccountStats = ({ account }) => (
  <div className="stats shadow">
    <div className="stat">
      <div className="stat-title">{account.username}</div>
      <div className="stat-value text-primary">{account.username}</div>
      <div className="stat-desc">#{account.id}</div>
      <div className="stat-figure text-primary">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <FingerprintIcon className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>

    <div className="stat">
      <div className="stat-figure text-secondary">
        <HeartIcon className="fill-accent w-8 h-8 stroke-accent" fill />
      </div>
      <div className="stat-title">Patron</div>
      <div className="stat-value">86%</div>
      <div className="stat-desc text-secondary">31 tasks remaining</div>
    </div>
  </div>
)

export const AccountOverview = ({ app }) => {
  const { t } = useTranslation(['account'])
  return (
    <>
      <AccountLinks account={app.account} />
    </>
  )
}

/*
        <pre className="w-64 overflow-scroll whitespace-pre truncate">{`
  id            Int       @id @default(autoincrement())
  apikeys       Apikey[]
  bio           String    @default("")
  compare       Boolean   @default(true)
  confirmations Confirmation[]
  consent       Int       @default(0)
  control       Int       @default(1)
  createdAt     DateTime  @default(now())
  ehash         String    @unique
  email         String
  github        String    @default("")
  ihash         String
  img           String?
  initial       String
  imperial      Boolean   @default(false)
  language      String    @default("en")
  lastLogin     DateTime?
  lusername     String    @unique
  mfaSecret     String    @default("")
  mfaEnabled    Boolean   @default(false)
  newsletter    Boolean   @default(false)
  password      String
  patron        Int       @default(0)
  patterns      Pattern[]
  people        Person[]
  role          String    @default("user")
  status        Int       @default(0)
  updatedAt     DateTime? @updatedAt
  username      String
  `}
    </pre>
 */
