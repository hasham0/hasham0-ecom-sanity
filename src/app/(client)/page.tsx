import ProductList from "@/components/customComp/product-list";
import DiscountBanner from "@/components/customComp/discount-banner";
import {
  getSanitySales,
  getSanityProducts,
  getSanityCategories,
} from "@/sanity/helpers";
import Container from "@/components/customComp/container";

export default async function Home() {
  const sales = await getSanitySales();
  const products = await getSanityProducts();
  const categories = await getSanityCategories();

  return (
    <div className="">
      <Container>
        <DiscountBanner sales={sales} />
        <ProductList products={products} title={true} categories={categories} />
      </Container>
    </div>
  );
}
