import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Address } from "~~/components/scaffold-eth/Address";
import { Balance } from "~~/components/scaffold-eth/Balance";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <Balance address={"0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"} />

          <Address address={"0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"} />
        </div>
      </div>
    </>
  );
};

export default Home;
