import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Category } from '../types/wish';
import { WishItemCard } from './WishItemCard';

interface Props {
  category: Category;
}

export function CategorySection({ category }: Props ) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Clickable Header */}
      <TouchableOpacity 
        style={styles.header} 
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <Text style={styles.headerTitle}>{category.title}</Text>
        <Text style={styles.arrowIcon}>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {/* Items List */}
      {isExpanded && (
        <View style={styles.itemsList}>
          {category.items.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum item nesta categoria.</Text>
          ) : (
            category.items.map((item) => (
              <WishItemCard key={item.id} item={item} />
            ))
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4A90E2',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  arrowIcon: {
    fontSize: 14,
    color: '#ffffff',
  },
  itemsList: {
    padding: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#888888',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 8,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemName: {
    fontSize: 15,
    color: '#333333',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
  },
});