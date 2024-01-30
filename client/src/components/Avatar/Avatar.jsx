import { BASE_URL } from "../../constants";
import AvatarPlaceholder from "./avatar-placeholder.png";

export const Avatar = ({ style, user, size, className }) => {
  const sizeStyle = { width: size + "px", height: size + "px" };
  return (
    <div
      style={{
        ...sizeStyle,
        ...style,
      }}
      className={className}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        }}
        src={user.imageUrl ? BASE_URL + user.imageUrl : AvatarPlaceholder}
        alt={user.fullName}
      />
    </div>
  );
};
