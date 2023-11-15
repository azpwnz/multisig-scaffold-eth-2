import { useState } from "react";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { AddressInput, IntegerInput } from "~~/components/scaffold-eth";
import { Address } from "~~/components/scaffold-eth/Address";
import { useScaffoldContractWrite, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Owners: NextPage = () => {
  const [signerAddressValue, setSignerAddressValue] = useState("");
  const [newNumberOfSignaturesValue, setNewNumberOfSignaturesValue] = useState("");

  const { data: events } = useScaffoldEventHistory({
    contractName: "MetaMultiSigWallet",
    eventName: "Owner",
    fromBlock: 0n,
  });

  const { writeAsync: addSigner } = useScaffoldContractWrite({
    contractName: "MetaMultiSigWallet",
    functionName: "addSigner",
    args: [signerAddressValue, BigInt(newNumberOfSignaturesValue)],
  });

  const { writeAsync: removeSigner } = useScaffoldContractWrite({
    contractName: "MetaMultiSigWallet",
    functionName: "removeSigner",
    args: [signerAddressValue, BigInt(newNumberOfSignaturesValue)],
  });
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="p-2">
          <ul>
            {events?.map(event => (
              <li key={event.log.logIndex}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Address address={event.args.owner} />
                  <span>{event.args.added ? "TRUE" : "FALSE"}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className={"p-2"}>
            <label className="text-lg font-bold">Owner address</label>
            <AddressInput
              name={"ownerAddress"}
              onChange={v => setSignerAddressValue(v)}
              value={signerAddressValue}
              placeholder={"Owner address"}
            />
          </div>

          <div className={"p-2"}>
            <label className="text-lg font-bold">New number of signatures</label>
            <IntegerInput
              name={"newNumberOfSignatures"}
              onChange={v => setNewNumberOfSignaturesValue(v.toString())}
              value={newNumberOfSignaturesValue}
              placeholder={"New number of signatures"}
            />
          </div>

          <div className={"p-2"}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button className={"btn btn-primary"} onClick={() => addSigner()}>
                Add signer
              </button>
              <button className={"btn btn-primary"} onClick={() => removeSigner()}>
                Remove signer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Owners;
