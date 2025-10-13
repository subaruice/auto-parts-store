export interface ProductPicture {
  photoID: number;
  enlarged: string | null;
  filename: string;
  thumbnail: string;
}

export interface Product {
  productID: number;
  categoryID: number;
  name: string;
  description: string;
  customers_rating: number;
  Price: number;
  in_stock: number;
  customer_votes: number;
  items_sold: number;
  enabled: number;
  brief_description: string;
  list_price: number;
  product_code: string;
  sort_order: number;
  default_picture: number;
  date_added: string;        // ISO string
  date_modified: string;     // ISO string
  viewed_times: number;
  eproduct_filename: string;
  eproduct_available_days: number;
  eproduct_download_times: number;
  weight: number;
  meta_description: string;
  meta_keywords: string;
  free_shipping: number;
  min_order_amount: number;
  shipping_freight: number;
  classID: number | null;
  title: string;
  pictures: ProductPicture[];
}
