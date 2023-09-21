import { ModalContextProvider } from 'shared/context/modal-context.mjs'
import { LoadingStatusContextProvider } from 'shared/context/loading-status-context.mjs'
import { NavigationContextProvider } from 'shared/context/navigation-context.mjs'
import { MobileMenubarContextProvider } from 'shared/context/mobile-menubar-context.mjs'

export const ContextWrapper = ({ children }) => (
  <ModalContextProvider>
    <LoadingStatusContextProvider>
      <NavigationContextProvider>
        <MobileMenubarContextProvider>{children}</MobileMenubarContextProvider>
      </NavigationContextProvider>
    </LoadingStatusContextProvider>
  </ModalContextProvider>
)
