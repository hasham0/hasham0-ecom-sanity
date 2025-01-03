import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Sanity Studio")
    .items([
      S.documentTypeListItem("product").title("Product"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("sale").title("Sale"),
      S.documentTypeListItem("order").title("Order"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["category", "product", "sale", "order"].includes(item.getId()!),
      ),
    ]);
