export function ContentField({ id, label, placeholder, type = "text", multiline = false, required = false }) {
  const shared = "field-control w-full border-b border-olive/60 bg-transparent py-3 text-ink placeholder:text-olive focus:border-clay focus:outline-none";
  return (
    <div className="field-group">
      <label className="field-label" htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea className={`${shared} min-h-24 resize-y`} id={id} name={id} placeholder={placeholder} required={required} rows={3} />
      ) : (
        <input className={shared} id={id} name={id} placeholder={placeholder} required={required} type={type} />
      )}
    </div>
  );
}
