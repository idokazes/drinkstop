import BootstrapButton from "react-bootstrap/Button";

export const Button = ({
  variant = "dark",
  size = "lg",
  children,
  ...props
}) => {
  const style = {
    ...props.style,
    ...(variant === "danger" && { backgroundColor: "#ce0014", color: "black" }),
  };
  return (
    <BootstrapButton variant={variant} {...props} style={style}>
      {children}
    </BootstrapButton>
  );
};
