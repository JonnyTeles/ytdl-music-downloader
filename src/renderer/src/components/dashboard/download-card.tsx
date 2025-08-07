import ResultsCard from "./results-card";
import Search from "./search";
import SelectedCard from "./selected-card";

const DownloadCard: React.FC = () => (
  <div>
    <Search />
    <ResultsCard />
    <SelectedCard />
  </div>
);

export default DownloadCard;
