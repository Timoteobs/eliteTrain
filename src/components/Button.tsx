import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
  variant?: "solid" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  title,
  ...rest
}) => {
  return (
    <ButtonNativeBase
      w="full"
      h="50px"
      bg={variant === "outline" ? "transparent" : "green.700"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="green.500"
      _pressed={{
        bg: variant === "outline" ? "gray.700" : "green.500",
      }}
      {...rest}
    >
      <Text
        color={variant === "outline" ? "green.500" : "white"}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
};

export default Button;
