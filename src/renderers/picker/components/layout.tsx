import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Spinner } from '../../shared/components/atoms/spinner'
import { useInstalledApps, useKeyCodeMap } from '../../shared/state/hooks'
import { favAppRef } from '../refs'
import { startedPicker } from '../state/actions'
import AppLogo from './atoms/app-logo'
import Kbd from './atoms/kbd'
import { useKeyboardEvents } from './hooks/use-keyboard-events'
import { AppButton } from './molecules/app-button'
import SupportMessage from './organisms/support-message'
import UrlBar from './organisms/url-bar'

const useAppStarted = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startedPicker())
  }, [dispatch])
}

const App: React.FC = () => {
  /**
   * Tell main that renderer is available
   */
  useAppStarted()

  /**
   * Setup keyboard listeners
   */
  useKeyboardEvents()

  const apps = useInstalledApps()

  const keyCodeMap = useKeyCodeMap()

  return (
    <div className="h-screen w-screen select-none flex flex-col items-center relative dark:text-white">
      {!apps[0] && (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      )}
      <div className="flex-grow w-full flex relative overflow-hidden px-4 py-2">
        <div className="relative flex-grow w-full overflow-y-scroll space-y-2 py-2 pr-4 pl-1">
          {apps.map((app, index) => {
            const key = app.id + index
            return (
              <AppButton
                key={key}
                ref={index === 0 ? favAppRef : null}
                app={app}
                className="flex-shrink-0 flex items-center text-left px-4 py-2 space-x-4 w-full"
              >
                <AppLogo app={app} className="flex-shrink-0 h-8 w-8" />
                {app.hotCode && (
                  <Kbd className="flex-shrink-0">{keyCodeMap[app.hotCode]}</Kbd>
                )}
                <span>{app.name}</span>
              </AppButton>
            )
          })}
        </div>
      </div>
      <UrlBar />
      <SupportMessage />
    </div>
  )
}

export default App
