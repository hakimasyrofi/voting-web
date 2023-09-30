import { votingContract } from "./initFunction";

export const votingData = async () => {
  const [totalVotingSystems, owner] = await Promise.all([
    votingContract.methods.totalVotingSystems().call(),
    votingContract.methods.owner().call(),
  ]);
  const response = {
    totalVotingSystems: totalVotingSystems,
    owner: owner,
  };
  return response;
};

export const votingList = async () => {
  const amount = await votingContract.methods.totalVotingSystems().call();

  if (amount === 0) {
    return { amount: 0, responseBody: {} };
  }

  const votingPromises = Array.from({ length: amount }, (_, i) =>
    votingContract.methods.getVotingSystem(i).call()
  );

  const votingDetails = await Promise.all(votingPromises);

  const responseBody = votingDetails.reduce((result, votingDetail, i) => {
    result[i.toString()] = votingDetail;
    return result;
  }, {});

  return { amount, responseBody };
};

export const votingDetail = async (votingId: number) => {
  const data = await votingContract.methods.getVotingSystem(votingId).call();
  console.log(data);
  return data;
};

export const hasVoted = async (votingId: number, address: string) => {
  const data = await votingContract.methods.hasVoted(votingId, address).call();
  return data;
};

export const createVotingSystem = async (
  votingTitle: string,
  startTime: number,
  endTime: number,
  choices: string[],
  address: string
) => {
  votingContract.methods
    .createVotingSystem(votingTitle, startTime, endTime, choices)
    .send({ from: address })
    .once("receipt", async (receipt: any) => {
      console.log(receipt);
      window.location.reload();
    })
    .catch((e: any) => {
      console.log(e);
    });
};

export const voteOnVoting = async (
  votingId: number,
  choiceIndex: number,
  address: string
) => {
  votingContract.methods
    .voteOnVoting(votingId, choiceIndex)
    .send({ from: address })
    .once("receipt", async (receipt: any) => {
      console.log(receipt);
      window.location.reload();
    })
    .catch((e: any) => {
      console.log(e);
    });
};
