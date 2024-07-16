const express = require('express');
const router = express.Router();

const products = [
    {
        id: 1,
        name: 'Iphone 14 promax',
        price: 30000,
        quantity: 10,
        category: { id: 2, name: 'Điện tử' },
        images: ["https://img.freepik.com/premium-vector/shopping-cart-icon-line-art_965427-1573.jpg?w=826","https://nationaltoday.com/wp-content/uploads/2021/06/Shopping-Cart-Day-1.jpg","https://th.bing.com/th/id/OIP.Wztce0r39NK_NXCCULfIUQHaHa?rs=1&pid=ImgDetMain"]
    },
    {
        id: 2,
        name: 'SGK Toán lớp 10',
        price: 20,
        quantity: 50,
        category: { id: 4, name: 'Giáo dục' },
        images: ["https://img.freepik.com/premium-vector/shopping-cart-icon-line-art_965427-1573.jpg?w=826","https://nationaltoday.com/wp-content/uploads/2021/06/Shopping-Cart-Day-1.jpg","https://th.bing.com/th/id/OIP.Wztce0r39NK_NXCCULfIUQHaHa?rs=1&pid=ImgDetMain"]
    },
    {
        id: 3,
        name: 'Vợt cầu lông Kumpoo',
        price: 500,
        quantity: 15,
        category: { id: 1, name: 'Thể thao' },
        images: ["https://img.freepik.com/premium-vector/shopping-cart-icon-line-art_965427-1573.jpg?w=826","https://nationaltoday.com/wp-content/uploads/2021/06/Shopping-Cart-Day-1.jpg","https://th.bing.com/th/id/OIP.Wztce0r39NK_NXCCULfIUQHaHa?rs=1&pid=ImgDetMain"]
    },
    {
        id: 4,
        name: 'Giày thể thao Adidas',
        price: 5000,
        quantity: 15,
        category: { id: 1, name: 'Thể thao' },
        images: ["https://img.freepik.com/premium-vector/shopping-cart-icon-line-art_965427-1573.jpg?w=826","https://nationaltoday.com/wp-content/uploads/2021/06/Shopping-Cart-Day-1.jpg","https://th.bing.com/th/id/OIP.Wztce0r39NK_NXCCULfIUQHaHa?rs=1&pid=ImgDetMain"]
    },
    {
        id: 5,
        name: 'Túi xách',
        price: 1000,
        quantity: 20,
        category: { id: 5, name: 'Thời trang' },
        images: ["https://img.freepik.com/premium-vector/shopping-cart-icon-line-art_965427-1573.jpg?w=826","https://nationaltoday.com/wp-content/uploads/2021/06/Shopping-Cart-Day-1.jpg","https://th.bing.com/th/id/OIP.Wztce0r39NK_NXCCULfIUQHaHa?rs=1&pid=ImgDetMain"]
    },
    {
        id: 6,
        name: 'Tủ lạnh',
        price: 10000,
        quantity: 10,
        category: { id: 3, name: 'Đồ gia dụng' },
        images: ["https://img.freepik.com/premium-vector/shopping-cart-icon-line-art_965427-1573.jpg?w=826","https://nationaltoday.com/wp-content/uploads/2021/06/Shopping-Cart-Day-1.jpg","https://th.bing.com/th/id/OIP.Wztce0r39NK_NXCCULfIUQHaHa?rs=1&pid=ImgDetMain"]
    },
    {
        id: 7,
        name: 'Samsung S24 Ultra',
        price: 30000,
        quantity: 10,
        category: { id: 2, name: 'Điện tử' },
        images: ["https://img.freepik.com/premium-vector/shopping-cart-icon-line-art_965427-1573.jpg?w=826","https://nationaltoday.com/wp-content/uploads/2021/06/Shopping-Cart-Day-1.jpg","https://th.bing.com/th/id/OIP.Wztce0r39NK_NXCCULfIUQHaHa?rs=1&pid=ImgDetMain"]
    },
    {
        id: 8,
        name: 'Laptop Dell ...',
        price: 15000,
        quantity: 5,
        category: { id: 2, name: 'Điện tử' },
        images: ["https://img.freepik.com/premium-vector/shopping-cart-icon-line-art_965427-1573.jpg?w=826","https://nationaltoday.com/wp-content/uploads/2021/06/Shopping-Cart-Day-1.jpg","https://th.bing.com/th/id/OIP.Wztce0r39NK_NXCCULfIUQHaHa?rs=1&pid=ImgDetMain"]
    }
];

router.get("/", (req, res) => {
    res.json(products);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

router.post("/", (req, res) => {
    const newProduct = {
        id: Date.now(), // Sử dụng timestamp để tạo id duy nhất
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category, // Nhận category là một đối tượng
        images: req.body.images
    };
    products.push(newProduct);
    res.status(201).send(newProduct);
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index].name = req.body.name;
        products[index].price = req.body.price;
        products[index].quantity = req.body.quantity;
        products[index].category = req.body.category; // Cập nhật category là một đối tượng
        products[index].images = req.body.images;
        res.send(products[index]);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        res.send({ message: 'Product deleted', id: id });
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

module.exports = router;