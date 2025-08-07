import ResultsCard from "./results-card";
import Search from "./search";
import SelectedCard from "./selected-card";

const DownloadCard: React.FC = () => (
  <div>
    <Search />
    <div className="flex gap-x-4">
      <ResultsCard />
      <SelectedCard />
    </div>
  </div>
);

export default DownloadCard;
