import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { WishItem } from '../types/wish';

interface Props {
  item: WishItem;
}

export function WishItemCard({ item }: Props) {
  const [isInfoExpanded, setIsInfoExpanded] = useState<boolean>(false);

  const toggleInfo = () => {
    setIsInfoExpanded((prev) => !prev);
  };

  const handleOpenUrl = (url: string) => {
    Linking.openURL(url).catch(() => {
      alert('Não foi possível abrir o link.');
    });
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.mainRow}>
        <View style={styles.nameContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          
          {/* Info Button */}
          <TouchableOpacity 
            style={styles.infoButton} 
            onPress={toggleInfo}
            activeOpacity={0.6}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.infoIcon, isInfoExpanded && styles.infoIconActive]}>
              ℹ
            </Text>
          </TouchableOpacity>
        </View>

        {item.price && (
          <Text style={styles.itemPrice}>
            R$ {item.price.toFixed(2).replace('.', ',')}
          </Text>
        )}
      </View>

      {/* Aditional Details Panel */}
      {isInfoExpanded && (
        <View style={styles.detailsPanel}>
          {item.size && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tamanho:</Text>
              <Text style={styles.detailValue}>{item.size}</Text>
            </View>
          )}

          {item.url && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Link:</Text>
              <TouchableOpacity onPress={() => handleOpenUrl(item.url!)}>
                <Text style={styles.linkText} numberOfLines={1}>
                  {item.url}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {item.notes && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Observações:</Text>
              <Text style={styles.detailValue}>{item.notes}</Text>
            </View>
          )}

          {/* Fallback message */}
          {!item.size && !item.url && !item.notes && (
            <Text style={styles.noDetailsText}>
              Nenhuma informação adicional cadastrada para este item.
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2C3E50',
  },
  infoButton: {
    marginLeft: 8,
    padding: 2,
  },
  infoIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7F8C8D',
    backgroundColor: '#ECF0F1',
    width: 22,
    height: 22,
    borderRadius: 11,
    textAlign: 'center',
    lineHeight: 22,
    overflow: 'hidden',
  },
  infoIconActive: {
    color: '#FFFFFF',
    backgroundColor: '#3498DB',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27AE60',
  },
  detailsPanel: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#3498DB',
  },
  detailRow: {
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7F8C8D',
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 14,
    color: '#34495E',
    marginTop: 2,
  },
  linkText: {
    fontSize: 14,
    color: '#2980B9',
    textDecorationLine: 'underline',
    marginTop: 2,
  },
  noDetailsText: {
    fontSize: 13,
    color: '#95A5A6',
    fontStyle: 'italic',
  },
});