// Dependencies
import { linkClasses } from '@freesewing/utils'
// Hooks
import React, { useEffect, useState } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'

export const PleaseSubscribe = (props = {}) => (
  <div
    className={`tw-max-w-7xl tw-m-auto tw-px-0 tw--mt-12 tw-mb-24 ${props.dense ? '' : 'md:tw-my-24'}`}
  >
    <div className="tw-p-1 tw-bg-gradient-to-tr tw-from-neutral tw-to-primary tw-mt-12 tw-rounded-none md:tw-rounded-lg lg:tw-rounded-xl md:tw-shadow tw-text-neutral-content tw-p-8 lg:tw-px-12 md:tw-py-0">
      <div className="tw-flex tw-flex-col md:tw-gap-2 lg:tw-gap-12 md:tw-grid md:tw-grid-cols-2">
        <Plea />
        <div className="tw--mt-8 md:tw-mt-0 tw-pt-0 md:tw-pt-8 tw-pb-8 lg:tw-py-12 tw-max-w-prose tw-m-auto tw-w-full tw-m-auto">
          <h2 className="tw-text-inherit">Support FreeSewing</h2>
          <Subscribe {...props} />
        </div>
      </div>
    </div>
  </div>
)

export const Plea = () => (
  <div className="md:tw-pt-8 tw-pb-8 lg:tw-py-12 tw-max-w-prose tw-w-full tw-m-auto">
    <h2 className="tw-text-inherit tw-mb-4">
      Hi friend
      <span role="img"> 👋</span>
    </h2>
    {[
      'My name is Joost De Cock. I am the founder and maintainer of FreeSewing.',
      'I am here to ask your help. Or more accurately, your support. Which we really need.',
      'If you think FreeSewing is worthwhile, and if you can spare a few coins each month without hardship, please support our work.',
      'Thanks in advance for considering it.',
      'love',
    ].map((txt, i) => (
      <p className="tw-text-inherit tw-font-medium tw-mb-2" key={i}>
        {txt}
      </p>
    ))}
    <Joost className="tw-ml-12 tw--mt-8 tw-w-32" />
  </div>
)

const PaypalFormBody = ({ amount, period, currency }) => (
  <>
    {[
      ...Object.entries(paypalConfig.vars[period === 'x' ? 'donate' : 'subscribe']),
      ...Object.entries(paypalConfig.vars.shared),
    ].map(([name, value]) => (
      <input type="hidden" {...{ name, value }} key={name} />
    ))}
    {period === 'x' ? (
      <>
        <input type="hidden" name="item_number" value={`donate-${amount}-${currency}`} />
        <input type="hidden" name="amount" value={amount} />
      </>
    ) : (
      <>
        <input
          type="hidden"
          name="item_number"
          value={`subscribe-${amount}-${currency}-${period}`}
        />
        <input type="hidden" name="p3" value={period === '3m' ? 3 : period === '6m' ? 6 : 1} />
        <input type="hidden" name="t3" value={period === 'w' ? 'W' : period === 'y' ? 'Y' : 'M'} />
        <input type="hidden" name="a3" value={amount} />
      </>
    )}
    <input type="hidden" name="currency_code" value={currency.toUpperCase()} />
    <input type="hidden" name="lc" value="en_US" />
  </>
)

export const Subscribe = ({
  color = 'secondary',
  subscribeOnly,
  amountPreset = '25',
  periodPreset = 'm',
}) => {
  const [amount, setAmount] = useState(amountPreset)
  const [currency, setCurrency] = useState('eur')
  const [period, setPeriod] = useState(periodPreset)

  const { amounts, currencies } = paypalConfig
  const periods = subscribeOnly
    ? paypalConfig.periods.filter((p) => p !== 'x')
    : paypalConfig.periods

  return (
    <div className="tw-w-full">
      <div className="tw-flex tw-flex-row tw-gap-2">
        <div className="tw-daisy-form-control tw-w-full">
          <label className="tw-daisy-label">
            <span className="tw-daisy-label-text-alt tw-text-inherit">Your Contribution</span>
          </label>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Enter amount here"
            pattern="[0-9]+([.][0-9]+)?"
            className="tw-daisy-input tw-daisy-input-bordered tw-w-full tw-text-base-content"
            value={amount}
            onChange={(evt) => setAmount(evt.target.value)}
          />
        </div>
        <div className="tw-form-control tw-w-24">
          <label className="tw-daisy-label">
            <span className="tw-daisy-label-text-alt tw-text-inherit">Currency</span>
          </label>
          <select
            className="tw-daisy-select tw-daisy-select-bordered tw-text-base-content"
            defaultValue={currency}
            onChange={(evt) => setCurrency(evt.target.value)}
          >
            {currencies.sort().map((cur) => (
              <option value={cur} key={cur}>
                {cur.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="tw-daisy-label">
          <div className="tw-daisy-label-text-alt tw-text-inherit tw-flex tw-flex-row tw-flex-wrap tw-gap-1">
            <span className="tw-hidden lg:tw-inline">Presets:</span>
            {amounts.map((val) => (
              <button
                key={val}
                className="tw-font-bold tw-underline tw-decoration-2 tw-px-1 hover:tw-decoration-4"
                onClick={() => setAmount(val)}
              >
                {val}
              </button>
            ))}
          </div>
        </label>
      </div>
      <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-2 tw-mt-2">
        {periods.map((val) => (
          <div
            className={`tw-daisy-form-control tw-border tw-border-solid tw-border-inherit tw-rounded tw-px-1 tw-flex tw-flex-col tw-justify-center ${
              period === val ? 'tw-bg-base-100 tw-text-base-content' : ''
            }`}
            key={val}
          >
            <label className="tw-daisy-label tw-cursor-pointer tw-py-1.5 tw-flex tw-flex-row tw-gap-2 tw-items-center tw-overflow-clip tw-justify-start">
              <input
                type="radio"
                name="period"
                className={`tw-daisy-radio checked:tw-bg-${color} tw-border-${color} tw-daisy-radio-xs lg:tw-daisy-radio-sm tw-bg-secondary/20`}
                value={val}
                onChange={() => setPeriod(val)}
                checked={val === period ? 1 : 0}
              />
              <span
                className={`tw-daisy-label-text tw-text-inherit tw-text-xs lg:tw-text-sm ${
                  val === period ? 'tw-font-bold' : ''
                }`}
              >
                {paypalConfig.periodLabels[val]}
              </span>
            </label>
          </div>
        ))}
      </div>
      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_top"
        id={'form-tier'}
        className="monthly"
      >
        <PaypalFormBody {...{ currency, amount, period }} />
        <button
          className={`tw-daisy-btn tw-daisy-btn-${color} tw-w-full tw-mt-4`}
          disabled={!(Number(amount) > 0)}
          type="submit"
        >
          {period === 'x' ? 'Donate' : 'Subscribe'}
        </button>
        <p className="tw-text-center tw-text-sm tw-text-neutral-content tw-mt-2 tw-opacity-80">
          Don&apos;t have a PayPal account?
          <a href="https://ko-fi.com/freesewing" target="_BLANK" className={linkClasses}>
            <b className="tw-text-neutral-content tw-pl-2">Ko-fi.com/FreeSewing</b>
          </a>
        </p>
      </form>
    </div>
  )
}

export const Joost = ({ className = 'tw-w-32', stroke = 0 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="2 3 82 53"
    stroke="currentColor"
    strokeWidth={stroke}
    className={className}
  >
    <path d="m 66.263452,24.338843 c -0.249707,-0.135259 -0.424208,0.135315 -0.58157,0.356293 -1.031714,1.450233 -1.593797,2.24449 -2.395918,3.330642 -0.578953,-0.345763 -1.665537,-0.850594 -2.254082,-1.210059 -0.414508,-0.253227 -1.04996,-0.196576 -0.904962,0.229373 0.712974,2.099939 0.955296,3.437405 0.527894,5.696519 0.02837,0.507153 0.563802,0.453788 0.770617,-0.02296 0.599331,-1.387695 1.30516,-2.457235 2.132335,-3.677809 1.72324,1.043054 2.524569,1.541887 4.892372,3.349448 0.221299,0.169213 0.531541,0.339094 0.726951,0.142524 0.195455,-0.196555 0.174485,-0.493084 -0.04684,-0.66228 -2.47745,-1.891267 -3.344594,-2.403043 -5.13223,-3.481687 0.802923,-1.074302 1.387355,-1.93031 2.434907,-3.402816 0.158122,-0.221963 0.08209,-0.512285 -0.169475,-0.647144 z m -4.913072,3.570174 c 0.294104,0.17613 1.199616,0.654531 1.492187,0.829376 -0.377011,0.584774 -0.865904,1.481805 -1.279211,1.938473 -0.02113,-0.603388 -0.07817,-2.102396 -0.212986,-2.76785 z M 10.945943,5.5629392 C 10.24524,5.3072666 9.4956492,5.2166095 8.7594788,5.3259125 7.8177952,5.4657237 6.9856199,6.0861899 6.2609085,6.9383222 6.1378134,6.9885384 6.0249223,6.9958728 5.9036536,7.0523472 5.1531423,7.4018675 4.444644,7.8693278 4.0046502,8.5295901 3.5646562,9.1898533 3.4496127,10.067426 3.8781553,10.984429 c 0.8138608,1.741505 2.2410262,2.505534 3.7001795,2.568868 1.4591541,0.06333 3.1042132,-0.692711 4.2700492,-1.483668 1.17077,-0.794302 1.703731,-1.569503 1.891119,-2.5581933 C 13.926892,8.5227451 13.588716,7.5353142 12.84526,6.7872041 12.299964,6.238483 11.646644,5.8186176 10.945943,5.5629441 Z m -0.281282,0.7834285 c 0.581666,0.2125524 1.131346,0.5620132 1.59198,1.0255421 0.58232,0.5859638 0.803414,1.2661838 0.666945,1.9862146 C 12.787117,10.078156 12.267505,10.865852 11.2286,11.570692 10.184764,12.278878 8.8281546,12.778514 7.6150047,12.725857 6.4018554,12.673204 5.3303197,12.136723 4.6283622,10.634668 4.2989999,9.9298935 4.3862518,9.4486435 4.692819,8.9886025 4.7872334,8.8469265 5.032207,8.754614 5.1734831,8.6234159 5.1088426,8.8269452 5.2094718,9.0462682 5.4059064,9.1300214 6.1043001,9.094751 6.3741929,8.1293862 6.7432825,7.6468372 7.6762072,6.9234363 9.2674621,7.362181 9.8262162,6.8471447 9.9239055,6.6396081 9.63782,6.4866779 9.4299705,6.3896581 9.120295,6.2682324 8.7909748,6.3019974 8.583978,6.2827993 9.2119019,5.9803926 10.105674,6.1475915 10.664665,6.3463389 Z M 57.562154,26.999459 c -0.20758,-0.181861 -0.413721,0.075 -0.59576,0.282432 -1.193759,1.361479 -1.870218,2.315578 -2.514825,3.414694 -0.475902,-0.455474 -1.004805,-0.697896 -1.487257,-1.169308 -0.339779,-0.332067 -0.935079,-0.373323 -0.872666,0.09766 0.306,2.321529 0.305657,3.766519 -0.466295,6.074529 -0.05866,0.537862 0.44386,0.566681 0.714286,0.09808 0.784674,-1.364296 1.621256,-2.497119 2.296332,-3.774647 1.414182,1.370327 2.843159,2.776027 4.723677,5.052603 0.175711,0.213068 0.433306,0.440947 0.646346,0.265199 0.213075,-0.175703 0.243347,-0.490872 0.06761,-0.703922 -1.9676,-2.382003 -3.496138,-3.911929 -4.963734,-5.329895 0.633811,-1.105599 1.288183,-2.217589 2.500265,-3.599972 0.182907,-0.208343 0.161381,-0.525725 -0.04798,-0.70746 z m -4.487112,3.728124 c 0.241674,0.231878 0.670643,0.533364 0.911118,0.763653 -0.25859,0.478067 -0.95067,1.720943 -1.177806,2.180972 0.0814,-0.637923 0.279641,-2.223406 0.266688,-2.944625 z m 23.382716,-9.315581 c -0.215102,-0.173015 -0.529716,-0.138981 -0.702835,0.07604 -1.167977,0.819038 -1.963427,2.087633 -2.899882,3.186067 -0.915769,-0.474507 -1.525598,-0.601701 -2.74738,-1.423601 -0.465939,-0.410757 -0.689319,0.01906 -0.714967,0.394234 l -0.106643,2.68198 -0.308605,3.017333 c -0.03138,0.486746 0.581416,0.72584 0.887964,0.346453 l 3.204677,-4.003507 3.097666,1.778172 c 0.235238,0.144349 0.54295,0.07082 0.687481,-0.164329 0.144355,-0.235239 -0.292248,-0.344641 -0.527381,-0.489169 l -2.729531,-1.708415 c 0.832653,-1.088021 1.557287,-2.335335 2.6773,-2.99959 0.173016,-0.215101 0.397151,-0.518551 0.182133,-0.691669 z m -6.376491,2.731077 2.222817,1.215685 -2.523597,3.137955 0.215973,-2.14071 z m 11.269816,2.765381 c 0,0 -1.896807,-0.07604 -2.535714,0.502088 -0.09511,0.08605 -0.111905,0.368034 -0.111905,0.368034 L 53.19911,36.945256 22.541252,48.314433 c -0.260656,0.09237 -0.718413,-0.02255 -0.625523,0.237971 0.09237,0.260662 0.557413,0.588858 0.817882,0.495965 L 54.088936,37.576115 81.684491,27.851428 c 0.260651,-0.09237 0.396834,-0.378784 0.303931,-0.639252 -0.09248,-0.259532 -0.377467,-0.395349 -0.637299,-0.303711 z M 74.266723,5.4544987 23.150528,19.902101 c -0.266031,0.07451 -0.588498,0.30531 -0.513823,0.571295 0.07451,0.266036 0.496665,0.376195 0.762649,0.301516 0,0 21.256554,-5.960067 34.962706,-9.616876 5.83505,-1.5567946 12.894962,-3.3288481 13.835549,-3.5793887 1.893005,-0.5042326 2.3392,-1.1609795 2.3392,-1.1609795 0.26603,-0.074507 0.421218,-0.3506441 0.346542,-0.6166264 C 74.808844,5.5350103 74.532707,5.3798216 74.266723,5.4544987 Z M 35.810681,7.7140231 c -0.194821,0.198584 -0.266279,0.2323957 -0.202144,0.5003988 2.481746,10.3419881 4.703548,20.8602281 9.956455,28.4438711 0.157451,0.226449 0.468537,0.282635 0.695257,0.125572 0.226459,-0.157446 0.282655,-0.46853 0.125593,-0.695257 C 44.054,32.722133 42.453079,28.711957 40.985508,24.359912 39.252072,19.219453 37.769681,13.601557 36.424806,7.9971651 36.360022,7.7283128 36.184884,7.4760464 35.810681,7.7140231 Z M 35.484514,25.434228 c -0.778683,0.142239 -1.607934,0.462982 -2.354842,0.913358 -0.74691,0.450376 -1.415135,1.028584 -1.828314,1.733147 -0.41318,0.704563 -0.541571,1.582245 -0.148499,2.407071 0.442909,0.929402 1.435559,1.281333 2.463457,1.344533 1.027903,0.06316 2.184591,-0.117182 3.285884,-0.310259 1.101293,-0.193078 2.151677,-0.400788 2.867113,-0.429449 0.357717,-0.01431 0.626236,0.02609 0.73474,0.07316 0.232065,0.508967 -0.422339,1.332616 -0.772043,1.627185 -0.589153,0.486764 -1.440353,0.918561 -2.308275,1.258872 -1.735843,0.680622 -3.00081,1.0681 -3.00081,1.0681 -0.27196,0.0498 -0.965008,0.250196 -0.914737,0.522068 0.04993,0.270967 0.309673,0.450472 0.580796,0.401382 0,0 1.849074,-0.335385 3.699019,-1.06074 0.924974,-0.362688 1.855474,-0.819272 2.580318,-1.418145 0.724843,-0.598872 1.272509,-1.393547 1.220399,-2.342147 -0.02348,-0.427485 -0.328956,-0.816951 -0.685893,-0.971916 -0.356937,-0.154965 -0.743084,-0.174489 -1.173294,-0.157279 -0.860427,0.03446 -1.916451,0.255369 -3.000696,0.445464 -1.084243,0.190086 -2.191986,0.348865 -3.052229,0.295977 -0.860249,-0.05284 -1.379922,-0.271966 -1.620689,-0.777198 -0.249189,-0.522895 -0.182256,-0.974819 0.109192,-1.471808 0.291449,-0.496988 0.837345,-0.993916 1.481008,-1.382037 0.643662,-0.388121 1.380699,-0.668879 2.017582,-0.78522 0.636883,-0.116332 1.078779,-0.193506 1.281242,-0.05374 0.227332,0.156451 0.613852,0.254648 0.770506,0.02747 0.156453,-0.227338 0.09914,-0.538438 -0.128056,-0.695095 -0.577147,-0.398454 -1.324195,-0.404986 -2.102881,-0.262728 z m -3.661155,4.389854 c -0.07791,-0.009 -0.151166,0.04906 -0.160173,0.126976 -0.009,0.07788 0.04884,0.153112 0.126753,0.162119 0.07791,0.009 0.151395,-0.05105 0.160397,-0.128924 0.009,-0.07788 -0.04906,-0.151164 -0.126977,-0.160171 z m -0.0029,0.02523 c 0.06413,0.0074 0.114023,0.06815 0.106611,0.132258 -0.0074,0.06417 -0.07006,0.113807 -0.1342,0.106392 -0.06413,-0.0074 -0.111863,-0.06981 -0.104445,-0.13398 0.0074,-0.06417 0.0679,-0.112084 0.132034,-0.10467 z m -8.69e-4,0.120628 a 0.01255052,0.01255052 0 0 1 -0.01391,0.01108 0.01255052,0.01255052 0 0 1 -0.01102,-0.01396 0.01255052,0.01255052 0 0 1 0.0139,-0.01098 0.01255052,0.01255052 0 0 1 0.01103,0.01386 z m -0.01756,-0.148328 c -0.07791,-0.009 -0.151166,0.04906 -0.160172,0.126976 -0.009,0.07788 0.04884,0.153112 0.126752,0.162119 0.07791,0.009 0.151395,-0.05105 0.160397,-0.128924 0.009,-0.07788 -0.04906,-0.151164 -0.126977,-0.160171 z m -0.0029,0.02523 c 0.06413,0.0074 0.112082,0.06792 0.10467,0.132034 -0.0074,0.06417 -0.06813,0.114031 -0.132259,0.106617 -0.06413,-0.0074 -0.111864,-0.06981 -0.104445,-0.133981 0.0074,-0.06417 0.0679,-0.112084 0.132034,-0.10467 z m -0.0015,0.120555 a 0.01255052,0.01255052 0 0 1 -0.01391,0.01108 0.01255052,0.01255052 0 0 1 -0.01102,-0.01396 0.01255052,0.01255052 0 0 1 0.0139,-0.01098 0.01255052,0.01255052 0 0 1 0.01103,0.01386 z m 5.474005,-4.021825 c -0.07791,-0.009 -0.151166,0.04907 -0.160173,0.126976 -0.009,0.07788 0.04907,0.151164 0.126978,0.160171 0.07791,0.009 0.151165,-0.04906 0.160172,-0.126976 0.009,-0.07788 -0.04906,-0.151165 -0.126977,-0.160171 z m -0.0029,0.02523 c 0.06413,0.0074 0.112082,0.06792 0.104671,0.132034 -0.0074,0.06417 -0.06812,0.114021 -0.132259,0.106607 -0.06413,-0.0074 -0.111863,-0.06981 -0.104447,-0.133971 0.0074,-0.06417 0.0679,-0.112084 0.132035,-0.10467 z m -0.0014,0.12015 a 0.01255052,0.01255052 0 0 1 -0.01391,0.01108 0.01255052,0.01255052 0 0 1 -0.01102,-0.01396 0.01255052,0.01255052 0 0 1 0.01391,-0.01107 0.01255052,0.01255052 0 0 1 0.01102,0.01396 z m -7.582997,1.555104 c -0.655483,-0.180529 -1.396604,-0.210979 -2.201502,-0.05591 -1.660021,0.319873 -2.596384,1.491645 -3.079382,2.67383 -0.195805,0.479245 -0.187689,0.777681 -0.285853,1.231168 -0.741615,1.624673 -0.531057,3.290987 0.309689,4.532349 1.074303,1.586214 3.075453,2.538452 5.093982,2.077244 1.319499,-0.301497 2.227575,-1.15023 2.726906,-2.226972 0.499331,-1.076751 0.635997,-2.36964 0.577649,-3.704271 -0.06064,-1.387161 -0.542037,-2.683801 -1.458824,-3.572019 -0.458394,-0.444099 -1.027182,-0.774886 -1.682665,-0.955414 z m -0.265423,0.95239 c 0.495047,0.135748 0.906603,0.386449 1.251682,0.720769 0.690156,0.668649 1.270345,1.674431 1.322022,2.856485 0.05397,1.234576 -0.253676,2.423321 -0.651268,3.280674 -0.397593,0.857364 -1.18949,1.525937 -2.225694,1.762698 -1.582973,0.361688 -3.006887,-0.491998 -3.860655,-1.752583 -0.38947,-0.57506 -0.571283,-1.258752 -0.5818,-1.974405 0.0022,-0.0018 0.0044,-0.0035 0.0066,-0.0053 0.03335,-0.176046 0.1245,-0.47865 0.159032,-0.695328 0.12724,-0.648558 0.160431,-0.918865 0.734295,-1.598359 0.167393,-0.202587 0.278041,-0.890089 0.08745,-1.071023 0.41281,-0.73246 1.059066,-1.424232 2.101569,-1.625112 0.674942,-0.130062 1.161834,-0.03445 1.656875,0.101342 z m -7.001816,0.905035 c -0.614481,-0.0813 -1.261817,-0.03396 -1.907521,0.139286 -1.905698,0.511297 -3.500762,1.698065 -4.146132,3.295671 -0.06139,0.151976 0.01998,0.336753 -0.02182,0.494909 -0.0534,0.187528 -0.113509,0.35597 -0.155718,0.581676 -0.14003,0.748743 -0.210731,1.690272 -0.105118,2.644091 0.105612,0.953818 0.386456,1.928116 1.002827,2.703357 0.616373,0.775242 1.588429,1.313521 2.882922,1.355667 2.479325,0.08071 4.194456,-0.915123 5.156052,-2.337425 0.961594,-1.422292 0.933868,-4.424226 0.712305,-6.000055 -0.222742,-1.58419 -0.681882,-1.564043 -1.709534,-2.245183 -0.513827,-0.340569 -1.09378,-0.55065 -1.708256,-0.631993 z m -0.135952,0.988981 c 0.473247,0.06175 0.908503,0.22374 1.291583,0.477652 0.766164,0.507814 1.349617,1.398972 1.540937,2.759665 0.192495,1.369063 -0.03608,2.933202 -0.818995,4.091225 -0.782916,1.158013 -2.059965,2.129335 -4.268937,2.057416 -1.049654,-0.03417 -1.708219,-0.570683 -2.158568,-1.137108 -0.329412,-0.414319 -0.447941,-1.021146 -0.579343,-1.604485 0.266208,0.372596 0.342278,0.755263 0.7284,1.114451 0.201904,0.188403 0.518313,0.177446 0.706704,-0.02447 0.188046,-0.202464 0.176215,-0.519068 -0.02641,-0.70693 -1.446816,-1.345903 -1.681629,-2.571849 -1.435295,-3.673509 0.03958,-0.154567 0.07868,-0.338796 0.118231,-0.444443 0.07093,-0.189468 0.212774,-0.289702 0.05713,-0.188043 0.12052,-0.0817 0.199455,-0.211816 0.216191,-0.356431 0.613996,-0.998727 1.210826,-1.889401 2.642262,-2.273459 0.529953,-0.142182 1.512921,-0.153707 1.986119,-0.09153 z M 9.910375,14.912119 c -0.2681387,0.0633 -0.3056812,0.39689 -0.2432632,0.665233 3.8892562,16.692683 4.7151752,28.015699 5.4619222,38.467198 0.0198,0.275346 0.358649,0.44342 0.634004,0.423731 0.27535,-0.01981 0.628627,-0.272895 0.608944,-0.548247 -0.748523,-10.476368 -2.016686,-21.870712 -5.918336,-38.61659 -0.06316,-0.269171 -0.27421,-0.454953 -0.543271,-0.391325 z" />
  </svg>
)

const paypalConfig = {
  /*
   * This is the plan ID for FreeSewing Patron Subscriptions.
   * Note that to maximize flexibility, and have a sort of pay-what-you-wnat
   * system, we have only 1 plan: 1 euro/month.
   *
   * But we use quantity pricing. So if a person selects a 15/month plan,
   * we subscribe them to the 1/month plan but set the quantity to 15.
   */
  planId: 'P-41W64036N5201172WMTEKMIA',
  /*
   * List of amounts we display
   * (users can also enter their own amount, which we'll floor to an int)
   */
  amounts: [5, 10, 15, 25, 50, 75, 100],
  /*
   * Currencies supported by PayPal that we use
   * https://developer.paypal.com/api/nvp-soap/currency-codes#paypal
   */
  currencies: ['aud', 'cad', 'eur', 'usd'],
  /*
   * Periods for recurring payments
   * x means donation, not subscription
   */
  periods: ['w', 'm', '3m', '6m', 'y', 'x'],
  periodLabels: {
    w: 'Weekly',
    m: 'Monthly',
    '3m': 'Quarterly',
    '6m': 'Half-yearly',
    y: 'Yearly',
    x: 'One time only',
  },
  /*
   * Variables to set in the form
   * https://developer.paypal.com/api/nvp-soap/paypal-payments-standard/integration-guide/Appx-websitestandard-htmlvariables/
   */
  vars: {
    // Subscribe form
    subscribe: {
      /*
       * This value indicates it is a subscribe button that was clicked
       */
      cmd: '_xclick-subscriptions',
      /*
       * Item name as shown to the user
       *
       * Will be replaced with the translated value at run time, but this is
       * here as a safe default.
       */
      item_name: 'FreeSewing Patron Subscription',
      /*
       * Return URL the user will be redirected to after completion
       * of the payment.
       */
      return: 'https://freesewing.org/patrons/thanks',
      /*
       * This needs to be set to 1 to indicate that recurring
       * payments should be collected.
       */
      src: 1,
    },
    // Donate form
    donate: {
      /*
       * This value indicates it is a donate button that was clicked
       */
      cmd: '_donations',
      /*
       * Item name as shown to the user
       *
       * Will be replaced with the translated value at run time, but this is
       * here as a safe default.
       */
      item_name: 'FreeSewing Donation',
      /*
       * Return URL the user will be redirected to after completion
       * of the payment.
       */
      return: 'https://freesewing.org/donate/thanks',
    },
    // Included in both forms
    shared: {
      /*
       * This is required. It is the email address tied to FreeSewing's PayPal account.
       */
      business: 'info@freesewing.org',
      /*
       * Do not let users include a note. It just clutters up the UI.
       */
      no_note: 1,
      /*
       * This setting means the user will be redirected using GET
       * without any payment variables included. It's the cleanest UI.
       */
      rm: 1,
      /*
       * Image to display on the PayPal checkkout page
       * Should be 150x50 pixels (which is small)
       */
      image_url: 'https://data.freesewing.org/static/img/paypal-logo.png',
    },
  },
}
