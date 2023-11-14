import { useState } from "react";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { AddressInput, IntegerInput } from "~~/components/scaffold-eth";
import { Address } from "~~/components/scaffold-eth/Address";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Owners: NextPage = () => {
  const [ownerAddressValue, setOwnerAddressValue] = useState("");
  const [newNumberOfRequiredConfirmationsValue, setNewNumberOfRequiredConfirmationsValue] = useState("");

  const { data: events } = useScaffoldEventHistory({
    contractName: "MetaMultiSigWallet",
    eventName: "Owner",
    fromBlock: 0n,
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
              onChange={v => setOwnerAddressValue(v)}
              value={ownerAddressValue}
              placeholder={"Owner address"}
            />
          </div>

          <div className={"p-2"}>
            <label className="text-lg font-bold">New number of required confirmations</label>
            <IntegerInput
              name={"newNumberOfRequiredConfirmations"}
              onChange={v => setNewNumberOfRequiredConfirmationsValue(v.toString())}
              value={newNumberOfRequiredConfirmationsValue}
              placeholder={"New number of required confirmations"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Owners;
