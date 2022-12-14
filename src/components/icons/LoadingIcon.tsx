export const LoadingIcon = () => (
  <svg width={64} height={64} fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask
      id="a"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={64}
      height={64}
    >
      <path fill="#D9D9D9" d="M0 0h64v64H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        d="M32.067 52.8c-5.645 0-10.5-2.033-14.567-6.1s-6.1-8.922-6.1-14.567v-4l-5.733 5.734-2-2 9.2-9.2 9.266 9.2-2 2-5.733-5.734v4c0 4.845 1.733 8.99 5.2 12.434 3.467 3.444 7.622 5.166 12.467 5.166 1.2 0 2.377-.1 3.533-.3 1.156-.2 2.222-.522 3.2-.966l2.2 2.2c-1.467.755-2.933 1.3-4.4 1.633-1.467.333-2.978.5-4.533.5Zm19.066-11.4-9.2-9.2L44 30.133l5.667 5.734v-3.734c0-4.889-1.734-9.055-5.2-12.5C41 16.19 36.844 14.467 32 14.467a18.5 18.5 0 0 0-3.567.333 23.735 23.735 0 0 0-3.233.867l-2.133-2.2a17.945 17.945 0 0 1 4.366-1.534A22.268 22.268 0 0 1 32 11.467c5.645 0 10.5 2.022 14.567 6.066 4.066 4.045 6.1 8.912 6.1 14.6v3.8L58.4 30.2l2 2-9.267 9.2Z"
        fill="#1C1B1F"
      />
    </g>
  </svg>
)
