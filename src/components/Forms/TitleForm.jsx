import { UserIcon } from "@phosphor-icons/react";

export const TitleForm = ({ title }) => {
  return (
    <div className="flex flex-col gap-4 items-center text-center">
      <div className="bg-purple-400 text-zinc-900 p-2 rounded-md">
        <UserIcon size={32} />
      </div>
      <h2 className="text-3xl text-purple-400 uppercase font-semibold">
        {title}
      </h2>
    </div>
  );
};
