import { useEffect, useState } from 'react'

export const useLink = () => {
  const [linkInstance, setLinkInstance] = useState<any>()
  const [isLinkLoading, setIsLinkLoading] = useState(false)
  const [isLinkOpen, setIsLinkOpen] = useState(false)

  const openLink = () => {
    if (!linkInstance) {
      return setIsLinkLoading(true)
    }

    linkInstance.open()
    setIsLinkOpen(true)
  }

  useEffect(() => {
    if (linkInstance && isLinkLoading === true) {
      setIsLinkLoading(false)
      linkInstance.open()
      setIsLinkOpen(true)
    }
  }, [isLinkLoading, linkInstance])

  return {
    linkInstance,
    isLinkOpen,
    isLinkLoading,
    setLinkInstance,
    setIsLinkOpen,
    openLink,
  }
}
