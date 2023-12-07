import { use, useEffect, useState } from "react";
import type { NextPage } from "next";
import { platform } from "os";
import { hashMessage } from "viem";
import { useAccount, useSignMessage } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { AddressInput, IntegerInput } from "~~/components/scaffold-eth";
import { EtherInput } from "~~/components/scaffold-eth";
import { Address } from "~~/components/scaffold-eth/Address";
import {
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldContractWrite,
  useScaffoldEventHistory,
} from "~~/hooks/scaffold-eth";

const CreateTx: NextPage = () => {
  const [transactionType, setTransactionType] = useState("Send ETH");
  const [toAddressValue, setToAddressValue] = useState("");
  const [ethAmount, setEthAmount] = useState("");
  const [messageSignature, setMessageSignature] = useState("");
  const [isOwner, setIsOwner] = useState();
  const [nonce, setNonce] = useState(0);
  const [newHash, setNewHash] = useState("");

  const callData = "0x";

  const { data: metaMultiSigWalletContract } = useScaffoldContract({
    contractName: "MetaMultiSigWallet",
  });

  const { data, signMessage } = useSignMessage({
    onSuccess(data) {
      console.log("Success", data);
      setMessageSignature(data);
    },
    onError(error) {
      console.error("Error", error);
    },
  });

  const triggerSignMessage = async () => {
    const nonceResult = await metaMultiSigWalletContract?.read.nonce();
    setNonce(nonceResult);

    // TODO check if toAddressValue is valid address
    const newHashResult = await metaMultiSigWalletContract?.read.getTransactionHash([
      nonce,
      toAddressValue,
      BigInt(ethAmount),
      callData,
    ]);

    setNewHash(newHashResult);

    if (typeof newHash === "undefined") {
      console.error("newHash is undefined");
      return;
    }

    signMessage({ message: newHash });
  };

  const createTransaction = async () => {
    const recover = await metaMultiSigWalletContract?.read.recover([newHash, messageSignature]);
    const isOwnerResult = await metaMultiSigWalletContract?.read.isOwner([recover]);
    setIsOwner(isOwnerResult);

    console.log("--------------------");
    console.log("🍉 createTransaction called");
    console.log("🌳 callData", callData);
    console.log("🌳 toAddressValue", toAddressValue);
    console.log("🌳 newHash", newHash);
    console.log("🌳 messageSignature", messageSignature);
    console.log("🌳 recover", recover);
    console.log("🌳 amount", ethAmount);
    console.log("🌳 nonce", nonce);
    console.log("🌳 isOwner", isOwner);
    console.log("--------------------");

    // TODO post transaction to backend
  };

  useEffect(() => {
    if (messageSignature) {
      createTransaction();
    }
  }, [messageSignature]);

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="p-2">
          <select
            className="select select-bordered w-full max-w-xs"
            value={transactionType}
            onChange={e => setTransactionType(e.target.value)}
          >
            <option value="Send ETH">Send ETH</option>
          </select>
        </div>

        <div className="p-2">
          <AddressInput
            name={"toAddress"}
            onChange={v => setToAddressValue(v)}
            value={toAddressValue}
            placeholder={"Recipient address"}
          />
        </div>

        <div className="p-2">
          <EtherInput value={ethAmount} onChange={amount => setEthAmount(amount)} placeholder="Amount" />
        </div>

        <div className="p-2">
          <button className="btn btn-primary" onClick={triggerSignMessage}>
            Create Tx
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateTx;
