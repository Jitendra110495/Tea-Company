import type { Product, Review, Order, Coupon, User } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'tea-001',
    name: 'Assam Golden Reserve STGFOP1',
    subtitle: 'Full-bodied single-estate black tea with rich malt and honey notes',
    category: 'Black Tea',
    collection: 'Single Origin',
    price: 850,
    originalPrice: 1100,
    rating: 4.9,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sourced from the historic Brahmaputra Valley estate, this rare tippy golden flowering orange pekoe delivers a robust, amber liquor with natural malty sweetness and notes of caramelized wild honey.',
    origin: 'Upper Assam, India',
    elevation: '150 meters',
    flush: 'Second Flush (June Harvest)',
    ingredients: ['100% Handpicked Organic Assam Whole Leaf Tea'],
    tasteNotes: ['Malt', 'Wild Honey', 'Caramel', 'Warm Spices'],
    aroma: 'Rich roasted cocoa with sweet floral undertones',
    caffeine: 'High',
    benefits: ['Enhances mental alertness', 'Supports heart health', 'Rich in natural polyphenols'],
    brewingGuide: {
      waterTemp: '95°C',
      steepTime: '3-4 mins',
      timerSeconds: 210,
      servingSize: '2.5g per 200ml cup'
    },
    inStock: true,
    stockQuantity: 45,
    isBestSeller: true
  },
  {
    id: 'tea-002',
    name: 'Darjeeling First Flush Spring Blossom',
    subtitle: 'The Champagne of Teas with delicate floral and muscatel bouquet',
    category: 'Black Tea',
    collection: 'Royal Reserve',
    price: 1450,
    rating: 5.0,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Plucked exclusively during the first spring mist in the misty Himalayan foothills, this ultra-premium harvest yields a pale golden infusion with muscatel grape brightness and fresh spring flower aromatics.',
    origin: 'Darjeeling Foothills, West Bengal',
    elevation: '2,100 meters',
    flush: 'First Flush (Early March)',
    ingredients: ['100% Single Estate First Flush Greenish-Black Whole Leaves'],
    tasteNotes: ['Muscatel Grape', 'Green Apple', 'White Jasmine', 'Fresh Meadow'],
    aroma: 'Subtle orchid and citrus breeze',
    caffeine: 'Medium',
    benefits: ['Gentle energizer', 'Boosts metabolic vitality', 'High antioxidant concentration'],
    brewingGuide: {
      waterTemp: '85°C',
      steepTime: '2.5 mins',
      timerSeconds: 150,
      servingSize: '2g per 200ml cup'
    },
    inStock: true,
    stockQuantity: 20,
    isBestSeller: true,
    isNew: true
  },
  {
    id: 'tea-003',
    name: 'Kashmiri Shahi Saffron Kahwa',
    subtitle: 'Traditional royal Himalayan infusion with organic green tea, saffron & crushed almonds',
    category: 'Wellness Blend',
    collection: 'Signature',
    price: 1200,
    originalPrice: 1350,
    rating: 4.8,
    reviewCount: 56,
    image: 'https://images.unsplash.com/photo-1563822249510-04678c787b47?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563822249510-04678c787b47?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An opulent recipe passed down through Kashmiri royalty. Combines stone-ground Kashmiri saffron strands, green tea leaves, green cardamom, cinnamon bark, cloves, and flaked almonds.',
    origin: 'Pampore & Kangra Valley, India',
    elevation: '1,600 meters',
    flush: 'Autumn Harvest',
    ingredients: [
      'Organic Kangra Green Tea',
      'Pampore Saffron Strands',
      'Green Cardamom Pods',
      'Ceylon Cinnamon',
      'Kashmiri Almond Flakes'
    ],
    tasteNotes: ['Saffron Silk', 'Cardamom Heat', 'Sweet Almond', 'Cinnamon Warmth'],
    aroma: 'Exotic spicy sweetness with rich saffron perfume',
    caffeine: 'Low',
    benefits: ['Warming & immunity boosting', 'Promotes glowing skin', 'Aids digestional comfort'],
    brewingGuide: {
      waterTemp: '90°C',
      steepTime: '4 mins',
      timerSeconds: 240,
      servingSize: '3g per 200ml cup'
    },
    inStock: true,
    stockQuantity: 60,
    isBestSeller: true
  },
  {
    id: 'tea-004',
    name: 'Chamomile Lavender Serenity',
    subtitle: 'Calming caffeine-free botanical infusion for peaceful sleep and deep relaxation',
    category: 'Herbal Tea',
    collection: 'Wellness',
    price: 750,
    rating: 4.9,
    reviewCount: 31,
    image: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Whole Egyptian golden chamomile blossoms paired with French lavender buds and subtle spearmint leaves. Crafted to unwind stress after a long corporate day.',
    origin: 'Nile River Delta & Himalayan Foothills',
    elevation: 'Coastal & Sub-Himalayan',
    flush: 'Perennial Flower Harvest',
    ingredients: ['Whole Chamomile Flowers', 'Organic French Lavender', 'Spearmint Leaves'],
    tasteNotes: ['Sweet Apple Blossom', 'Floral Lavender', 'Soft Mint'],
    aroma: 'Soothing honeyed flowers and relaxing herbs',
    caffeine: 'None',
    benefits: ['Supports deep restorative sleep', 'Relieves tension and anxiety', 'Soothes digestive tract'],
    brewingGuide: {
      waterTemp: '100°C',
      steepTime: '5 mins',
      timerSeconds: 300,
      servingSize: '2g per 200ml cup'
    },
    inStock: true,
    stockQuantity: 35
  },
  {
    id: 'tea-005',
    name: 'Ceremonial Uji Japanese Matcha',
    subtitle: 'First-harvest shade-grown green tea powder with intense umami and vivid green jade hue',
    category: 'Green Tea',
    collection: 'Signature',
    price: 1850,
    rating: 4.9,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Directly imported from Kyoto organic farms. Stone-ground from 30-day shade-grown Tencha leaves. Delivers rich L-theanine energy without jitters.',
    origin: 'Uji, Kyoto Prefecture',
    elevation: '350 meters',
    flush: 'First Harvest (Ichiban-cha)',
    ingredients: ['100% Organic Shade-Grown Uji Matcha Powder'],
    tasteNotes: ['Deep Umami', 'Creamy Vegetal', 'Sweet Grass', 'No Bitterness'],
    aroma: 'Vibrant sweet steamed green leaves',
    caffeine: 'Medium',
    benefits: ['Sustained calm focus', 'Potent EGCG antioxidant power', 'Metabolic booster'],
    brewingGuide: {
      waterTemp: '75°C',
      steepTime: 'Whisk 30-45 secs',
      timerSeconds: 45,
      servingSize: '1.5g per 70ml warm water'
    },
    inStock: true,
    stockQuantity: 18,
    isNew: true
  },
  {
    id: 'tea-006',
    name: 'Organic Hibiscus Rose Blush',
    subtitle: 'Vibrant ruby red botanical elixir bursting with vitamin C and velvety damask rose',
    category: 'Herbal Tea',
    collection: 'Signature',
    price: 680,
    rating: 4.7,
    reviewCount: 24,
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Tart organic hibiscus calyces blended with sun-dried Kannauj rose petals and sweet liquorice root. Exceptional hot or flash-chilled with ice.',
    origin: 'Rajasthan & Uttar Pradesh, India',
    elevation: '400 meters',
    flush: 'Autumn Harvest',
    ingredients: ['Wild Hibiscus Calyces', 'Kannauj Organic Rose Petals', 'Sweet Liquorice Root'],
    tasteNotes: ['Tart Cranberry', 'Velvet Rose', 'Natural Sweet Finish'],
    aroma: 'Intense rose garden with tangy fruit notes',
    caffeine: 'None',
    benefits: ['Rich in vitamin C', 'Supports healthy blood pressure', 'Naturally hydrating'],
    brewingGuide: {
      waterTemp: '95°C',
      steepTime: '4 mins',
      timerSeconds: 240,
      servingSize: '3g per 200ml cup'
    },
    inStock: true,
    stockQuantity: 50
  },
  {
    id: 'tea-007',
    name: 'White Peony Silver Needle (Bai Mu Dan)',
    subtitle: 'Ultra-rare unopened downy leaf buds with soft melon and cucumber clarity',
    category: 'White Tea',
    collection: 'Royal Reserve',
    price: 1950,
    rating: 5.0,
    reviewCount: 19,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Harvested during just two mornings in early spring when unopened buds are covered in silver fuzz. Gently withered under natural sunlight with minimal processing.',
    origin: 'Fuding, Fujian Province',
    elevation: '800 meters',
    flush: 'Early Spring Harvest',
    ingredients: ['100% Whole White Peony Tender Leaf Buds'],
    tasteNotes: ['Honeydew Melon', 'Fresh Cucumber', 'White Peach', 'Silky Sweetness'],
    aroma: 'Delicate alpine dew and honeyed grass',
    caffeine: 'Low',
    benefits: ['Youth-preserving polyphenols', 'Gentlest on digestion', 'Pure hydration'],
    brewingGuide: {
      waterTemp: '80°C',
      steepTime: '3.5 mins',
      timerSeconds: 210,
      servingSize: '2g per 200ml cup'
    },
    inStock: true,
    stockQuantity: 12
  },
  {
    id: 'tea-008',
    name: 'High Mountain Milky Oolong',
    subtitle: 'Artisanal semi-oxidized Taiwanese oolong with smooth butter & orchid richness',
    category: 'Oolong Tea',
    collection: 'Single Origin',
    price: 1350,
    rating: 4.9,
    reviewCount: 35,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Grown high above mountain clouds, these hand-rolled green pearls open into whole leaves delivering a naturally creamy, buttery mouthfeel without any dairy additives.',
    origin: 'Ali Mountain, Taiwan',
    elevation: '1,400 meters',
    flush: 'Winter Flush',
    ingredients: ['100% Hand-Rolled Milky Oolong Whole Leaves'],
    tasteNotes: ['Sweet Butter', 'Steamed Milk', 'Wild Orchid', 'Peach Nectar'],
    aroma: 'Creamy condensed milk and spring orchids',
    caffeine: 'Medium',
    benefits: ['Aids fat metabolism', 'Soothes digestion', 'Balanced mental energy'],
    brewingGuide: {
      waterTemp: '90°C',
      steepTime: '3 mins (re-steepable 5x)',
      timerSeconds: 180,
      servingSize: '3g per 200ml cup'
    },
    inStock: true,
    stockQuantity: 28
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-001',
    productId: 'tea-001',
    author: 'Priya Sharma',
    rating: 5,
    date: '2026-07-28',
    headline: 'Redefined my morning ritual',
    comment: 'The Assam Golden Reserve is unmatched. The packaging alone feels like unboxing a bespoke perfume. Rich malt aroma filling the entire kitchen!',
    verified: true
  },
  {
    id: 'rev-002',
    productId: 'tea-002',
    author: 'Rahul Mehta',
    rating: 5,
    date: '2026-08-02',
    headline: 'Exquisite muscatel notes',
    comment: 'I travel internationally and sample tea across Asia. This First Flush Darjeeling rivals top luxury houses in London and Tokyo. Extraordinary clarity.',
    verified: true
  },
  {
    id: 'rev-003',
    productId: 'tea-003',
    author: 'Neha Kapoor',
    rating: 5,
    date: '2026-08-05',
    headline: 'The ultimate gift for clients',
    comment: 'Gifted 10 personalized tins of Kashmiri Saffron Kahwa to our executive clients. The customized tin labels were flawless!',
    verified: true
  }
];

export const MOCK_USER: User = {
  id: 'usr-001',
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  role: 'customer',
  phone: '+91 98765 43210',
  addresses: [
    {
      id: 'addr-001',
      name: 'Priya Sharma (Home)',
      street: '402, Green Glen Layout, Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      phone: '+91 98765 43210',
      isDefault: true
    }
  ]
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'TS-2026-8891',
    createdAt: '2026-08-10',
    userId: 'usr-001',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@example.com',
    items: [
      {
        id: 'ci-1',
        product: INITIAL_PRODUCTS[0],
        customizer: {
          format: 'Loose Leaf',
          sweetener: 'Unsweetened',
          packageSize: '100g',
          giftNote: 'Happy Birthday!'
        },
        unitPrice: 1530,
        quantity: 1
      },
      {
        id: 'ci-2',
        product: INITIAL_PRODUCTS[2],
        customizer: {
          format: 'Loose Leaf',
          sweetener: 'Natural Stevia',
          packageSize: '100g'
        },
        unitPrice: 2160,
        quantity: 1
      }
    ],
    subtotal: 3690,
    discount: 369,
    tax: 180,
    shippingCost: 0,
    totalAmount: 3501,
    status: 'Dispatched',
    shippingAddress: {
      id: 'addr-001',
      name: 'Priya Sharma',
      street: '402, Green Glen Layout, Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      phone: '+91 98765 43210',
      isDefault: true
    },
    paymentMethod: 'UPI (Razorpay)',
    paymentId: 'pay_Pzq90184Jk',
    trackingNumber: 'SRK-990281-IN',
    courierPartner: 'Shiprocket Luxury Express',
    estimatedDelivery: '2026-08-14'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c-01',
    code: 'LUXURY10',
    discountType: 'percentage',
    value: 10,
    minSpend: 1000,
    active: true
  },
  {
    id: 'c-02',
    code: 'WELCOME500',
    discountType: 'fixed',
    value: 500,
    minSpend: 2500,
    active: true
  }
];
