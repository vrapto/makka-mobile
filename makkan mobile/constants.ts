
import { Product } from './types';

export const MAKKA_PRODUCT: Product = {
  id: 'kidney-bladder-combo',
  name: 'Kidney & Bladder Combo Special',
  price: 670.00,
  currency: 'R',
  description: 'A powerful organic duo consisting of the Bladder & Kidney Support (100ml) and the Kidney & Bladder Booster (50ml). Specially formulated to assist in preventing infections, reducing small stones, and cleansing kidney filters.',
  benefits: [
    'Assists in preventing infection (cystitis)',
    'Helps reduce small stones and burning urination',
    'Reduces backache and swollen legs',
    'Protects kidneys from nephrotoxic medicine',
    'Effectively cleanses kidney filters',
    'No artificial preservatives or flavourings'
  ],
  ingredients: [
    'Buchu',
    'Bearberry',
    'Gravel Root',
    'Boldo',
    '50% Medicinal Ethanol'
  ],
  // Pointing to the specific combo product image
  image: 'https://makka.co.za/wp-content/uploads/2025/01/Bladder-Kidney-Support-dual.jpg' 
};

export const DOSAGE_INFO = {
  adults: '20 - 30 Drops Support in a glass of water, drink 2 - 4x a day. Spray Booster 10X before drops.',
  children: '10 - 20 Drops in a glass of water, drink 2 - 4x a day.',
  notes: 'Shake well before use. Store below 30°C and dark place. Keep out of reach of children. Not to be taken during pregnancy.'
};

export const COLORS = {
  primary: '#800000', // Deep Maroon/Burgundy from labels
  secondary: '#2d5a27', // Health Green
  accent: '#f9a825', // Highlight Gold
};
