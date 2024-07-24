type Product = {
  interation: number;
};

type Products = {
  [key: string]: Product;
};

export type ProductContext = {
  currentProduct:Products, 
  setCurrentProduct:(product: Product) => void;
}