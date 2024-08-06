import { MdError } from "react-icons/md";

export default function ErrorMessage({ children, className }) {
  return (
    <div className={`p-2 flex items-center bg-red-500/20 h-full rounded-xl text-center ${className}`}>
      <div className="text-red-700 font-semibold flex justify-start items-center gap-2">
        <MdError className="text-xl" />
        {children}
      </div>
    </div>
  );
}
