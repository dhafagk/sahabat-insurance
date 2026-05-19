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
          name: "dropdownItems",
          type: "array",
          label: "Dropdown Items",
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
              label: "Sub-items",
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
};
