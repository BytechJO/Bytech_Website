import { Plus, Trash2 } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-white/[0.07] bg-white/[0.04] px-3.5 py-[11px] text-[13px] text-white outline-none transition placeholder:text-white/25 focus:border-[#F57A24]";

const adminInputClass =
  "h-8 rounded-md border border-white/[0.08] bg-[#0e1c2e] px-2 text-[11px] text-white outline-none placeholder:text-white/25 focus:border-[#F57A24]/50";

const fieldTypes = [
  "text",
  "email",
  "tel",
  "number",
  "url",
  "date",
  "select",
  "textarea",
];

export default function EditableContactField({
  field,
  editable = false,
  path,
  onChangePath,
  onDelete,
}) {
  const safeField = {
    id: "",
    label: "Field Label",
    name: "",
    type: "text",
    placeholder: "",
    required: false,
    width: "full",
    rows: 4,
    options: [],
    ...field,
  };

  const options = Array.isArray(safeField.options) ? safeField.options : [];

  function updateField(key, value) {
    onChangePath?.([...path, key], value);
  }

  function addOption() {
    onChangePath?.([...path, "options"], [...options, "New option"]);
  }

  function updateOption(index, value) {
    onChangePath?.(
      [...path, "options"],
      options.map((option, i) => (i === index ? value : option)),
    );
  }

  function deleteOption(index) {
    onChangePath?.(
      [...path, "options"],
      options.filter((_, i) => i !== index),
    );
  }

  return (
    <div
      className={safeField.width === "half" ? "sm:col-span-1" : "sm:col-span-2"}
    >
      {editable && (
        <div className="mb-2 rounded-xl border border-white/[0.07] bg-[#0e1c2e]/70 p-3">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <select
              value={safeField.type}
              onChange={(e) => updateField("type", e.target.value)}
              className={`${adminInputClass} cursor-pointer`}
            >
              {fieldTypes.map((type) => (
                <option key={type} value={type} className="bg-[#0e1c2e]">
                  {type}
                </option>
              ))}
            </select>

            <select
              value={safeField.width}
              onChange={(e) => updateField("width", e.target.value)}
              className={`${adminInputClass} cursor-pointer`}
            >
              <option value="full" className="bg-[#0e1c2e]">
                Full Width
              </option>
              <option value="half" className="bg-[#0e1c2e]">
                Half Width
              </option>
            </select>

            <label className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white/45">
              <input
                type="checkbox"
                checked={!!safeField.required}
                onChange={(e) => updateField("required", e.target.checked)}
              />
              Required
            </label>

            <button
              type="button"
              onClick={onDelete}
              className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md bg-red-500/15 text-red-300 transition hover:bg-red-500/25"
              title="Delete field"
            >
              <Trash2 size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <input
              value={safeField.label}
              onChange={(e) => updateField("label", e.target.value)}
              placeholder="Label"
              className={adminInputClass}
            />

            <input
              value={safeField.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="name"
              className={adminInputClass}
            />

            <input
              value={safeField.placeholder || ""}
              onChange={(e) => updateField("placeholder", e.target.value)}
              placeholder="Placeholder"
              className={adminInputClass}
            />
          </div>

          {safeField.type === "textarea" && (
            <div className="mt-2">
              <input
                type="number"
                min="2"
                max="10"
                value={safeField.rows || 4}
                onChange={(e) => updateField("rows", Number(e.target.value))}
                placeholder="Rows"
                className={`${adminInputClass} w-[90px]`}
              />
            </div>
          )}

          {safeField.type === "select" && (
            <div className="mt-3">
              <button
                type="button"
                onClick={addOption}
                className="mb-2 inline-flex items-center gap-1 rounded-md border border-[#F57A24]/25 bg-[#F57A24]/10 px-2 py-1 text-[10px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
              >
                <Plus size={11} />
                Add Option
              </button>

              <div className="flex flex-col gap-2">
                {options.map((option, index) => (
                  <div key={`${option}-${index}`} className="flex gap-2">
                    <input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className={`${adminInputClass} flex-1`}
                    />

                    <button
                      type="button"
                      onClick={() => deleteOption(index)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-red-500/15 text-red-300 transition hover:bg-red-500/25"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <label className="block">
        <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[1px] text-white/35">
          {safeField.label}
          {safeField.required ? <span className="text-[#F57A24]"> *</span> : ""}
        </span>

        {safeField.type === "textarea" ? (
          <textarea
            name={safeField.name}
            placeholder={safeField.placeholder}
            required={safeField.required}
            rows={safeField.rows || 4}
            className={`${inputClass} resize-y`}
          />
        ) : safeField.type === "select" ? (
          <select
            name={safeField.name}
            required={safeField.required}
            defaultValue=""
            className={`${inputClass} cursor-pointer bg-[#162840] text-white/70`}
          >
            <option className="bg-[#0e1c2e]" value="">
              {safeField.placeholder || "Select an option..."}
            </option>

            {options.map((option, index) => (
              <option
                key={`${option}-${index}`}
                className="bg-[#0e1c2e]"
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={safeField.type}
            name={safeField.name}
            placeholder={safeField.placeholder}
            required={safeField.required}
            className={inputClass}
          />
        )}
      </label>
    </div>
  );
}
