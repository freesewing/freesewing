import { ModalContextProvider } from 'shared/context/modal-context.mjs'
import { LoadingContextProvider } from 'shared/context/loading-context.mjs'
import { NavigationContextProvider } from 'shared/context/navigation-context.mjs'
import { MobileMenubarContextProvider } from 'shared/context/mobile-menubar-context.mjs'

export const ContextWrapper = ({ children }) => (
  <ModalContextProvider>
    <LoadingContextProvider>
      <NavigationContextProvider>
        <MobileMenubarContextProvider>{children}</MobileMenubarContextProvider>
      </NavigationContextProvider>
    </LoadingContextProvider>
  </ModalContextProvider>
)
