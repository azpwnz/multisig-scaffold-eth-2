import { useState } from "react";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { AddressInput, IntegerInput } from "~~/components/scaffold-eth";
import { EtherInput } from "~~/components/scaffold-eth";
import { Address } from "~~/components/scaffold-eth/Address";
import { useScaffoldContractWrite, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import { platform } from "os";

const CreateTx: NextPage = () => {
  const [toAddressValue, setToAddressValue] = useState("");
  const [ethAmount, setEthAmount] = useState("");

  const createTransaction = async () => {
    let callData = "0x";
    let executeToAddress = toAddressValue;
    const newHash = "1";
    const signature = "1";
    const recover = "1";

    console.log("--------------------");
    console.log("🍉 createTransaction called");
    console.log("🌳 callData", callData);
    console.log("🌳 executeToAddress", executeToAddress);
    console.log("🌳 newHash", newHash);
    console.log("🌳 signature", signature);
    console.log("🌳 recover", recover);
    console.log("🌳 amount", ethAmount);
    console.log("--------------------");
  };

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="p-2">
          <select className="select select-bordered w-full max-w-xs">
            <option selected>Send ETH</option>
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
          <button className="btn btn-primary" onClick={createTransaction}>Create Tx</button>
        </div>
      </div>
    </>
  );
};

export default CreateTx;
