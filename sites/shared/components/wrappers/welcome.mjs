export const WelcomeWrapper = ({ children }) => (
  <section className="m-0 p-0 w-full">
    <div className="flex flex-col items-center justify-start min-h-screen mt-4 lg:mt-32 max-w-lg m-auto">
      <div className="w-full text-left">{children}</div>
    </div>
  </section>
)
