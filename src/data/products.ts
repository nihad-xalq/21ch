export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const products: Product[] = [
  // Köynəklər
  {
    id: 't1',
    name: 'Sadə Pambıq Köynək',
    price: 29.99,
    category: 'T-Shirts',
    image: '/products/tshirt-1.jpg',
    isBestseller: true
  },
  {
    id: 't2',
    name: 'Orqanik Pambıq V-Yaxa',
    price: 34.99,
    category: 'T-Shirts',
    image: '/products/tshirt-2.jpg'
  },
  {
    id: 't3',
    name: 'Zolaqlı Uzunqol Köynək',
    price: 39.99,
    category: 'T-Shirts',
    image: '/products/tshirt-3.jpg'
  },
  {
    id: 't4',
    name: 'Qrafik Naxışlı Köynək',
    price: 32.99,
    category: 'T-Shirts',
    image: '/products/tshirt-4.jpg'
  },
  {
    id: 't5',
    name: 'Premium Pambıq Qarışığı',
    price: 44.99,
    category: 'T-Shirts',
    image: '/products/tshirt-5.jpg',
    isNew: true
  },

  // Donlar
  {
    id: 'd1',
    name: 'Güllü Yay Donu',
    price: 89.99,
    category: 'Dresses',
    image: '/products/dress-1.jpg',
    isBestseller: true
  },
  {
    id: 'd2',
    name: 'Axşam Kokteyl Donu',
    price: 129.99,
    category: 'Dresses',
    image: '/products/dress-2.jpg'
  },
  {
    id: 'd3',
    name: 'Gündəlik Maxi Don',
    price: 79.99,
    category: 'Dresses',
    image: '/products/dress-3.jpg'
  },
  {
    id: 'd4',
    name: 'İpək Sarğı Don',
    price: 159.99,
    category: 'Dresses',
    image: '/products/dress-4.jpg',
    isNew: true
  },

  // Cinslər
  {
    id: 'j1',
    name: 'Klassik Düz Cins',
    price: 79.99,
    category: 'Jeans',
    image: '/products/jeans-1.jpg',
    isBestseller: true
  },
  {
    id: 'j2',
    name: 'Yüksəkbel Dar Cins',
    price: 89.99,
    category: 'Jeans',
    image: '/products/jeans-2.jpg'
  },
  {
    id: 'j3',
    name: 'Boyfriend Stil Cins',
    price: 94.99,
    category: 'Jeans',
    image: '/products/jeans-3.jpg'
  },
  {
    id: 'j4',
    name: 'Geniş Paça Denim',
    price: 99.99,
    category: 'Jeans',
    image: '/products/jeans-4.jpg',
    isNew: true
  },

  // Gödəkçələr
  {
    id: 'jk1',
    name: 'Dəri Biker Gödəkçə',
    price: 199.99,
    category: 'Jackets',
    image: '/products/jacket-1.jpg',
    isBestseller: true
  },
  {
    id: 'jk2',
    name: 'Denim Gödəkçə',
    price: 89.99,
    category: 'Jackets',
    image: '/products/jacket-2.jpg'
  },
  {
    id: 'jk3',
    name: 'Bomber Gödəkçə',
    price: 129.99,
    category: 'Jackets',
    image: '/products/jacket-3.jpg'
  },
  {
    id: 'jk4',
    name: 'Blazer',
    price: 149.99,
    category: 'Jackets',
    image: '/products/jacket-4.jpg',
    isNew: true
  },

  // Svitrlər
  {
    id: 's1',
    name: 'Kaşmir Pullover',
    price: 159.99,
    category: 'Sweaters',
    image: '/products/sweater-1.jpg',
    isBestseller: true
  },
  {
    id: 's2',
    name: 'Yun Kardiqan',
    price: 119.99,
    category: 'Sweaters',
    image: '/products/sweater-2.jpg'
  },
  {
    id: 's3',
    name: 'Boğazlı Sviter',
    price: 89.99,
    category: 'Sweaters',
    image: '/products/sweater-3.jpg'
  },
  {
    id: 's4',
    name: 'V-Yaxa Trikotaj',
    price: 79.99,
    category: 'Sweaters',
    image: '/products/sweater-4.jpg',
    isNew: true
  },

  // Ətəklər
  {
    id: 'sk1',
    name: 'Büzməli Midi Ətək',
    price: 69.99,
    category: 'Skirts',
    image: '/products/skirt-1.jpg',
    isBestseller: true
  },
  {
    id: 'sk2',
    name: 'A-Kəsimli Mini Ətək',
    price: 49.99,
    category: 'Skirts',
    image: '/products/skirt-2.jpg'
  },
  {
    id: 'sk3',
    name: 'Qələm Ətək',
    price: 79.99,
    category: 'Skirts',
    image: '/products/skirt-3.jpg'
  },
  {
    id: 'sk4',
    name: 'Sarğı Ətək',
    price: 59.99,
    category: 'Skirts',
    image: '/products/skirt-4.jpg',
    isNew: true
  },

  // Kostyumlar
  {
    id: 'su1',
    name: 'Klassik Biznes Kostyumu',
    price: 299.99,
    category: 'Suits',
    image: '/products/suit-1.jpg',
    isBestseller: true
  },
  {
    id: 'su2',
    name: 'Axşam Smokin',
    price: 399.99,
    category: 'Suits',
    image: '/products/suit-2.jpg'
  },
  {
    id: 'su3',
    name: 'Yay Kətan Kostyumu',
    price: 259.99,
    category: 'Suits',
    image: '/products/suit-3.jpg'
  },
  {
    id: 'su4',
    name: 'Müasir Kəsimli Kostyum',
    price: 349.99,
    category: 'Suits',
    image: '/products/suit-4.jpg',
    isNew: true
  },

  // Aktiv geyimlər
  {
    id: 'a1',
    name: 'Performans Leqqinləri',
    price: 59.99,
    category: 'Activewear',
    image: '/products/activewear-1.jpg',
    isBestseller: true
  },
  {
    id: 'a2',
    name: 'İdman Sutyeni',
    price: 34.99,
    category: 'Activewear',
    image: '/products/activewear-2.jpg'
  },
  {
    id: 'a3',
    name: 'Qaçış Şortları',
    price: 29.99,
    category: 'Activewear',
    image: '/products/activewear-3.jpg'
  },
  {
    id: 'a4',
    name: 'Yoga Dəsti',
    price: 89.99,
    category: 'Activewear',
    image: '/products/activewear-4.jpg',
    isNew: true
  },

  // Aksesuarlar
  {
    id: 'ac1',
    name: 'Dəri Kəmər',
    price: 39.99,
    category: 'Accessories',
    image: '/products/accessory-1.jpg',
    isBestseller: true
  },
  {
    id: 'ac2',
    name: 'İpək Şərf',
    price: 29.99,
    category: 'Accessories',
    image: '/products/accessory-2.jpg'
  },
  {
    id: 'ac3',
    name: 'Bəyanat Boyunbağı',
    price: 49.99,
    category: 'Accessories',
    image: '/products/accessory-3.jpg'
  },
  {
    id: 'ac4',
    name: 'Dəri Çanta',
    price: 129.99,
    category: 'Accessories',
    image: '/products/accessory-4.jpg',
    isNew: true
  },

  // Ayaqqabılar
  {
    id: 'sh1',
    name: 'Klassik Dəri Ayaqqabı',
    price: 119.99,
    category: 'Shoes',
    image: '/products/shoes-1.jpg',
    isBestseller: true
  },
  {
    id: 'sh2',
    name: 'İdman Ayaqqabısı',
    price: 89.99,
    category: 'Shoes',
    image: '/products/shoes-2.jpg'
  },
  {
    id: 'sh3',
    name: 'Bilekli Çəkmə',
    price: 149.99,
    category: 'Shoes',
    image: '/products/shoes-3.jpg'
  },
  {
    id: 'sh4',
    name: 'Yay Sandalları',
    price: 69.99,
    category: 'Shoes',
    image: '/products/shoes-4.jpg',
    isNew: true
  }
];