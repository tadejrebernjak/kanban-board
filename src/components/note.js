import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faX,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function Note(props) {
  const { note } = props;
  const [editing, setEditing] = useState(false);
  const [editFields, setEditFields] = useState({
    title: note.title,
    details: note.details,
  });

  function handleEditStart() {
    setEditing(true);
  }

  function handleEditCancel() {
    setEditing(false);
    setEditFields({
      title: note.title,
      details: note.details,
    });
  }

  function handleEditUpdate(e) {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  }

  function handleDrag(e, noteData) {
    e.dataTransfer.setData("noteData", JSON.stringify(noteData));
  }

  return (
    <div
      className="bg-zinc-800 border border-slate-900 mix-blend-screen"
      draggable={!editing ? true : false}
      onDragStart={(e) => handleDrag(e, note)}
    >
      {!editing ? (
        <>
          <div className="p-3 cursor-pointer break-words">
            <h3 className="text-lg">{note.title}</h3>
            {note.details != "" && <p>{note.details}</p>}
          </div>
          <div className="bg-zinc-900 grid grid-cols-2 grid-rows-1">
            <button
              className="py-2 hover:bg-zinc-950"
              onClick={() => props.handleRemove(note)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button
              className="py-2 hover:bg-zinc-950"
              onClick={handleEditStart}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="p-3 cursor-pointer">
            <input
              className="w-full p-1 mb-3 text-lg bg-slate-950 focus:outline-none border border-transparent focus:border-white rounded-sm"
              type="text"
              name="title"
              value={editFields.title}
              placeholder="Title"
              onChange={handleEditUpdate}
            ></input>
            <textarea
              className="w-full p-1 bg-slate-950 focus:outline-none border border-transparent focus:border-white rounded-sm"
              name="details"
              value={editFields.details}
              placeholder="Details"
              rows={4}
              onChange={handleEditUpdate}
            ></textarea>
          </div>
          <div className="bg-zinc-900 grid grid-cols-2 grid-rows-1">
            <button
              className="py-2 hover:bg-zinc-950"
              onClick={handleEditCancel}
            >
              <FontAwesomeIcon icon={faX} />
            </button>
            <button
              className="py-2 hover:bg-zinc-950"
              onClick={() => {
                setEditing(false);
                props.handleEdit({
                  ...note,
                  newTitle: editFields.title,
                  newDetails: editFields.details,
                });
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
