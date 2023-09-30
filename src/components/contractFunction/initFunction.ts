import Web3 from "web3";
import votingAbi from "../votingAbi.json";
import { useStore } from "../storeData";

const votingContractAddress = import.meta.env.VITE_VOTING_CONTRACT_ADDRESS;

const web3 = new Web3(window.ethereum);

export const votingContract = new web3.eth.Contract(
  votingAbi as any,
  votingContractAddress
);

export async function connect() {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const userAccount = await web3.eth.getAccounts();
    useStore.setState({ address: userAccount[0] });
  } else {
    alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
}
