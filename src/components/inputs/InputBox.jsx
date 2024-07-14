export default function InputBox({ register = () => {}, errors = {}, label = "Add Label", topLabel = true, isRequired = true, name, placeholder, className = "", handleChange = () => {}, type = "text", handleRightClick = () => {}, handleLeftClick = () => {}, rightIcon = null, leftIcon = null }) {
  return (
    <div>
      <div className="relative">
        {leftIcon && (
          <div className={`absolute top-0 left-0 h-full w-8 flex items-center justify-center`}>
            <button type="button" onClick={handleRightClick} className="text-xl text-slate-600 opacity-50">
              {leftIcon}
            </button>
          </div>
        )}

        <div className="relative">
          <input onChange={(e) => handleChange(e)} {...register(name, { required: isRequired ? `${label} is required.` : false })} autoComplete="false" type={type} placeholder={placeholder} className={`w-full p-2.5 border-2 rounded-md focus:outline-none ${rightIcon ? "pe-8" : ""} ${leftIcon ? "ps-8" : ""}  ${className} ${errors?.[name] ? "border-red-600" : ""}`} />
          {topLabel && (
            <div className=" absolute -top-2.5 left-2 bg-white px-1 text-slate-700">
              <p className=" text-sm font-semibold text-slate-400 tracking-wide">{label}</p>
            </div>
          )}
        </div>

        {rightIcon && (
          <div className={`absolute top-0 right-0 h-full w-8 flex items-center justify-center`}>
            <button type="button" onClick={handleRightClick} className="text-xl text-slate-600 opacity-50">
              {rightIcon}
            </button>
          </div>
        )}
      </div>
      {errors?.[name] && <p className=" text-red-600 text-sm font-semibold">{errors?.[name]?.message}</p>}
    </div>
  );
}
