import { Alert, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useState } from "react";
import { linkStorage } from "@/storage/link-storage";

const AlertButtonsAdd = [
  {
    text: "Ok",
    onPress: () => router.back(),
  },
];

export default function Add() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  function getErrors(): string[] {
    const errors = [];

    if (!category.trim()) errors.push("Selecione a categoria");

    if (!name.trim()) errors.push("Informe o nome");

    if (!url.trim()) errors.push("Informe a URL");

    return errors;
  }

  function getLink() {
    return {
      id: new Date().getTime().toString(),
      name,
      url,
      category,
    };
  }

  async function handleAdd() {
    try {
      const errors = getErrors();

      if (errors.length > 0) {
        Alert.alert("Erros de Validação", errors.join("\n"));
        return;
      }

      await linkStorage.save(getLink());

      Alert.alert("Sucesso", "Novo link adicionado", AlertButtonsAdd);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o link");
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>

        <Text style={styles.title}>Novo</Text>
      </View>

      <Text style={styles.label}>Selecione uma categoria</Text>
      <Categories onChange={setCategory} selected={category} />

      <View style={styles.form}>
        <Input placeholder="Nome" onChangeText={setName} autoCorrect={false} />
        <Input placeholder="URL" onChangeText={setUrl} autoCorrect={false} autoCapitalize="none" />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
    </View>
  );
}
