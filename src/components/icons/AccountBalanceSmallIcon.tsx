export const AccountBalanceSmallIcon = () => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask
      id="a"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={24}
    >
      <path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        d="M5.75 17V9.5h1.5V17h-1.5Zm5.5 0V9.5h1.5V17h-1.5Zm-8.475 3.5V19h18.45v1.5H2.775ZM16.75 17V9.5h1.5V17h-1.5ZM2.775 7.5V6.075L12 1.55l9.225 4.525V7.5H2.775ZM6.325 6h11.35L12 3.25 6.325 6Z"
        fill="#1C1B1F"
      />
    </g>
  </svg>
)
