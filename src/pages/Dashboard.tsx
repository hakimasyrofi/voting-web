import { useEffect, useState } from "react";
import { votingData } from "../components/contractFunction/votingFunction";

export default function Dashboard() {
  const [data, setData] = useState<any>();

  async function loadData() {
    const data = await votingData();
    setData(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-200 text-left p-4 rounded-lg">
          <p>Number of Voting Systems</p>
          <p className="font-bold text-lg">
            {data?.totalVotingSystems} voting systems
          </p>
        </div>
        <div className="border border-gray-200 text-left p-4 rounded-lg">
          <p>Contract Owner</p>
          <p className="font-bold text-lg">{data?.owner}</p>
        </div>
      </div>
    </>
  );
}
