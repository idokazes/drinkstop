import BootstrapButton from "react-bootstrap/Button";

export const Button = ({
  variant = "dark",
  size = "lg",
  children,
  ...props
}) => {
  return (
    <BootstrapButton variant={variant} size={size} {...props}>
      {children}
    </BootstrapButton>
  );
};
