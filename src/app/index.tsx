import { AddItemModal } from "@/components/AddItemModal";
import { CategorySection } from '@/components/CategorySection';
import { INITIAL_CATEGORIES } from '@/mock/mockData';
import { Category, WishItem } from "@/types/wish";
import { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleAddItem = (
    categoryId: string,
    newItem: WishItem, 
    newCategoryTitle?: string
  ) => {
    setCategories((prevCategories) => {
      // Trying create a new category
      if (newCategoryTitle) {
        const normalizedNewTitle = newCategoryTitle.trim().toLowerCase();

        const existingCategory = prevCategories.find(
          (cat) => cat.title.trim().toLowerCase() === normalizedNewTitle
        );

        // If exists, use the old one
        if (existingCategory) {
          return prevCategories.map((cat) => {
            if (cat.id === existingCategory.id) {
              return {
                ...cat,
                items: [...cat.items, newItem],
              };
            }
            return cat;
          });
        }

        // If not exists, create a new one
        const newCategory: Category = {
          id: Date.now().toString(),
          title: newCategoryTitle.trim(),
          items: [newItem],
        };
        return [...prevCategories, newCategory];
      }

      // Choose a existing category
      return prevCategories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            items: [...cat.items, newItem],
          };
        }
        return cat;
      });
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content"/>
      <View style={styles.container}>
        <Text style={styles.title}>Minha Lista de Presentes</Text>

        {/* Category List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {categories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </ScrollView>

        {/* Add item button */}
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>+ Adicionar Presente</Text>
        </TouchableOpacity>

        {/* Add item modal */}
        <AddItemModal
          visible={isModalVisible}
          categories={categories}
          onClose={() => setIsModalVisible(false)}
          onAddItem={handleAddItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  addButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});