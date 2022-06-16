import Popout from 'shared/components/popout.js'

const About = () => (
  <Popout tip>
    <h2>What to expect at lab.freesewing.org</h2>
    <p>
      The FreeSewing lab is an online environment to road-test our various patterns/designs.
    </p>
    <p>
      This website runs the bleeding edge of our code base.
      Some patterns here may be unreleased or at various states of being worked on.
      As such, this website is intended for FreeSewing contributors or people interested
      in what happens under the hood.
    </p>
    <p>
      If you want sewing patterns to actually start making something,
      please visit <a
        href="https://freesewing.org/"
        className="text-secondary font-bold hover-text-secondary-focus hover:underline"
      >freesewing.org</a>, our flagship website for makers.
    </p>
    <Popout fixme>
      This lacks translation
    </Popout>
  </Popout>
)

export default About
