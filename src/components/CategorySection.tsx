import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Category } from "../types/wish";
import { WishItemCard } from "./WishItemCard";

interface Props {
  category: Category;
}

export function CategorySection({ category }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>{category.title}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{category.items.length}</Text>
          </View>
        </View>

        <Text style={styles.arrowIcon}>{isExpanded ? "▲" : "▼"}</Text>
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
    backgroundColor: "#ffffff",
    overflow: "hidden",
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#4A90E2",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  arrowIcon: {
    fontSize: 14,
    color: "#ffffff",
  },
  itemsList: {
    padding: 12,
  },
  emptyText: {
    fontSize: 14,
    color: "#888888",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 8,
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemName: {
    fontSize: 15,
    color: "#333333",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E7D32",
  },
});
