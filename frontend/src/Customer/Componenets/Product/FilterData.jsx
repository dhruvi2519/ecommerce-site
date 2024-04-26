export const color = [
  "white",
  "Black",
  "Red",
  "Marron",
  "Being",
  "Pink",
  "Green",
  "Yellow",
];

export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "being", label: "Being" },
      { value: "blue", label: "Blue" },
      { value: "brown", label: "Brown" },
      { value: "green", label: "Green" },
      { value: "purple", label: "Purple" },
      { value: "yellow", label: "Yellow" },
    ],
  },
];

export const filterSize = [
  {
    id: "size",
    name: "size",
    options: [
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
    ],
  },
];
export const singleFilter = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "159-399", label: "₹159 To ₹399", id: "1" },
      { value: "399-999", label: "₹399 To ₹999", id: "2" },
      { value: "999-1999", label: "₹999 To ₹1999", id: "3" },
      { value: "1999-2999", label: "₹1999 To ₹2999", id: "4" },
      { value: "3999-4999", label: "₹3999 To ₹4999", id: "5" },
    ],
  },
];
export const singleDiscountFilter = [
  {
    id: "discount",
    name: "Discount_Range",
    options: [
      { value: "10", label: "10% And Above", id: "1" },
      { value: "20", label: "20% And Above", id: "2" },
      { value: "30", label: "30% And Above", id: "3" },
      { value: "40", label: "40% And Above", id: "4" },
      { value: "50", label: "50% And Above", id: "5" },
      { value: "60", label: "60% And Above", id: "6" },
      { value: "70", label: "70% And Above", id: "7" },
      { value: "80", label: "80% And Above", id: "8" },
    ],
  },
];
/* export const singleStockFilter = [
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in_stock", label: "In Stock" },
      { value: "out_of_stock", label: "Out Of Stock" },
    ],
  },
]; */

export const sortOptions = [
  {
    id: "sortoption",
    name: "Sort by",
    options: [
      { value: " Low to High", label: "Low to High" },
      { value: " High to Low", label: "High to Low" },
    ],
  },
];
