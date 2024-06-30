import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvtar({ src, alt, name }) {
  return (
    <Avatar className="w-12 h-12 text-black">
      <AvatarImage src={src} alt={alt ? alt : "Avtar"} />

      <AvatarFallback>{name ? name : "U"}</AvatarFallback>
    </Avatar>
  );
}
