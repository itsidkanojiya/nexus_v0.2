export default function SelectBox({ register = () => {}, errors = {}, label = "Add Label", topLabel = true, isRequired = true, name, placeholder = "Select an option", className = "", options = [], handleRightClick = () => {}, handleLeftClick = () => {}, rightIcon = null, leftIcon = null }) {
  return (
    <div>
      <div className="relative">
        {leftIcon && (
          <div className="absolute top-0 left-0 h-full w-8 flex items-center justify-center">
            <button type="button" onClick={handleLeftClick} className="text-xl text-slate-600 opacity-50">
              {leftIcon}
            </button>
          </div>
        )}

        <div className="relative">
          <select {...register(name, { required: isRequired ? `${label} is required.` : false })} className={`w-full p-2.5 border-2 rounded-md focus:outline-none ${rightIcon ? "pe-8" : leftIcon ? "ps-8" : ""} ${className} ${errors?.[name] ? "border-red-600" : ""}`}>
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {topLabel && (
            <div className="absolute -top-2.5 left-2 bg-white px-1 text-slate-700">
              <p className="text-sm font-semibold text-slate-400 tracking-wide">{label}</p>
            </div>
          )}
        </div>

        {rightIcon && (
          <div className="absolute top-0 right-0 h-full w-8 flex items-center justify-center">
            <button type="button" onClick={handleRightClick} className="text-xl text-slate-600 opacity-50">
              {rightIcon}
            </button>
          </div>
        )}
      </div>
      {errors?.[name] && <p className="text-red-600 text-sm font-semibold">{errors?.[name]?.message}</p>}
    </div>
  );
}
