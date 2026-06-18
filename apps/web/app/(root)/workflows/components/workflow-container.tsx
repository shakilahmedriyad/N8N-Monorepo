"use client";
import EntityContainer from "@/components/entity/entity-container";
import EntityHeader from "@/components/entity/entity-header";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PropsWithChildren } from "react";

export default function WorkflowContainer({ children }: PropsWithChildren) {
  return (
    <EntityContainer
      header={
        <EntityHeader
          title="Workflow"
          description="Manage your workflows"
          buttonText="New Workflow"
          onNew={() => {}}
        />
      }
      search={
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search workflows..."
            className="pl-10"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      }
    >
      {children}
    </EntityContainer>
  );
}
