import Note from "./note";

export default function List({
  className,
  name,
  title,
  notes,
  handleAdd,
  handleDrop,
  handleEdit,
  handleRemove,
}) {
  const listItems = notes.map((note) => {
    note.sourceList = name;
    return (
      <Note
        key={note.id}
        note={note}
        handleEdit={(noteData) => {
          handleEdit(noteData);
        }}
        handleRemove={(noteData) => {
          handleRemove(noteData);
        }}
      />
    );
  });

  return (
    <div
      className={`${className} border px-4 py-2 rounded-lg group`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, name)}
    >
      <h2 className="text-center text-xl">{title}</h2>
      <section className="flex flex-col py-3 gap-5">{listItems}</section>
      <button
        className="w-14 h-14 mx-auto block opacity-0 group-hover:opacity-100 bg-zinc-800 hover:bg-zinc-900 mix-blend-screen border-slate-900 border rounded-full transition-all duration-500 text-xl"
        onClick={() => handleAdd(name)}
      >
        +
      </button>
    </div>
  );
}
