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
          <Balance address={"0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"} />

          <Address address={"0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"} />

          <ul>
            {events?.map(event => (
              <li key={`${event.log.transactionHash}-${event.log.logIndex}`}>
                <Address address={event.args.owner} /> - {event.args.added ? "TRUE" : "FALSE"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
