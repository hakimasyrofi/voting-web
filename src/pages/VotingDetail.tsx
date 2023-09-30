import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  votingDetail,
  voteOnVoting,
  hasVoted,
} from "../components/contractFunction/votingFunction";
import { useStore } from "../components/storeData";
import { formatUnixTimestamp } from "../utils/dateFormatter";
import Modal from "../components/Modal";

export default function VotingDetail() {
  const [data, setData] = useState<any>();
  const { votingId } = useParams();
  const { address } = useStore();
  const [hasVotedVoting, setHasVotedVoting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentTime = Math.floor(Date.now() / 1000);
  const isVotingPeriod =
    currentTime >= data?.startTime && currentTime <= data?.endTime;

  async function loadData() {
    if (votingId) {
      const result = await votingDetail(parseInt(votingId));
      setData(result);
    }
  }

  async function checkHasVoted() {
    if (votingId && address) {
      const result = await hasVoted(parseInt(votingId), address);
      setHasVotedVoting(result);
    }
  }

  const handleSubmit = async (choiceIndex: number) => {
    if (votingId) {
      setIsLoading(true);
      await voteOnVoting(parseInt(votingId), choiceIndex, address);
    }
  };

  useEffect(() => {
    checkHasVoted();
  }, [address]);

  useEffect(() => {
    loadData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isLoading && <Modal />}
      <div className="flex mb-8">
        <div className="text-justify pr-4 w-3/4">
          <p className="font-bold text-2xl text-gray-700 mb-4">
            {data?.votingTitle}
          </p>
          <p className="font-semibold text-xl text-gray-700 mb-4">
            Voting Start: {formatUnixTimestamp(data?.startTime)}
          </p>
          <p className="font-semibold text-xl text-gray-700 mb-4">
            Voting End: {formatUnixTimestamp(data?.endTime)}
          </p>
        </div>
        <div className="border border-gray-300 rounded-xl text-left p-4 w-1/4">
          <p className="font-bold mb-2">Current Results</p>
          {data?.choices?.map((value: any, index: any) => {
            return (
              <div className="flex">
                <p className="flex-auto">{value?.name}</p>
                <p>{value?.totalVotes} votes</p>
              </div>
            );
          })}
        </div>
      </div>
      {hasVotedVoting ? (
        <p className="mb-4">You have already voted in this voting</p>
      ) : isVotingPeriod ? (
        <p className="mb-4">Vote from the choices below</p>
      ) : (
        <p className="mb-4">Berada di luar Periode Voting</p>
      )}

      <div className="flex justify-center mb-4">
        {data?.choices?.map((value: any, index: any) => {
          return (
            <button
              onClick={() => {
                if (!hasVotedVoting && isVotingPeriod) {
                  handleSubmit(index);
                }
              }}
              className={`${
                hasVotedVoting || !isVotingPeriod
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-400"
              } py-2 px-4 text-white rounded-xl mr-1`}
            >
              {value?.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
