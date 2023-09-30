import { FormEvent, useState } from "react";
import { createVotingSystem } from "../components/contractFunction/votingFunction";
import { useStore } from "../components/storeData";
import Modal from "../components/Modal";

export default function VotingForm() {
  const [formData, setFormData] = useState({
    votingTitle: "",
    startTime: 0,
    endTime: 0,
    choices: [],
  });
  const { address } = useStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await createVotingSystem(
      formData.votingTitle,
      formData.startTime,
      formData.endTime,
      formData.choices,
      address
    );
  };

  const handleChange = (e: any, fieldName: string) => {
    let value = e.target.value;
    if (fieldName === "startTime" || fieldName === "endTime") {
      const date = new Date(value);
      value = Math.floor(date.getTime() / 1000);
    } else if (fieldName === "choices") {
      value = value.split(",").map((choice: any) => choice.trim());
    }
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  return (
    <>
      {isLoading && <Modal />}
      <p className="font-bold text-2xl text-left mb-8">
        Create a community poll
      </p>
      <form onSubmit={handleSubmit} className="text-left">
        <div className="my-4">
          <p className="font-bold text-gray-700 text-md mb-4">Voting Title</p>
          <input
            className="border border-2 border-gray-100 rounded-lg w-1/2 p-2 outline-none"
            placeholder="Input Voting Title"
            onChange={(e) => handleChange(e, "votingTitle")}
            required
          />
        </div>
        <div className="my-4">
          <p className="font-bold text-gray-700 text-md mb-4">Start Time</p>
          <input
            type="date"
            className="border border-2 border-gray-100 rounded-lg w-1/2 p-2 outline-none"
            onChange={(e) => handleChange(e, "startTime")}
            required
          />
        </div>
        <div className="my-4">
          <p className="font-bold text-gray-700 text-md mb-4">End Time</p>
          <input
            type="date"
            className="border border-2 border-gray-100 rounded-lg w-1/2 p-2 outline-none"
            onChange={(e) => handleChange(e, "endTime")}
            required
          />
        </div>
        <div className="my-4">
          <p className="font-bold text-gray-700 text-md mb-4">
            Choices (Array)
          </p>
          <input
            type="text"
            className="border border-2 border-gray-100 rounded-lg w-1/2 p-2 outline-none"
            onChange={(e) => handleChange(e, "choices")}
            value={formData.choices}
            placeholder="choice_1,choice_2,choice_3"
            required
          />
        </div>
        <button className="bg-black text-white p-2 rounded-lg" type="submit">
          Submit Voting System
        </button>
      </form>
    </>
  );
}
