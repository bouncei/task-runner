import React from "react";
import { TextInput, TextInputProps, StyleProp, ViewStyle } from "react-native";
import tw from "twrnc";

// Define the props for the Input component
export interface InputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  colorScheme: "light" | "dark";
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ style, colorScheme, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={[
          tw.style(
            "h-12 w-full rounded-md bg-[#F0F5F5] border border-gray-300 px-3 py-2 text-sm  focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          ),
          colorScheme === "dark" && {
            backgroundColor: "#000000",
            color: "#fff",
          },
          style,
        ]}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
