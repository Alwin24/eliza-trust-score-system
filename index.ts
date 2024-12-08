import { SupabaseDatabaseAdapter } from "@ai16z/adapter-supabase";
import {
  AgentRuntime,
  ModelProviderName,
  stringToUuid,
  type UUID,
} from "@ai16z/eliza";
import solanaPlugin, {
  TokenProvider,
  TrustScoreManager,
  WalletProvider,
} from "@ai16z/plugin-solana";
import { TrustScoreDatabase } from "@ai16z/plugin-trustdb";
import bs58 from "bs58";
import { Connection, Keypair } from "@solana/web3.js";

const main = async () => {
  // const databaseAdapter = new SqliteDatabaseAdapter(
  //   new Database("./db.sqlite", {
  //     // SQLite options
  //     readonly: false,
  //     fileMustExist: false,
  //   })
  // );
  // const databaseAdapter = new SupabaseDatabaseAdapter(
  //   process.env.SUPABASE_URL!,
  //   process.env.SUPABASE_ANON_KEY!
  // );

  try {
    // const runtime = new AgentRuntime({
    //   token: "auth-token",
    //   modelProvider: ModelProviderName.OPENAI,
    //   // character: characterConfig,
    //   databaseAdapter,
    //   conversationLength: 32,
    //   plugins: [solanaPlugin],
    //   // serverUrl: "http://localhost:7998",
    //   // actions: customActions,
    //   // evaluators: customEvaluators,
    //   // providers: customProviders,
    // });

    const tokenAddress = "4oKi7SSABySx9nqzVf9GN2bxgPZ8TMaRec26vLdZpump";

    const connection = new Connection(process.env.RPC_URL!, "confirmed");
    const devKeypair = Keypair.fromSecretKey(
      bs58.decode(process.env.PRIVATE_KEY!)
    );

    const walletProvider = new WalletProvider(connection, devKeypair.publicKey);
    const tokenProvider = new TokenProvider(tokenAddress, walletProvider);
    const tokenInfo = await tokenProvider.getProcessedTokenData();
    console.log('----------------------------------');
    console.log(tokenInfo);
    
    // const formatedTokenData = tokenProvider.formatTokenData(tokenInfo);
    // console.log(formatedTokenData);

    // // const trustScoreDb = new TrustScoreDatabase(databaseAdapter.db);
    // const trustScoreManager = new TrustScoreManager(
    //   runtime,
    //   tokenProvider,
    //   databaseAdapter as any,
    // );
    // console.log(4);
    // // Generate trust scores
    // const score = await trustScoreManager.checkTrustScore(tokenAddress);
    // // const trustScore = await trustScoreManager.
    // console.log(5,score);
  } catch (error) {
    console.log(error);
  }
};
main();
