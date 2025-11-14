import {
  FindConfig,
  IModuleService,
  RestoreReturn,
  SoftDeleteReturn,
} from "@medusajs/framework/types";
import {
  CashbackAccountDTO,
  CashbackAmountDTO,
  CashbackDTO,
  CashbackTransactionDTO,
  FilterableCashbackAccountProps,
  FilterableCashbackAmountProps,
  FilterableCashbackProps,
  FilterableCashbackTransactionProps,
} from "./common";
import { Context } from "@medusajs/framework/opentelemetry/api";
import {
  CreateCashbackAccountDTO,
  CreateCashbackAmountDTO,
  CreateCashbackDTO,
  CreateCashbackTransactionDTO,
  UpdateCashbackAccountDTO,
  UpdateCashbackAmountDTO,
  UpdateCashbackDTO,
} from "./mutations";

export interface ICashbackModuleService extends IModuleService {
  retrieveCashback(
    id: string,
    config?: FindConfig<CashbackDTO>,
    sharedContext?: Context,
  ): Promise<CashbackDTO>;

  retrieveCashbackAmount(
    id: string,
    config?: FindConfig<CashbackAmountDTO>,
    sharedContext?: Context,
  ): Promise<CashbackAmountDTO>;

  retrieveCashbackAccount(
    id: string,
    config?: FindConfig<CashbackAccountDTO>,
    sharedContext?: Context,
  ): Promise<CashbackAccountDTO>;

  retrieveCashbackTransaction(
    id: string,
    config?: FindConfig<CashbackTransactionDTO>,
    sharedContext?: Context,
  ): Promise<CashbackTransactionDTO>;

  listCashbacks(
    filters?: FilterableCashbackProps,
    config?: FindConfig<CashbackDTO>,
    sharedContext?: Context,
  ): Promise<CashbackDTO[]>;

  listCashbackAmounts(
    filters?: FilterableCashbackAmountProps,
    config?: FindConfig<CashbackAmountDTO>,
    sharedContext?: Context,
  ): Promise<CashbackAmountDTO[]>;

  listCashbackAccounts(
    filters?: FilterableCashbackAccountProps,
    config?: FindConfig<CashbackAccountDTO>,
    sharedContext?: Context,
  ): Promise<CashbackAccountDTO[]>;

  listCashbackTransactions(
    filters?: FilterableCashbackTransactionProps,
    config?: FindConfig<CashbackTransactionDTO>,
    sharedContext?: Context,
  ): Promise<CashbackTransactionDTO[]>;

  listAndCountCashbacks(
    filters?: FilterableCashbackProps,
    config?: FindConfig<CashbackDTO>,
    sharedContext?: Context,
  ): Promise<[CashbackDTO[], number]>;

  listAndCountCashbackAmounts(
    filters?: FilterableCashbackAmountProps,
    config?: FindConfig<CashbackAmountDTO>,
    sharedContext?: Context,
  ): Promise<[CashbackAmountDTO[], number]>;

  listAndCountCashbackAccounts(
    filters?: FilterableCashbackAccountProps,
    config?: FindConfig<CashbackAccountDTO>,
    sharedContext?: Context,
  ): Promise<[CashbackAccountDTO[], number]>;

  listAndCountCashbackTransactions(
    filters?: FilterableCashbackTransactionProps,
    config?: FindConfig<CashbackTransactionDTO>,
    sharedContext?: Context,
  ): Promise<[CashbackTransactionDTO[], number]>;

  createCashbacks(
    data: CreateCashbackDTO,
    sharedContext?: Context,
  ): Promise<CashbackDTO>;

  createCashbacks(
    data: CreateCashbackDTO[],
    sharedContext?: Context,
  ): Promise<CashbackDTO[]>;

  createCashbackAmounts(
    data: CreateCashbackAmountDTO,
    sharedContext?: Context,
  ): Promise<CashbackAmountDTO>;

  createCashbackAmounts(
    data: CreateCashbackAmountDTO[],
    sharedContext?: Context,
  ): Promise<CashbackAmountDTO[]>;

  createCashbackAccounts(
    data: CreateCashbackAccountDTO,
    sharedContext?: Context,
  ): Promise<CashbackAccountDTO>;

  createCashbackAccounts(
    data: CreateCashbackAccountDTO[],
    sharedContext?: Context,
  ): Promise<CashbackAccountDTO[]>;

  createCashbackTransactions(
    data: CreateCashbackTransactionDTO,
    sharedContext?: Context,
  ): Promise<CashbackTransactionDTO>;

  createCashbackTransactions(
    data: CreateCashbackTransactionDTO[],
    sharedContext?: Context,
  ): Promise<CashbackTransactionDTO[]>;

  updateCashbacks(
    data: UpdateCashbackDTO,
    sharedContext?: Context,
  ): Promise<CashbackDTO>;

  updateCashbacks(
    data: UpdateCashbackDTO[],
    sharedContext?: Context,
  ): Promise<CashbackDTO[]>;

  updateCashbackAmounts(
    data: UpdateCashbackAmountDTO,
    sharedContext?: Context,
  ): Promise<CashbackAmountDTO>;

  updateCashbackAmounts(
    data: UpdateCashbackAmountDTO[],
    sharedContext?: Context,
  ): Promise<CashbackAmountDTO[]>;

  updateCashbackAccounts(
    data: UpdateCashbackAccountDTO,
    sharedContext?: Context,
  ): Promise<CashbackAccountDTO>;

  updateCashbackAccounts(
    data: UpdateCashbackAccountDTO[],
    sharedContext?: Context,
  ): Promise<CashbackAccountDTO[]>;

  softDeleteCashbacks<TReturnableLinkableKeys extends string = string>(
    ids: string[],
    config?: SoftDeleteReturn<TReturnableLinkableKeys>,
    sharedContext?: Context,
  ): Promise<Record<string, string[]> | void>;

  softDeleteCashbackAmounts<TReturnableLinkableKeys extends string = string>(
    ids: string[],
    config?: SoftDeleteReturn<TReturnableLinkableKeys>,
    sharedContext?: Context,
  ): Promise<Record<string, string[]> | void>;

  softDeleteCashbackAccounts<TReturnableLinkableKeys extends string = string>(
    ids: string[],
    config?: SoftDeleteReturn<TReturnableLinkableKeys>,
    sharedContext?: Context,
  ): Promise<Record<string, string[]> | void>;

  softDeleteCashbackTransactions<
    TReturnableLinkableKeys extends string = string,
  >(
    ids: string[],
    config?: SoftDeleteReturn<TReturnableLinkableKeys>,
    sharedContext?: Context,
  ): Promise<Record<string, string[]> | void>;

  deleteCashbacks(ids: string[], sharedContext?: Context): Promise<void>;

  deleteCashbackAmounts(ids: string[], sharedContext?: Context): Promise<void>;

  deleteCashbackAccounts(ids: string[], sharedContext?: Context): Promise<void>;

  deleteCashbackTransactions(
    ids: string[],
    sharedContext?: Context,
  ): Promise<void>;

  restoreCashbacks<TReturnableLinkableKeys extends string = string>(
    ids: string[],
    config?: RestoreReturn<TReturnableLinkableKeys>,
    sharedContext?: Context,
  ): Promise<Record<string, string[]> | void>;

  restoreCashbackAmounts<TReturnableLinkableKeys extends string = string>(
    ids: string[],
    config?: RestoreReturn<TReturnableLinkableKeys>,
    sharedContext?: Context,
  ): Promise<Record<string, string[]> | void>;

  restoreCashbackTransactions<TReturnableLinkableKeys extends string = string>(
    ids: string[],
    config?: RestoreReturn<TReturnableLinkableKeys>,
    sharedContext?: Context,
  ): Promise<Record<string, string[]> | void>;

  restoreCashbackAccounts<TReturnableLinkableKeys extends string = string>(
    ids: string[],
    config?: RestoreReturn<TReturnableLinkableKeys>,
    sharedContext?: Context,
  ): Promise<Record<string, string[]> | void>;
}
