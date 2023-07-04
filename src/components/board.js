import { useState } from "react";

import List from "./list";

const dummyNotes = {
  backlog: [
    { title: "Demon Slayer manga", details: "Continue from anime" },
    { title: "Read a novel", details: "Perhaps CotE?" },
  ],
  todo: [
    { title: "Dailies in games", details: "HSR, PGR" },
    { title: "Vinland Saga S2", details: "Watch it already" },
    { title: "Workout", details: "Arms and legs" },
    { title: "Next React project", details: "Still need ideas" },
    { title: "Take out the trash" },
  ],
  doing: [
    {
      title: "Deploy kanban board",
      details: "Publish to github and deploy to Vercel",
    },
    { title: "Jigokuraku", details: "Read manga" },
  ],
  done: [
    { title: "Work out", details: "Chest and core" },
    { title: "Kanban board", details: "First React learning project" },
  ],
};

export default function Board() {
  const [notes, setNotes] = useState(dummyNotes);

  function addNote(sourceList) {
    setNotes({
      ...notes,
      [sourceList]: [...notes[sourceList], { title: "New note", details: "" }],
    });
  }

  function removeNote(noteData) {
    setNotes({
      ...notes,
      [noteData.sourceList]: [
        ...notes[noteData.sourceList].slice(0, noteData.index),
        ...notes[noteData.sourceList].slice(noteData.index + 1),
      ],
    });
  }

  function handleOnDrag(e, noteData) {
    e.dataTransfer.setData("noteData", JSON.stringify(noteData));
  }

  function moveNote(e, targetList) {
    const noteData = JSON.parse(e.dataTransfer.getData("noteData"));
    if (targetList === noteData.sourceList) return;

    setNotes({
      ...notes,
      [noteData.sourceList]: [
        ...notes[noteData.sourceList].slice(0, noteData.index),
        ...notes[noteData.sourceList].slice(noteData.index + 1),
      ],
      [targetList]: [
        ...notes[targetList],
        {
          title: noteData.title,
          details: noteData.details,
        },
      ],
    });
  }

  function editNote(e, noteData) {
    e.preventDefault();

    setNotes({
      ...notes,
      [noteData.sourceList]: [
        ...notes[noteData.sourceList].slice(0, noteData.index),
        { title: noteData.title, details: noteData.details },
        ...notes[noteData.sourceList].slice(noteData.index + 1),
      ],
    });
  }

  return (
    <section className="my-10 gap-6 items-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-rows-1">
      <List
        className="border-blue-600 bg-blue-950"
        name="backlog"
        title="Backlog"
        notes={notes.backlog}
        onClick={() => addNote("backlog")}
        handleOnDrag={(e, noteData) => handleOnDrag(e, noteData)}
        handleOnDrop={(e, list) => moveNote(e, list)}
        handleEditFormSubmit={(e, noteData) => editNote(e, noteData)}
        handleRemove={(noteData) => removeNote(noteData)}
      ></List>
      <List
        className="border-rose-600 bg-rose-950"
        name="todo"
        title="To Do"
        notes={notes.todo}
        onClick={() => addNote("todo")}
        handleOnDrag={(e, noteData) => handleOnDrag(e, noteData)}
        handleOnDrop={(e, list) => moveNote(e, list)}
        handleEditFormSubmit={(e, noteData) => editNote(e, noteData)}
        handleRemove={(noteData) => removeNote(noteData)}
      ></List>
      <List
        className="border-yellow-600 bg-yellow-950"
        name="doing"
        title="Doing"
        notes={notes.doing}
        onClick={() => addNote("doing")}
        handleOnDrag={(e, noteData) => handleOnDrag(e, noteData)}
        handleOnDrop={(e, list) => moveNote(e, list)}
        handleEditFormSubmit={(e, noteData) => editNote(e, noteData)}
        handleRemove={(noteData) => removeNote(noteData)}
      ></List>
      <List
        className="border-emerald-600 bg-emerald-950"
        name="done"
        title="Done"
        notes={notes.done}
        onClick={() => addNote("done")}
        handleOnDrag={(e, noteData) => handleOnDrag(e, noteData)}
        handleOnDrop={(e, list) => moveNote(e, list)}
        handleEditFormSubmit={(e, noteData) => editNote(e, noteData)}
        handleRemove={(noteData) => removeNote(noteData)}
      ></List>
    </section>
  );
}
