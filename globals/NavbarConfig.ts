import type { GlobalConfig } from "payload";

export const NavbarConfig: GlobalConfig = {
  slug: "navbar",
  label: "Navbar",
  fields: [
    {
      name: "items",
      type: "array",
      label: "Top-level Nav Items",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
        },
        {
          name: "categories",
          type: "array",
          label: "Dropdown Categories",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
            },
            {
              name: "items",
              type: "array",
              label: "Level 2 Items",
              fields: [
                {
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  name: "description",
                  type: "text",
                },
                {
                  name: "href",
                  type: "text",
                  required: true,
                },
                {
                  name: "subItems",
                  type: "array",
                  label: "Level 3 Sub-items",
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "href",
                      type: "text",
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
