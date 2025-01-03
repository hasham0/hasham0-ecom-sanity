import { defineQuery } from "next-sanity";

const sanityQueries = {
  SALE_QUERY: defineQuery(`*[_type == "sale"] | order(name asc)`),
  PRODUCT_QUERY: defineQuery(`*[_type == "product"] | order(name asc)`),
  CATEGORIES_QUERY: defineQuery(`*[_type == "category"] | order(name asc)`),
  SINGLE_PRODUCT_QUERY_BY_SLUG: defineQuery(
    `*[_type == "product" && slug.current==$slug] | order(name asc)[0]`,
  ),
  PRODUCT_SEARCH_QUERY: defineQuery(
    `*[_type == "product" && name match $searchParams] | order(name asc)`,
  ),
  CATEGORY_QUERY_BY_SLUG: defineQuery(
    `*[_type == "product" && references(*[_type == "category" && slug.current == $slug]._id)] | order(name asc)`,
  ),
  MY_ORDERS_QUERY: defineQuery(
    `*[_type == "order" && clerkUserId == $userId] | order(orderData desc) {
    ...,
    products[]->{ 
      ...
    },
    product-> 
  }`,
  ),
};

export const {
  SALE_QUERY,
  PRODUCT_QUERY,
  CATEGORIES_QUERY,
  SINGLE_PRODUCT_QUERY_BY_SLUG,
  PRODUCT_SEARCH_QUERY,
  CATEGORY_QUERY_BY_SLUG,
  MY_ORDERS_QUERY,
} = sanityQueries;
