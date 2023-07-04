import Board from "../components/board";

export default function Home() {
  return (
    <main className="px-20 py-6 flex flex-col min-h-screen">
      <header className="border-2 border-transparent border-b-fuchsia-600 p-2">
        <h1 className="text-center text-3xl text-fuchsia-600 font-semibold uppercase">
          Kanban Board
        </h1>
      </header>
      <Board />
    </main>
  );
}
