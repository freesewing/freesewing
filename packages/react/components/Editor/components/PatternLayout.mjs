import React from 'react'
import { useDesignTranslation } from '@freesewing/react/hooks/useDesignTranslation'
import { ZoomContextProvider } from './ZoomablePattern.mjs'
import {
  HeaderMenu,
  HeaderMenuDraftViewDesignOptions,
  HeaderMenuDraftViewCoreSettings,
  HeaderMenuDraftViewUiPreferences,
  HeaderMenuDraftViewFlags,
} from './HeaderMenu.mjs'
import { DesignOptionsMenu } from './menus/DesignOptionsMenu.mjs'
import { CoreSettingsMenu } from './menus/CoreSettingsMenu.mjs'
import { UiPreferencesMenu } from './menus/UiPreferencesMenu.mjs'
import { Accordion } from './Accordion.mjs'

/**
 * A layout for views that include a drafted pattern
 *
 * @param {object} config - The editor configuration
 * @param {object} settings - The pattern settings/state
 * @param {object} ui - The UI settings/state
 * @param {object} update - Object holding methods to manipulate state
 * @param {function} Design - The Design contructor
 * @param {object] pattern - The drafted pattern
 */
export const PatternLayout = (props) => {
  const { menu = null, Design, pattern, update, config, state } = props
  const i18n = useDesignTranslation(Design.designConfig.data.id)
  const flags = props.pattern?.setStores?.[0]?.plugins?.['plugin-annotations']?.flags

  return (
    <ZoomContextProvider>
      <div className="tw-flex tw-flex-col tw-h-full">
        <HeaderMenu
          state={props.state}
          {...{ update, Design, pattern, config, strings: props.strings }}
        />
        <div className="tw-flex lg:tw-flex-row tw-grow lg:tw-max-h-[90vh] tw-max-h-[calc(100vh-3rem)] tw-h-full tw-py-2 lg:tw-mt-2">
          <div className="lg:tw-w-2/3 tw-flex tw-flex-col tw-h-full tw-grow tw-p-2 tw-shadow tw-mx-2">
            {props.output}
          </div>
          {state.ui?.aside ? (
            <div
              className={`tw-hidden xl:tw-block tw-w-1/3 tw-shrink tw-grow-0 lg:tw-p-4 tw-max-w-2xl tw-h-full tw-overflow-scroll`}
            >
              <h5 className="tw-capitalize">{pattern.designConfig.data.id} Options</h5>
              <DesignOptionsMenu {...props} />
              <h5>Core Settings</h5>
              <CoreSettingsMenu {...props} />
              <h5>UI Preferences</h5>
              <UiPreferencesMenu {...props} />
            </div>
          ) : null}
        </div>
      </div>
    </ZoomContextProvider>
  )
}
