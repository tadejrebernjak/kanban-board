import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import List from "./list";

class Note {
  constructor(title, details, state) {
    this.id = uuidv4();
    this.title = title;
    this.details = details;
    this.state = state;
  }
}

const dummyNotes = [
  new Note("Demon Slayer manga", "Continue from anime", "backlog"),
  new Note("Read a novel", "Perhaps CotE?", "backlog"),
  new Note("Next React project", "Still need ideas", "backlog"),
  new Note("Dailies in games", "HSR, PGR", "todo"),
  new Note("Vinland Saga S2", "Watch it already", "todo"),
  new Note("Workout", "Arms and legs", "todo"),
  new Note("Take out the trash", "", "todo"),
  new Note(
    "Deploy kanban board",
    "Publish to github and deploy to Vercel",
    "doing"
  ),
  new Note("Jigokuraku", "Read manga", "doing"),
  new Note("Work out", "Chest and core", "done"),
  new Note("Kanban board", "First React learning project", "done"),
];

export default function Board() {
  const [notes, setNotes] = useState(dummyNotes);

  function addNote(sourceList) {
    setNotes([...notes, new Note("New note", "", sourceList)]);
  }

  function removeNote(noteData) {
    setNotes([...notes.filter((note) => note.id != noteData.id)]);
  }

  function moveNote(e, targetList) {
    const noteData = JSON.parse(e.dataTransfer.getData("noteData"));
    if (targetList === noteData.state) return;
    noteData.state = targetList;

    setNotes([...notes.filter((note) => note.id != noteData.id), noteData]);
  }

  function editNote(noteData) {
    setNotes([
      ...notes.map((note) => (note.id === noteData.id ? noteData : note)),
    ]);
  }

  return (
    <section className="my-10 gap-6 items-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-rows-1">
      <List
        className="border-blue-600 bg-blue-950"
        name="backlog"
        title="Backlog"
        notes={notes.filter((note) => note.state === "backlog")}
        handleAdd={(sourceList) => addNote(sourceList)}
        handleDrop={(e, targetList) => moveNote(e, targetList)}
        handleEdit={(noteData) => editNote(noteData)}
        handleRemove={(noteData) => removeNote(noteData)}
      ></List>
      <List
        className="border-rose-600 bg-rose-950"
        name="todo"
        title="To Do"
        notes={notes.filter((note) => note.state === "todo")}
        handleAdd={(sourceList) => addNote(sourceList)}
        handleDrop={(e, targetList) => moveNote(e, targetList)}
        handleEdit={(noteData) => editNote(noteData)}
        handleRemove={(noteData) => removeNote(noteData)}
      ></List>
      <List
        className="border-yellow-600 bg-yellow-950"
        name="doing"
        title="Doing"
        notes={notes.filter((note) => note.state === "doing")}
        handleAdd={(sourceList) => addNote(sourceList)}
        handleDrop={(e, targetList) => moveNote(e, targetList)}
        handleEdit={(noteData) => editNote(noteData)}
        handleRemove={(noteData) => removeNote(noteData)}
      ></List>
      <List
        className="border-emerald-600 bg-emerald-950"
        name="done"
        title="Done"
        notes={notes.filter((note) => note.state === "done")}
        handleAdd={(sourceList) => addNote(sourceList)}
        handleDrop={(e, targetList) => moveNote(e, targetList)}
        handleEdit={(noteData) => editNote(noteData)}
        handleRemove={(noteData) => removeNote(noteData)}
      ></List>
    </section>
  );
}
