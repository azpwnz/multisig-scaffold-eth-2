import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Address } from "~~/components/scaffold-eth/Address";
import { Balance } from "~~/components/scaffold-eth/Balance";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { data: events } = useScaffoldEventHistory({
    contractName: "MetaMultiSigWallet",
    eventName: "Owner",
    fromBlock: 0n,
  });

  console.log("💚 Events: ", events);

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <div className="border-2 border-gray-400 rounded-md">
            <div className="p-2">
              <Balance address={"0x5FbDB2315678afecb367f032d93F642f64180aa3"} />
            </div>

            <div className="p-2">
              <Address address={"0x5FbDB2315678afecb367f032d93F642f64180aa3"} />
            </div>
          </div>

          <div className="p-2">
            <h2>Events</h2>
            <ul>
              {events?.map(event => (
                <li key={`${event.log.transactionHash}-${event.log.logIndex}`}>
                  <Address address={event.args.owner} /> - {event.args.added ? "TRUE" : "FALSE"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
