// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useState, useContext } from 'react'
// Components
import { ChoiceButton } from 'shared/components/choice-button.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { WebLink } from 'shared/components/link.mjs'

export const ns = ['translation', 'locales']

/*
 * Note that this is not a list of all languages.
 * Instead it is a list of languages that are supported by DeepL
 * and not yet available (Our Crowdin is integrated with DeepL.
 */
const languages = [
  'Bulgarian',
  'Chinese (simplified)',
  'Czech',
  'Danish',
  'Estonian',
  'Finnish',
  'Greek',
  'Hungarian',
  'Indonesian',
  'Italian',
  'Japanese',
  'Korean',
  'Latvian',
  'Lithuanian',
  'Norwegian',
  'Polish',
  'Portuguese',
  'Romanian',
  'Russian',
  'Slovak',
  'Slovenian',
  'Swedish',
  'Turkish',
]

export const SuggestLanguageForm = () => {
  // Hooks
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [language, setLanguage] = useState(false)
  const [sent, setSent] = useState(false)
  const [help, setHelp] = useState(0)
  const [friends, setFriends] = useState(0)
  const [comments, setComments] = useState('')

  const sendSuggestion = async () => {
    setLoadingStatus([true, 'status:contactingBackend'])
    const result = await backend.sendLanguageSuggestion({ language, help, friends, comments })
    if (result.success) {
      setSent(true)
      setLoadingStatus([true, 'status:nailedIt', true, true])
    } else setLoadingStatus([true, 'status:backendError', true, false])
  }

  if (sent)
    return (
      <>
        <Popout note>
          <h5>Suggestion submitted</h5>
          <p>
            We will get back to you shortly. Thank you for taking an interest in bringing FreeSewing
            to more people, specifically the {language} community.
          </p>
        </Popout>
      </>
    )

  return (
    <>
      <h5 className="mt-4">In what language would you like make FreeSewing available?</h5>
      <select
        className="select select-bordered w-full border-neutral"
        onChange={(evt) => setLanguage(evt.target.value)}
      >
        <option value="">Please choose a language</option>
        {languages.map((l) => (
          <option value={l} key={l}>
            {l}
          </option>
        ))}
      </select>
      {language ? (
        <>
          <h5 className="mt-4">
            Do you plan to (help) translate FreeSewing to this language yourself?
          </h5>
          <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2">
            <ChoiceButton noMargin title="Yes, I do" onClick={() => setHelp(1)} active={help === 1}>
              <span>I am able and willing to help out with translation</span>
            </ChoiceButton>
            <ChoiceButton
              noMargin
              title="No, I do not"
              onClick={() => setHelp(-1)}
              active={help === -1}
            >
              <span>I do not intent to help out with translation</span>
            </ChoiceButton>
          </div>
        </>
      ) : (
        <Popout tip>
          <h5>Are you looking to suggest a language that is not in the list?</h5>
          <p>
            The list of languages above does obviously not include <em>all</em> languages. Instead,
            it is limimted to the list of langauges that are supported by{' '}
            <WebLink href="https://www.deepl.com/" txt="DeepL" />, a machine-learning tool that can
            help translators with suggestions that make for an efficient translation experience.
          </p>
          <p>
            It is always possible to translate to another language by translating everything by
            hand. However, we estimate that the amount of people out there who are willing to take
            on such a task is a rounding error.
          </p>
          <p>
            If you are committed to translating FreeSewing to a language not in the list above,
            please <WebLink href="https://discord.freesewing.org/" txt="please readh out to us" />.
          </p>
        </Popout>
      )}
      {language && help < 0 && (
        <Popout note>
          <h5>Thank you for your suggestion</h5>
          <p>
            We appreciate that you would like to see FreeSewing translated to {language}.
            <br />
            However, since you are unable to make a commitment yourself, we will not process your
            suggestion.
          </p>
          <p>
            We rely on the community to provide translation. We encourage you to find people in the{' '}
            {language} maker/sewing community who may want to take an active part in translating
            FreeSewing into {language}.
          </p>
          <p>You can then send those people to this same page to suggest {language} again.</p>
        </Popout>
      )}
      {language && help > 0 && (
        <>
          <h5 className="mt-4">Do you have friends who can help?</h5>
          <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2">
            <ChoiceButton
              noMargin
              title="Hell yeah I do"
              onClick={() => setFriends(1)}
              active={friends === 1}
            >
              <span>And they want to help out too!</span>
            </ChoiceButton>
            <ChoiceButton
              noMargin
              title="Not really"
              onClick={() => setFriends(-1)}
              active={friends === -1}
            >
              <span>But maybe others will join my effort?</span>
            </ChoiceButton>
          </div>
        </>
      )}
      {language && help > 0 && friends !== 0 && (
        <>
          <h5 className="mt-4">Any comments you would like to add?</h5>
          <textarea
            value={comments}
            placeholder="Type your commnents here"
            className="textarea textarea-bordered w-full border border-neutral"
            onChange={(evt) => setComments(evt.target.value)}
          />
          <p className="mt-8 text-center">
            <button className="btn btn-primary" onClick={sendSuggestion}>
              Submit Suggestion
            </button>
          </p>
        </>
      )}
    </>
  )
}
