import Search from "./search";
import { SearchProvider } from "./search-context";
import SelectedCard from "./selected-card";

const DownloadCard: React.FC = () => (
  <SearchProvider>
    <Search />
    <SelectedCard />
  </SearchProvider>
);

export default DownloadCard;
