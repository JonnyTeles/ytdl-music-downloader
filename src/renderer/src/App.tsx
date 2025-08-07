import MainDashboard from "./components/dashboard/main-dashboard";
import HeaderControl from "./components/header/header-control";

function App(): React.JSX.Element {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <HeaderControl />
      <main className="flex-1 overflow-y-auto pt-12">
        <MainDashboard />
      </main>
    </div>
  );
}

export default App;
