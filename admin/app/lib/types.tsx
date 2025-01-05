interface CollectionTypes {
  _id: string;
  title: string;
  description: string;
  images: string;
  products: ProductType;
}

interface ProductType {
  _id: string;
  title: string;
  description: string;
  images: string;
  price: number;
  quantity: number;
}
