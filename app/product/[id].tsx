import ProductDetailScreen from "@/features/product/screens/ProductDetailScreen";

export default function ProductDetailRoute({ params }: { params: { id: string } }) {
  return <ProductDetailScreen />;
}