import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  name?: string;
  className?: string;
}

export function UserAvatar({ name, className }: UserAvatarProps) {
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Avatar className={className}>
      <AvatarFallback className="bg-primary text-primary-foreground">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
