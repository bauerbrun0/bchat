import { Style, Avatar } from "@dicebear/core";
import definition from "@dicebear/styles/voxel-bot.json" with { type: "json" };
import { useMemo } from "react";

const style = new Style(definition);

export default function UserAvatar({ seed = "Bob", animate = false }) {
  const avatar = useMemo(() => {
    return new Avatar(style, {
      seed,
      size: 128,
      animationVariant: animate ? "medium" : "none",
      // preset
    }).toDataUri();
  }, [seed]);

  return <img src={avatar} alt="Avatar" />;
}
