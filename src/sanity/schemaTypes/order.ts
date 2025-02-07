// // schemas/order.js
// export default {
//     name: 'order',
//     title: 'Order',
//     type: 'document',
//     fields: [
//       { name: 'name', title: 'Customer Name', type: 'string' },
//       { name: 'email', title: 'Customer Email', type: 'string' },
//       { name: 'address', title: 'Address', type: 'string' },
//       { name: 'city', title: 'City', type: 'string' },
//       { name: 'phone', title: 'Phone', type: 'string' },
//       {
//         name: 'items',
//         title: 'Ordered Items',
//         type: 'array',
//         of: [
//           {
//             type: 'object',
//             fields: [
//               { name: 'title', title: 'Item Name', type: 'string' },
//               { name: 'quantity', title: 'Quantity', type: 'number' },
//               { name: 'price', title: 'Price', type: 'number' },
//               { name: 'image', title: 'Image', type: 'image' }, // Ensure image is included
//             ],
//           },
//         ],
//       },
//       { name: 'total', title: 'Total Amount', type: 'number' },
//     ],
//   };
  