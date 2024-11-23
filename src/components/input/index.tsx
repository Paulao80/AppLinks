import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";

export function Input(props: Readonly<TextInputProps>) {
  return <TextInput style={styles.container} placeholderTextColor={colors.gray[400]} {...props} />;
}
