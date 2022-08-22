import { useMemo } from 'react'

const useTruncatedAddress = (account) => {
  return useMemo(
    () => `${account?.substr(0, 6)}...${account?.substr(-4)}`,
    [account],
  )
}

export default useTruncatedAddress
