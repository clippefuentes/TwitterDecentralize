/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export declare namespace Twitter {
  export type CommentStruct = {
    id: BigNumberish;
    comment: string;
    author: string;
    timestamp: BigNumberish;
  };

  export type CommentStructOutput = [BigNumber, string, string, BigNumber] & {
    id: BigNumber;
    comment: string;
    author: string;
    timestamp: BigNumber;
  };
}

export interface TwitterInterface extends utils.Interface {
  contractName: "Twitter";
  functions: {
    "addComment(string,uint256)": FunctionFragment;
    "createTweet(string)": FunctionFragment;
    "getTweetComments(uint256)": FunctionFragment;
    "getTweetLength()": FunctionFragment;
    "getUserTweets(address)": FunctionFragment;
    "likeTweet(uint256)": FunctionFragment;
    "nextTweetId()": FunctionFragment;
    "tweets(uint256)": FunctionFragment;
    "unlikeTweet(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addComment",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "createTweet", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getTweetComments",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTweetLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getUserTweets",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "likeTweet",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "nextTweetId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tweets",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unlikeTweet",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "addComment", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createTweet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTweetComments",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTweetLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserTweets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "likeTweet", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nextTweetId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tweets", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "unlikeTweet",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Twitter extends BaseContract {
  contractName: "Twitter";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TwitterInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addComment(
      _comment: string,
      _id: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createTweet(
      _tweet: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getTweetComments(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[Twitter.CommentStructOutput[]]>;

    getTweetLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    getUserTweets(
      _user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    likeTweet(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    nextTweetId(overrides?: CallOverrides): Promise<[BigNumber]>;

    tweets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string, BigNumber, BigNumber] & {
        id: BigNumber;
        tweet: string;
        author: string;
        timestamp: BigNumber;
        likes: BigNumber;
      }
    >;

    unlikeTweet(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addComment(
    _comment: string,
    _id: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createTweet(
    _tweet: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getTweetComments(
    _id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<Twitter.CommentStructOutput[]>;

  getTweetLength(overrides?: CallOverrides): Promise<BigNumber>;

  getUserTweets(_user: string, overrides?: CallOverrides): Promise<BigNumber[]>;

  likeTweet(
    _id: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  nextTweetId(overrides?: CallOverrides): Promise<BigNumber>;

  tweets(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, string, BigNumber, BigNumber] & {
      id: BigNumber;
      tweet: string;
      author: string;
      timestamp: BigNumber;
      likes: BigNumber;
    }
  >;

  unlikeTweet(
    _id: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addComment(
      _comment: string,
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createTweet(_tweet: string, overrides?: CallOverrides): Promise<void>;

    getTweetComments(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<Twitter.CommentStructOutput[]>;

    getTweetLength(overrides?: CallOverrides): Promise<BigNumber>;

    getUserTweets(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    likeTweet(_id: BigNumberish, overrides?: CallOverrides): Promise<void>;

    nextTweetId(overrides?: CallOverrides): Promise<BigNumber>;

    tweets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string, BigNumber, BigNumber] & {
        id: BigNumber;
        tweet: string;
        author: string;
        timestamp: BigNumber;
        likes: BigNumber;
      }
    >;

    unlikeTweet(_id: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    addComment(
      _comment: string,
      _id: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createTweet(
      _tweet: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getTweetComments(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTweetLength(overrides?: CallOverrides): Promise<BigNumber>;

    getUserTweets(_user: string, overrides?: CallOverrides): Promise<BigNumber>;

    likeTweet(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    nextTweetId(overrides?: CallOverrides): Promise<BigNumber>;

    tweets(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    unlikeTweet(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addComment(
      _comment: string,
      _id: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createTweet(
      _tweet: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getTweetComments(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTweetLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getUserTweets(
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    likeTweet(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    nextTweetId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tweets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    unlikeTweet(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
