import { Button } from "@/components/ui/button";
import { FlaskConicalIcon } from "lucide-react";

export default function ExecuteButton({ onClick }: { onClick: () => void }) {
  return (
    <Button size={"lg"} onClick={onClick}>
      <FlaskConicalIcon />
      <span>Execute Workflow</span>
    </Button>
  );
}
