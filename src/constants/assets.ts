import { EnumChain } from "@/configs/chain";

export const MAX_UNIT256 = 115792089237316195423570985008687907853269984665640564039457584007913129639935n

export const ASSETS = new Map<number, Record<string, { sessionKeys: string[]; approvals: string[] }>>([
  [
    EnumChain.BASE,
    {
      USDC: {
        sessionKeys: [
          '0x4e65fE4DbA92790696d040ac24Aa414708F5c0AB',
          '0xb125E6687d4313864e53df431d5425969c15Eb2F',
          '0xEdc817A28E8B93B03976FBd4a3dDBc9f7D176c22',
          '0xfBb21d0380beE3312B33c4353c8936a0F13EF26C',
          '0xeE8F4eC5672F09119b96Ab6fB59C27E1b7e44b61',
          '0xdB90A4e973B7663ce0Ccc32B6FbD37ffb19BfA83',
          '0xcdDCDd18A16ED441F6CB10c3909e5e7ec2B9e8f3',
          '0xCd347c1e7d600a9A3e403497562eDd0A7Bc3Ef21',
          '0xc1256Ae5FF1cf2719D4937adb3bbCCab2E00A2Ca',
          '0xc0c5689e6f4D256E861F65465b691aeEcC0dEb12',
          '0xBeeFa74640a5f7c28966cbA82466EED5609444E0',
          '0xbeeF010f9cb27031ad51e3333f9aF9C6B1228183',
          '0xB7890CEE6CF4792cdCC13489D36D9d42726ab863',
          '0x7BfA7C4f149E7415b73bdeDfe609237e29CBF34A',
          '0x616a4E1db48e22028f6bbf20444Cd3b8e3273738',
          '0x23479229e52Ab6aaD312D0B03DF9F33B46753B5e',
          '0x1D3b1Cd0a0f242d598834b3F2d126dC6bd774657',
          '0x12AFDeFb2237a5963e7BAb3e2D46ad0eee70406e',
          '0x0FaBfEAcedf47e890c50C8120177fff69C6a1d9B',
        ],
        approvals: [
          '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5',
          '0xb125E6687d4313864e53df431d5425969c15Eb2F',
          '0xeE8F4eC5672F09119b96Ab6fB59C27E1b7e44b61',
          '0xdB90A4e973B7663ce0Ccc32B6FbD37ffb19BfA83',
          '0xcdDCDd18A16ED441F6CB10c3909e5e7ec2B9e8f3',
          '0xCd347c1e7d600a9A3e403497562eDd0A7Bc3Ef21',
          '0xc1256Ae5FF1cf2719D4937adb3bbCCab2E00A2Ca',
          '0xc0c5689e6f4D256E861F65465b691aeEcC0dEb12',
          '0xBeeFa74640a5f7c28966cbA82466EED5609444E0',
          '0xbeeF010f9cb27031ad51e3333f9aF9C6B1228183',
          '0xB7890CEE6CF4792cdCC13489D36D9d42726ab863',
          '0x7BfA7C4f149E7415b73bdeDfe609237e29CBF34A',
          '0x616a4E1db48e22028f6bbf20444Cd3b8e3273738',
          '0x23479229e52Ab6aaD312D0B03DF9F33B46753B5e',
          '0x1D3b1Cd0a0f242d598834b3F2d126dC6bd774657',
          '0x12AFDeFb2237a5963e7BAb3e2D46ad0eee70406e',
          '0x0FaBfEAcedf47e890c50C8120177fff69C6a1d9B',
          '0xEdc817A28E8B93B03976FBd4a3dDBc9f7D176c22',
        ],
      },
      cbBTC: {
        sessionKeys: [
          '0xBdb9300b7CDE636d9cD4AFF00f6F009fFBBc8EE6',
          '0x6770216aC60F634483Ec073cBABC4011c94307Cb',
          '0x5a47C803488FE2BB0A0EAaf346b420e4dF22F3C7',
          '0x543257eF2161176D7C8cD90BA65C2d4CaEF5a796',
          '0xF877ACaFA28c19b96727966690b2f44d35aD5976',
          '0xfBb21d0380beE3312B33c4353c8936a0F13EF26C',
        ],
        approvals: [
          '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5',
          '0x6770216aC60F634483Ec073cBABC4011c94307Cb',
          '0x5a47C803488FE2BB0A0EAaf346b420e4dF22F3C7',
          '0x543257eF2161176D7C8cD90BA65C2d4CaEF5a796',
          '0xF877ACaFA28c19b96727966690b2f44d35aD5976',
        ],
      },
      WETH: {
        sessionKeys: [
          '0x46e6b214b524310239732D51387075E0e70970bf',
          '0xD4a0e0b9149BCee3C920d2E00b5dE09138fd8bb7',
          '0x628ff693426583D9a7FB391E54366292F509D457',
          '0xfBb21d0380beE3312B33c4353c8936a0F13EF26C',
          '0xF540D790413FCFAedAC93518Ae99EdDacE82cb78',
          '0xbEEf050a7485865A7a8d8Ca0CC5f7536b7a3443e',
          '0xA2Cac0023a4797b4729Db94783405189a4203AFc',
          '0xa0E430870c4604CcfC7B38Ca7845B1FF653D0ff1',
          '0x9aB2d181E4b87ba57D5eD564D3eF652C4E710707',
          '0x80D9964fEb4A507dD697b4437Fc5b25b618CE446',
          '0x70F796946eD919E4Bc6cD506F8dACC45E4539771',
          '0x6b13c060F13Af1fdB319F52315BbbF3fb1D88844',
          '0x5A32099837D89E3a794a44fb131CBbAD41f87a8C',
          '0x5496b42ad0deCebFab0db944D83260e60D54f667',
          '0x27D8c7273fd3fcC6956a0B370cE5Fd4A7fc65c18',
        ],
        approvals: [
          '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5',
          '0x46e6b214b524310239732D51387075E0e70970bf',
          '0x628ff693426583D9a7FB391E54366292F509D457',
          '0xF540D790413FCFAedAC93518Ae99EdDacE82cb78',
          '0xbEEf050a7485865A7a8d8Ca0CC5f7536b7a3443e',
          '0xA2Cac0023a4797b4729Db94783405189a4203AFc',
          '0xa0E430870c4604CcfC7B38Ca7845B1FF653D0ff1',
          '0x9aB2d181E4b87ba57D5eD564D3eF652C4E710707',
          '0x80D9964fEb4A507dD697b4437Fc5b25b618CE446',
          '0x70F796946eD919E4Bc6cD506F8dACC45E4539771',
          '0x6b13c060F13Af1fdB319F52315BbbF3fb1D88844',
          '0x5A32099837D89E3a794a44fb131CBbAD41f87a8C',
          '0x5496b42ad0deCebFab0db944D83260e60D54f667',
          '0x27D8c7273fd3fcC6956a0B370cE5Fd4A7fc65c18',
        ],
      },
    },
  ],
])

export const ADDRESS_SYMBOLS = {
  USDC: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
  cbBTC: '0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf',
  WETH: '0x4200000000000000000000000000000000000006',
}

export const getAllSessionKeys = (networkId: EnumChain): string[] => {
  const chainData = ASSETS.get(networkId)
  if (!chainData) return []

  return Object.values(chainData).flatMap((asset) => asset.sessionKeys)
}

export type ApprovalResult = Record<string, string[]>

export const getAllApprovals = (networkId: EnumChain): ApprovalResult => {
  const chainData = ASSETS.get(networkId)
  if (!chainData) return {}

  const result: ApprovalResult = {}
  Object.entries(chainData).forEach(([asset, addresses]) => {
    result[asset] = addresses.approvals as string[]
  })

  return result
}