const orderSchema = {
    name: "order",
    type: "document",
    title: "Order",
    fields: [
      { 
        name: "name", 
        type: "string", 
        title: "Name",
      },
      { 
        name: "phoneNumber", 
        type: "string", 
        title: "Phone Number",
      },
      { 
        name: "address", 
        type: "string", 
        title: "Address",
      },
      { 
        name: "city", 
        type: "string", 
        title: "City",
      },
      { 
        name: "pickupLocation", 
        type: "string", 
        title: "Pickup Location",
      },
      { 
        name: "pickupDate", 
        type: "string", 
        title: "Pickup Date",
      },
      { 
        name: "pickupTime", 
        type: "string", 
        title: "Pickup Time",
      },
      { 
        name: "dropoffLocation", 
        type: "string", 
        title: "Dropoff Location",
      },
      { 
        name: "dropoffDate", 
        type: "string", 
        title: "Dropoff Date",
      },
      { 
        name: "dropoffTime", 
        type: "string", 
        title: "Dropoff Time",
      },
      { 
        name: "car", 
        type: "reference", 
        to: [{ type: "car" }],
        title: "Car",
      },
      { 
        name: "pricePerDay", 
        type: "string", 
        title: "Price Per Day" 
      },
      {
        name: "bookingDate", 
        type: "datetime", 
        title: "Booking Date" ,
      }, 
      {
        name : 'status',
        type: 'string',
        title: 'Status',
        options: {
          list: [
            { title: 'Pending', value: 'pending' },
            { title: 'Confirmed', value: 'confirmed' },
            { title: 'Completed', value: 'completed' },
            { title: 'Canceled', value: 'canceled' },
          ],
          layout: 'radio',
        },
        initialValue: 'pending',
      }
  
      
    ],
  };
  
  export default orderSchema;
  
  