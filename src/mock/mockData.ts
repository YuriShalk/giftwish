import { Category } from '../types/wish';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: '1',
    title: 'Roupas e Acessórios',
    items: [
      { id: '101', name: 'Jaqueta de Couro', price: 299.9 },
      { id: '102', name: 'Tênis de Corrida', price: 450.0 },
    ],
  },
  {
    id: '2',
    title: 'Brinquedos e Jogos',
    items: [
      { id: '201', name: 'Board Game Catan', price: 350.0 },
      { id: '202', name: 'Controle PS5', price: 420.0 },
    ],
  },
  {
    id: '3',
    title: 'Livros',
    items: [
      { id: '301', name: 'O Senhor dos Anéis', price: 89.9 },
    ],
  },
];