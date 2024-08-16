import React from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import tw from "twrnc";

// Define your variant and size options with corresponding Tailwind styles
const buttonVariants = {
  default: "bg-[#006970] text-white",
  destructive: "bg-red-500 text-white",
  outline: "border border-gray-500 bg-transparent text-gray-500",
  secondary: "bg-gray-500 text-white",
  ghost: "bg-transparent text-gray-500",
  link: "text-[#006970] underline",
} as const;

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-[56px] px-8",
  icon: "h-10 w-10 justify-center",
} as const;

// Define the props for the Button component
interface ButtonProps extends TouchableOpacityProps {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  style,
  textStyle,
  children,
  ...props
}) => {
  // Determine the styles based on variant and size
  const variantStyle = buttonVariants[variant];
  const sizeStyle = buttonSizes[size];

  return (
    <TouchableOpacity
      style={[
        tw.style(
          `${variantStyle} ${sizeStyle} rounded-md items-center justify-center`
        ),
        style,
      ]}
      {...props}
    >
      <Text style={[tw.style("text-sm font-medium"), textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export { Button };
