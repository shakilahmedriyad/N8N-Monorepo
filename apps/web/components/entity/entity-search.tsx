import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function EntitySearch({
  searchQuery,
  handleSearch,
  placeholder,
}: {
  placeholder: string;
  searchQuery: string;
  handleSearch: (val: string) => void;
}) {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-10"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
