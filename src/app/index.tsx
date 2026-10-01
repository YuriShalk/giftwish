import { CategorySection } from '@/components/CategorySection';
import { INITIAL_CATEGORIES } from '@/mock/mockData';
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
  const handleAddCategory = () => {
    //TODO: add category method (modal or page)
    alert('Em breve!')
  }

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
          {INITIAL_CATEGORIES.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </ScrollView>

        {/* Add category button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddCategory}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>+ Adicionar Categoria</Text>
        </TouchableOpacity>
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