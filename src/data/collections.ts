export interface Collection {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const collections: Collection[] = [
  // Köynəklər
  {
    id: "t1",
    name: "1",
    price: 29.99,
    category: "Alllong",
    image: "/products/tshirt-1.jpg",
    isBestseller: true,
  },
  {
    id: "t2",
    name: "Orqanik Pambıq V-Yaxa",
    price: 34.99,
    category: "TheMidiedit",
    image: "/products/tshirt-2.jpg",
  },

  // Donlar
  {
    id: "d1",
    name: "Güllü Yay Donu",
    price: 89.99,
    category: "Short edition",
    image: "/products/dress-1.jpg",
    isBestseller: true,
  },
  // {
  //   id: 'd2',
  //   name: 'Axşam Kokteyl Donu',
  //   price: 129.99,
  //   category: 'Dresses',
  //   image: '/products/dress-2.jpg'
  // },
  // {
  //   id: 'd3',
  //   name: 'Gündəlik Maxi Don',
  //   price: 79.99,
  //   category: 'Dresses',
  //   image: '/products/dress-3.jpg'
  // },
  // {
  //   id: 'd4',
  //   name: 'İpək Sarğı Don',
  //   price: 159.99,
  //   category: 'Dresses',
  //   image: '/products/dress-4.jpg',
  //   isNew: true
  // },

  // Gödəkçələr
  {
    id: "jk1",
    name: "Dəri Biker Gödəkçə",
    price: 199.99,
    category: "Alllong",
    image: "/products/jacket-1.jpg",
    isBestseller: true,
  },

  // Svitrlər
  {
    id: "s1",
    name: "Kaşmir Pullover",
    price: 159.99,
    category: "TheMidiedit",
    image: "/products/sweater-1.jpg",
    isBestseller: true,
  },
  // {
  //   id: 's3',
  //   name: 'Boğazlı Sviter',
  //   price: 89.99,
  //   category: 'Sweaters',
  //   image: '/products/sweater-3.jpg'
  // },
  // {
  //   id: 's4',
  //   name: 'V-Yaxa Trikotaj',
  //   price: 79.99,
  //   category: 'Sweaters',
  //   image: '/products/sweater-4.jpg',
  //   isNew: true
  // },

  // Ətəklər
  {
    id: "sk1",
    name: "Büzməli Midi Ətək",
    price: 69.99,
    category: "Short edition",
    image: "/products/skirt-1.jpg",
    isBestseller: true,
  },

  // Kostyumlar
  {
    id: "su1",
    name: "Klassik Biznes Kostyumu",
    price: 299.99,
    category: "Alllong",
    image: "/products/suit-1.jpg",
    isBestseller: true,
  },
  // {
  //   id: 'su3',
  //   name: 'Yay Kətan Kostyumu',
  //   price: 259.99,
  //   category: 'Suits',
  //   image: '/products/suit-3.jpg'
  // },

  // Aktiv geyimlər
  {
    id: "a1",
    name: "Performans Leqqinləri",
    price: 59.99,
    category: "TheMidiedit",
    image: "/products/activewear-1.jpg",
    isBestseller: true,
  },
  // {
  //   id: 'a2',
  //   name: 'İdman Sutyeni',
  //   price: 34.99,
  //   category: 'Activewear',
  //   image: '/products/activewear-2.jpg'
  // },
  // {
  //   id: 'a3',
  //   name: 'Qaçış Şortları',
  //   price: 29.99,
  //   category: 'Activewear',
  //   image: '/products/activewear-3.jpg'
  // },
  // {
  //   id: 'a4',
  //   name: 'Yoga Dəsti',
  //   price: 89.99,
  //   category: 'Activewear',
  //   image: '/products/activewear-4.jpg',
  //   isNew: true
  // },

  // Aksesuarlar
  {
    id: "ac1",
    name: "Dəri Kəmər",
    price: 39.99,
    category: "Short edition",
    image: "/products/accessory-1.jpg",
    isBestseller: true,
  },

  // Ayaqqabılar
  {
    id: "sh1",
    name: "Klassik Dəri Ayaqqabı",
    price: 119.99,
    category: "Alllong",
    image: "/products/shoes-1.jpg",
    isBestseller: true,
  },
  // {
  //   id: 'sh2',
  //   name: 'İdman Ayaqqabısı',
  //   price: 89.99,
  //   category: 'Shoes',
  //   image: '/products/shoes-2.jpg'
  // },
  // {
  //   id: 'sh3',
  //   name: 'Bilekli Çəkmə',
  //   price: 149.99,
  //   category: 'Shoes',
  //   image: '/products/shoes-3.jpg'
  // },
  // {
  //   id: 'sh4',
  //   name: 'Yay Sandalları',
  //   price: 69.99,
  //   category: 'Shoes',
  //   image: '/products/shoes-4.jpg',
  //   isNew: true
  // }
];
