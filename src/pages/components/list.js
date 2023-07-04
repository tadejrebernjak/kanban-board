import Note from "./note";

export default function List({
  className,
  name,
  title,
  notes,
  onClick,
  handleOnDrag,
  handleOnDrop,
  handleEditFormSubmit,
  handleRemove,
}) {
  function handleOnDragOver(e) {
    e.preventDefault();
  }

  const listItems = notes.map((note, index) => {
    return (
      <Note
        key={index}
        note={note}
        handleOnDrag={(e, noteData) => {
          noteData.sourceList = name;
          noteData.index = index;
          handleOnDrag(e, noteData);
        }}
        handleEditFormSubmit={(e, noteData) => {
          noteData.sourceList = name;
          noteData.index = index;
          handleEditFormSubmit(e, noteData);
        }}
        handleRemove={(noteData) => {
          noteData.sourceList = name;
          noteData.index = index;
          handleRemove(noteData);
        }}
      />
    );
  });

  return (
    <div
      className={`${className} border px-4 py-2 rounded-lg group`}
      onDragOver={handleOnDragOver}
      onDrop={(e) => handleOnDrop(e, name)}
    >
      <h2 className="text-center text-xl">{title}</h2>
      <section className="flex flex-col py-3 gap-5">{listItems}</section>
      <button
        className="w-14 h-14 mx-auto block opacity-0 group-hover:opacity-100 bg-zinc-800 hover:bg-zinc-900 mix-blend-screen border-slate-900 border rounded-full transition-all duration-500 text-xl"
        onClick={onClick}
      >
        +
      </button>
    </div>
  );
}
