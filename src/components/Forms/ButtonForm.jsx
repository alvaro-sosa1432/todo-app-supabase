import { ArrowRightIcon } from "@phosphor-icons/react";

export const ButtonForm = ({ loadCondition }) => {
  return (
    <button
      className="cursor-pointer bg-purple-400 mt-4 py-2 rounded-2xl text-black flex justify-center items-center gap-4 border hover:border-purple-400 hover:bg-zinc-950 hover:text-purple-400 transition-colors duration-200 disabled:opacity-50"
      type="submit"
      disabled={loadCondition}
    >
      {loadCondition ? "Loging..." : "Login"}
      <ArrowRightIcon />
    </button>
  );
};
