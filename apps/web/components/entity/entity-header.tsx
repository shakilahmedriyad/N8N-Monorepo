import { Button } from "../ui/button";

export default function EntityHeader({
  title,
  description,
  url,
  onNew,
  buttonText,
}: {
  title: string;
  description?: string;
} & {
  url: string;
} & {
  onNew: () => void;
  buttonText: string;
}) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <div>
        <Button onClick={onNew}>{buttonText}</Button>
      </div>
    </div>
  );
}
