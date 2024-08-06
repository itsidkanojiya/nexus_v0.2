import { MdSearch } from "react-icons/md";

export default function SerachBox({ handleSearch, placeholder, name, className }) {
  return (
    <div className="relative">
      <input onChange={(e) => handleSearch(e.target.value)} name={name} placeholder={placeholder} className={`w-full p-2.5 ps-12 rounded-xl focus:outline-none focus:border-primary border ${className}`} />
      <span className=" absolute top-3 left-3">
        <MdSearch className="text-2xl text-gray-500" />
      </span>
    </div>
  );
}
