const opacity = {
  light: 70,
  dark: 60,
  hax0r: 90,
  lgbtq: 80,
}

export const SusiWrapper = ({ theme, children, error = false }) => (
  <section
    style={{
      backgroundImage: `url('https://static.freesewing.org/img/splash/${theme || 'light'}.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: '40% 50%',
    }}
    className="m-0 p-0 shadow drop-shadow-lg w-full h-screen"
  >
    <div className="flex flex-col items-center justify-center h-screen mt-4 lg:mt-12 max-w-md m-auto pb-32">
      <div
        className={`${error ? 'bg-error' : 'bg-neutral'} bg-opacity-${
          opacity[theme]
        } text-neutral-content rounded-none sm:rounded-lg py-4 px-8 drop-shadow w-full`}
      >
        {children}
      </div>
    </div>
  </section>
)
