import { TagsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const saleType = defineType({
  name: "sale",
  title: "Sale",
  type: "document",
  icon: TagsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Sale Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Sale Description",
      type: "text",
    }),
    defineField({
      name: "bedge",
      title: "Sale bedge",
      type: "string",
      description: "Discount bedge Ratio",
    }),
    defineField({
      name: "discountAmount",
      title: "Discount Amount",
      type: "number",
      description: "Amount off in percentage or fixed value",
    }),
    defineField({
      name: "coupanCode",
      title: "Coupan Code",
      type: "string",
    }),
    defineField({
      name: "validFrom",
      title: "Valid From",
      type: "datetime",
    }),
    defineField({
      name: "validUntil",
      title: "Valid Until",
      type: "datetime",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Toggle to activate/deactivate the sale",
      initialValue: true,
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      discountAmount: "discountAmount",
      coupanCode: "coupanCode",
      isActive: "isActive",
    },
    prepare(select) {
      const { title, discountAmount, coupanCode, isActive } = select;
      const status = isActive ? `Active` : `Inactive`;
      return {
        title,
        subtitle: `${discountAmount}% off - code: ${coupanCode} - ${status}`,
      };
    },
  },
});
