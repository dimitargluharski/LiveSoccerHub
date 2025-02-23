import { useState } from "react";
import { HomePage } from "./pages/HomePage/HomePage"
import { UsersBettingPage } from "./pages/UsersBettingPage/UsersBettingPage";

function App() {
  const [view, setView] = useState<string>('home-page');
  const [activeId, setActiveId] = useState<number>(1);

  const views = [
    { id: 1, name: 'Home', showPage: () => setView('home-page') },
    { id: 2, name: 'Rankings', showPage: () => setView('users-betting-page') }
  ];

  const handleOnClickActiveLinkChange = (id: number) => {
    setActiveId(id);
  };

  return (
    <div className="mx-auto max-w-3xl p-2">
      <div className="flex gap-2 py-3">
        {views.map((view) => (
          <div key={view.id} onClick={() => {
            view.showPage();
            handleOnClickActiveLinkChange(view.id);
          }}>
            <span className={`${activeId === view.id ? 'bg-orange-500 text-white' : ''} p-2 uppercase font-bold hover:cursor-pointer rounded-md`}>
              {view.name}
            </span>
          </div>
        ))}
      </div>

      {view === 'home-page' ? <HomePage /> : <UsersBettingPage />}
    </div >
  )
}

export default App
