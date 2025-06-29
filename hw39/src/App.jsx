import {EditableTable} from './components/EditableTable'

const columns = [
  { name: 'product', width:"50%"},
  { name: 'quantity' , width:"10%"},
  { name: 'price' , width:"10%"},
  { name: 'amount' , width:"10%"},
  { name: 'comment' , width:"20%"},
]


function App() {

 const generateSampleData = () => {
  const products = [
    'Laptop Dell Inspiron', 'iPhone 15 Pro', 'Samsung Galaxy S24', 'MacBook Air M2', 'iPad Pro',
    'Sony WH-1000XM5', 'Canon EOS R6', 'Nintendo Switch', 'PlayStation 5', 'Xbox Series X',
    'AirPods Pro', 'Apple Watch Series 9', 'Samsung Monitor 27"', 'Logitech MX Master 3',
    'Mechanical Keyboard', 'Gaming Chair', 'Webcam 4K', 'External SSD 1TB', 'Power Bank 20000mAh',
    'Wireless Charger', 'Bluetooth Speaker', 'Smart TV 55"', 'Router WiFi 6', 'Tablet Android',
    'Smartwatch Fitness', 'Earbuds Wireless', 'Drone DJI Mini', 'Action Camera', 'Printer Laser',
    'Scanner Document', 'Hard Drive 2TB', 'RAM DDR4 16GB', 'Graphics Card RTX', 'Motherboard Gaming',
    'CPU Intel i7', 'Cooling Fan RGB', 'Power Supply 750W', 'PC Case Mid Tower', 'Monitor 4K',
    'USB Hub 7-Port', 'HDMI Cable 4K', 'Ethernet Cable', 'Phone Case Premium', 'Screen Protector',
    'Car Mount Phone', 'Dash Cam 1080p', 'Smart Doorbell', 'Security Camera', 'Smart Bulb LED',
    'Smart Plug WiFi', 'Voice Assistant', 'Fitness Tracker', 'Electric Toothbrush', 'Hair Dryer',
    'Coffee Maker', 'Blender High Speed', 'Air Fryer 5L', 'Rice Cooker Smart', 'Microwave Oven',
    'Vacuum Robot', 'Steam Iron', 'Electric Kettle', 'Food Processor', 'Stand Mixer',
    'Pressure Cooker', 'Slow Cooker 6Qt', 'Toaster 4-Slice', 'Electric Grill', 'Ice Maker',
    'Water Filter', 'Air Purifier', 'Humidifier Cool', 'Dehumidifier', 'Space Heater',
    'Ceiling Fan Smart', 'LED Strip Lights', 'Desk Lamp USB', 'Floor Lamp Modern', 'Table Lamp',
    'Wall Clock Digital', 'Alarm Clock Smart', 'Picture Frame Digital', 'Book Light LED', 'Night Light',
    'Extension Cord', 'Surge Protector', 'Battery Charger', 'Solar Panel Kit', 'Generator Portable',
    'Tool Set 100pcs', 'Drill Cordless', 'Circular Saw', 'Jigsaw Electric', 'Sander Orbital',
    'Screwdriver Set', 'Wrench Set', 'Hammer Claw', 'Measuring Tape', 'Level Laser',
    'Safety Glasses', 'Work Gloves', 'Tool Box Large', 'Ladder Aluminum', 'Workbench Folding',
    'Garden Hose 50ft', 'Sprinkler System', 'Lawn Mower Electric', 'Leaf Blower', 'Hedge Trimmer',
    'Pressure Washer', 'Garden Tools Set', 'Planter Pots', 'Fertilizer Organic', 'Seeds Variety',
    'Outdoor Furniture', 'Patio Umbrella', 'BBQ Grill Gas', 'Fire Pit Portable', 'Camping Tent',
    'Sleeping Bag', 'Backpack Hiking', 'Water Bottle Steel', 'Cooler Box 50L', 'Flashlight LED'
  ];

  const comments = [
    'Sản phẩm chất lượng cao, đáng mua',
    'Giá cả hợp lý, giao hàng nhanh',
    'Sản phẩm hot trend, bán chạy',
    'Khuyến mãi đặc biệt tháng này',
    'Hàng nhập khẩu chính hãng',
    'Bảo hành 2 năm toàn quốc',
    'Miễn phí vận chuyển toàn quốc',
    'Sản phẩm mới ra mắt',
    'Đánh giá 5 sao từ khách hàng',
    'Phù hợp cho văn phòng',
    'Thiết kế hiện đại, sang trọng',
    'Tiết kiệm điện năng',
    'Dễ sử dụng, thân thiện',
    'Chất liệu cao cấp, bền đẹp',
    'Công nghệ tiên tiến nhất',
    'Kích thước nhỏ gọn',
    'Màu sắc đa dạng',
    'Phù hợp mọi lứa tuổi',
    'Hỗ trợ khách hàng 24/7',
    'Đổi trả trong 30 ngày',
    'Tính năng thông minh AI',
    'Kết nối Bluetooth 5.0',
    'Pin sử dụng lâu dài',
    'Chống nước IP68',
    'Tương thích đa nền tảng',
    'Hiệu suất vượt trội',
    'Giá shock trong tuần',
    'Combo tiết kiệm 30%',
    'Flash sale cuối tháng',
    'Limited edition đặc biệt'
  ];

  const data = [];
  
  for (let i = 1; i <= 100; i++) {
    const quantity = Math.floor(Math.random() * 100) + 1; // 1-100
    const price = Math.floor(Math.random() * 50000000) + 10000; // 10,000 - 50,010,000
    const amount = quantity * price;
    
    data.push({
      id: i,
      product: products[Math.floor(Math.random() * products.length)],
      quantity: quantity,
      price: price,
      amount: amount,
      comment: comments[Math.floor(Math.random() * comments.length)]
    });
  }
  
  return data;
};

const initialRows = generateSampleData();

  return (
    <>
      <EditableTable columns={columns} rows={initialRows}/>
    </>
  )
}

export default App
