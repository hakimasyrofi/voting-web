import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { votingList } from "../components/contractFunction/votingFunction";

export default function Voting() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>();
  const [amount, setAmount] = useState<number>(0);

  async function loadData() {
    const result = await votingList();
    setData(result.responseBody);
    setAmount(result.amount);
  }

  useEffect(() => {
    loadData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center mb-4">
        <p className="w-fit mr-8">{amount} voting systems</p>
        <button
          onClick={() => navigate("/voting/form")}
          className="bg-orange-500 hover:bg-orange-600 p-2 text-white rounded-lg"
        >
          Create a New Voting
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {Object.keys(data)
          .reverse()
          .map((key) => {
            const voting = data[key];
            return (
              <div
                key={key}
                onClick={() => navigate(`/voting/${key}`)}
                className="border border-gray-200 text-left px-4 py-4 rounded-lg cursor-pointer hover:shadow-md"
              >
                <p className="font-bold text-lg">{voting.votingTitle}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}
