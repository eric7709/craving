
export default function TopMenuItems() {
  // dummyTopMenuItems.ts
  const dummyTopMenuItems = [
    {
      id: "1",
      name: "Jollof Rice with Chicken",
      category: "Main Dish",
      timesOrdered: 120,
      revenueGenerated: 240000, // in Naira
      imageUrl: "https://via.placeholder.com/100x100.png?text=Jollof",
    },
    {
      id: "2",
      name: "Shawarma",
      category: "Snacks",
      timesOrdered: 95,
      revenueGenerated: 142500,
      imageUrl: "https://via.placeholder.com/100x100.png?text=Shawarma",
    },
    {
      id: "3",
      name: "Fried Rice & Beef",
      category: "Main Dish",
      timesOrdered: 80,
      revenueGenerated: 160000,
      imageUrl: "https://via.placeholder.com/100x100.png?text=Fried+Rice",
    },
    {
      id: "4",
      name: "Pizza (Large)",
      category: "Fast Food",
      timesOrdered: 65,
      revenueGenerated: 195000,
      imageUrl: "https://via.placeholder.com/100x100.png?text=Pizza",
    },
    {
      id: "5",
      name: "Suya with Chips",
      category: "Grill",
      timesOrdered: 50,
      revenueGenerated: 100000,
      imageUrl: "https://via.placeholder.com/100x100.png?text=Suya",
    },
  ];

  return (
    <div className="p-4 bg-slate-900 w-full text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Top Menu Items</h2>
      <ul className="grid grid-cols-3 gap-3">
        {dummyTopMenuItems.map((item) => (
          <li
            key={item.id}
            className="bg-blue-500"
          >
            <div className="flex-1">
              <p className="font-semibold text-sm">{item.name}</p>
              <p className="text-xs text-gray-400">{item.category}</p>
            </div>
            <div className="text-right">
              <p className="text-green-400 font-bold">
                ₦{item.revenueGenerated.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">
                {item.timesOrdered} orders
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
