import { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import { animation } from 'utils/animation'
import { ThemeProvider } from '@material-tailwind/react'
import { BASE_PATH } from 'consts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ErrorBoundary } from 'react-error-boundary'
import { Button } from 'components/button'
import { Subheading } from 'components/typography'
import { useSetAtom } from 'jotai'
import axios from 'axios'
import Script from 'next/script'
import { linkScriptLoadedAtom } from 'stores/global'
import { clearCookies } from 'hooks/use-cleanup'

axios.defaults.baseURL = BASE_PATH

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function ErrorFallback({ resetErrorBoundary }: any) {
  return (
    <div role="alert" className="p-4">
      <Subheading>Something went wrong</Subheading>
      <div className="mt-8">
        <Button onClick={resetErrorBoundary}>Try again</Button>
      </div>
    </div>
  )
}

const customTheme = {
  tooltip: {
    styles: {
      base: {
        bg: 'bg-white',
        color: 'text-black',
      },
    },
  },
}

const queryClient = new QueryClient()

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  const setIsLinkScriptLoaded = useSetAtom(linkScriptLoadedAtom)

  return getLayout(
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes"
        />
        <meta property="title" content="Loan App" />
        <meta
          name="description"
          content="Implement a modern loan application powered by income data."
        />
        <title>Loan App</title>

        <link rel="manifest" href={BASE_PATH + '/manifest.json'} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={BASE_PATH + '/apple-touch-icon.png'}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={BASE_PATH + '/favicon-32x32.png'}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={BASE_PATH + '/favicon-16x16.png'}
        />

        <link
          rel="preload"
          href={BASE_PATH + '/fonts/CircularXXWebLight.woff2'}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={BASE_PATH + '/fonts/CircularXXWebMedium.woff2'}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={BASE_PATH + '/fonts/CircularXXWebRegular.woff2'}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Script
        src="https://plugin.argyle.com/argyle.web.v3.js"
        onLoad={() => setIsLinkScriptLoaded(true)}
      />
      <QueryClientProvider client={queryClient}>
        <LazyMotion features={domAnimation}>
          <AnimatePresence exitBeforeEnter={false}>
            <m.div
              key={router.route.concat(animation.name)}
              style={{
                height: '100%',
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animation.variants}
              transition={animation.transition}
            >
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={async () => {
                  clearCookies()
                }}
              >
                <ThemeProvider value={customTheme}>
                  <Component {...pageProps} />
                </ThemeProvider>
              </ErrorBoundary>
            </m.div>
          </AnimatePresence>
        </LazyMotion>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
