import { useState } from "react";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { AddressInput, IntegerInput } from "~~/components/scaffold-eth";
import { Address } from "~~/components/scaffold-eth/Address";
import { useScaffoldContractWrite, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Pool: NextPage = () => {
  const transactions: any[] = [
    {
      id: 1,
      transaction: "0x1234567890",
    },
    {
      id: 2,
      transaction: "0x1234567890",
    },
  ];
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="p-2">
          <h1>Pool</h1>
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Transaction</th>
                <th>Signatures</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map(transaction => (
                <tr key={transaction.id}>
                  <th>{transaction.id}</th>
                  <td>{transaction.transaction}</td>
                  <td>Quality Control Specialist</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Pool;
