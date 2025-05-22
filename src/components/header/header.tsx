import ImgOtomatoLogo from '@/assets/images/img-otomato-logo.png'
import { Link } from 'react-router-dom'
import ConnectButton from '../connect-button/connect-button'

const Header = () => {
  // const smartAccount = useActiveAccount()
  // const { mutate: sendBatch } = useSendBatchTransaction()

  // const handleGetContract = (address: string, chainId: number) => {
  //   console.log(address)

  //   return getContract({
  //     address,
  //     chain: defineChain(chainId),
  //     client,
  //   })
  // }

  // const handleCreateApprovals = () => {
  //   const approvals = getAllApprovals(EnumChain.BASE)
  //   const approvalTransactions = []

  //   for (const [asset, addresses] of Object.entries(approvals)) {
  //     const address = ADDRESS_SYMBOLS[asset as keyof typeof ADDRESS_SYMBOLS]
  //     const contract = handleGetContract(address, EnumChain.BASE)

  //     approvalTransactions.push(
  //       ...addresses.map((address) =>
  //         approve({
  //           contract,
  //           spender: address,
  //           amountWei: MAX_UNIT256,
  //         }),
  //       ),
  //     )
  //   }

  //   return approvalTransactions
  // }

  // const handleApproveSessionKeys = async () => {
  //   const smartAddress = smartAccount?.address || ''
  //   const accountContract = handleGetContract(smartAddress, EnumChain.BASE)

  //   // Generate the session keys
  //   const sessionKeys = getAllSessionKeys(EnumChain.BASE)
  //   const sessionKey = addSessionKey({
  //     contract: accountContract,
  //     account: smartAccount as Account,
  //     sessionKeyAddress: import.meta.env.VITE_THIRDWEB_SESSION_KEY,
  //     permissions: {
  //       approvedTargets: sessionKeys,
  //     },
  //   })

  //   // Generate the approvals

  //   const approvals = handleCreateApprovals() || []
  //   const transactions = [sessionKey, ...approvals]

  //   console.log(sessionKeys, approvals)

  //   // Execute batch transaction
  //   sendBatch(transactions, {
  //     onError: (error: any) => {
  //       alert('Failed to approve session keys:' + ' ' + error.message)
  //     },
  //     onSuccess: () => {
  //       alert('Successfully approved session keys')
  //     },
  //   })
  // }

  return (
    <header className="w-full flex-shrink-0 flex items-center justify-between gap-2 pt-[16px] px-[20px] pb-[20px] relative z-10">
      <div className="flex-shrink-0 w-[40px] h-[40px]">
        <Link to="/">
          <img src={ImgOtomatoLogo} alt="otomato-logo" />
        </Link>
      </div>

      <div className="flex-shrink-0 flex items-center gap-2">
        <ConnectButton />
      </div>
    </header>
  )
}

export default Header
