import { Principal } from "@dfinity/principal"
import {
  Memo,
  SubAccount,
  TimeStamp,
} from "../../../declarations/icp_ledger/icp_ledger.did"
export type AccountIdentifier = string
export interface ICPTs {
  e8s: bigint
}

export interface SendArgs {
  to: AccountIdentifier
  fee: ICPTs
  memo: Memo
  from_subaccount: [] | [SubAccount]
  created_at_time: [] | [TimeStamp]
  amount: ICPTs
}
