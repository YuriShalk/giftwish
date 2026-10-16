import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Category, WishItem } from "../types/wish";

interface Props {
  visible: boolean;
  categories: Category[];
  onClose: () => void;
  onAddItem: (
    categoryId: string,
    newItem: WishItem,
    newCategoryTitle?: string,
  ) => void;
}

export function AddItemModal({
  visible,
  categories,
  onClose,
  onAddItem,
}: Props) {
  // Form fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [size, setSize] = useState("");
  const [notes, setNotes] = useState("");

  // Category
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    categories[0]?.id || "",
  );
  const [isCreatingNewCategory, setIsCreatingNewCategory] =
    useState<boolean>(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  const resetForm = () => {
    setName("");
    setPrice("");
    setUrl("");
    setSize("");
    setNotes("");
    setIsCreatingNewCategory(false);
    setNewCategoryTitle("");
    setSelectedCategoryId(categories[0]?.id || "");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Por favor, informe o nome do item.");
      return;
    }

    if (isCreatingNewCategory && !newCategoryTitle.trim()) {
      alert("Por favor, informe o nome da nova categoria.");
      return;
    }

    const newItem: WishItem = {
      id: Date.now().toString(),
      name: name.trim(),
      price: price ? parseFloat(price.replace(",", ".")) : undefined,
      url: url.trim() || undefined,
      size: size.trim() || undefined,
      notes: notes.trim() || undefined,
    };

    if (isCreatingNewCategory) {
      onAddItem("", newItem, newCategoryTitle.trim());
    } else {
      onAddItem(selectedCategoryId, newItem);
    }

    handleClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : undefined}
        style={styles.overlay}
      >
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Novo Presente</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.formContent}
          >
            <Text style={styles.label}>Nome do Presente *</Text>
            <TextInput
              style={styles.input}
              placeholder="O que eu quero ganhar é..."
              value={name}
              onChangeText={setName}
            />

            {/* Category session */}
            <View style={styles.categoryHeaderRow}>
              <Text style={styles.label}>Categoria *</Text>
              <TouchableOpacity
                onPress={() => setIsCreatingNewCategory(!isCreatingNewCategory)}
              >
                <Text style={styles.toggleCategoryText}>
                  {isCreatingNewCategory
                    ? "← Escolher existente"
                    : "+ Nova Categoria"}
                </Text>
              </TouchableOpacity>
            </View>

            {isCreatingNewCategory ? (
              <TextInput
                style={[styles.input, styles.newCategoryInput]}
                placeholder="Digite o nome da nova categoria"
                value={newCategoryTitle}
                onChangeText={setNewCategoryTitle}
              />
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryChipsContainer}
              >
                {categories.map((cat) => {
                  const isSelect = cat.id === selectedCategoryId;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      style={[styles.chip, isSelect && styles.chipSelected]}
                      onPress={() => setSelectedCategoryId(cat.id)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isSelect && styles.chipTextSelected,
                        ]}
                      >
                        {cat.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}

            {/* Price field */}
            <Text style={styles.label}>Preço estimado (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 50.00"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={setPrice}
            />

            {/* Size field */}
            <Text style={styles.label}>Tamanho</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Tamanho G, Número 42"
              value={size}
              onChangeText={setSize}
            />

            {/* Link field */}
            <Text style={styles.label}>Link do Produto</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: https://loja.com/produto"
              autoCapitalize="none"
              keyboardType="url"
              value={url}
              onChangeText={setUrl}
            />

            {/* Notes field */}
            <Text style={styles.label}>Detalhes extras</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Instruções adicionais, cupons de descontos..."
              multiline
              numberOfLines={3}
              value={notes}
              onChangeText={setNotes}
            />
          </ScrollView>

          {/* Save button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Salvar Presente</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: "90%", // 90% of screen
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 20,
    color: "#888888",
    fontWeight: "bold",
  },
  formContent: {
    paddingVertical: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#2D3748",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  categoryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 6,
  },
  toggleCategoryText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#27AE60",
  },
  newCategoryInput: {
    borderColor: "#27AE60",
    backgroundColor: "#F0FDF4",
  },
  categoryChipsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#EDF2F7",
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: "#4A90E2",
  },
  chipText: {
    fontSize: 13,
    color: "#4A5568",
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
