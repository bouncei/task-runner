import React from "react";
import {
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  useColorScheme,
} from "react-native";
import tw from "twrnc";

// Define the props for the Input component
export interface InputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ style, ...props }, ref) => {
    const colorScheme = useColorScheme() ?? "light";
    return (
      <TextInput
        ref={ref}
        style={[
          tw.style(
            "h-12 w-full rounded-xl bg-[#F0F5F5] border border-gray-300 px-3 py-2 text-sm  focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          ),
          colorScheme === "dark" && {
            backgroundColor: "#000000",
            color: "#fff",
          },
          style,
        ]}
        placeholderTextColor="#A8A8A8"
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
