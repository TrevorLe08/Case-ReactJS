const express = require('express');
const router = express.Router();

const products = [
    {
        id: 1,
        name: 'Iphone 14 Promax',
        price: 30000,
        quantity: 10,
        category: { id: 2, name: 'Điện tử' },
        images: ["https://minhtuanmobile.com/uploads/products/230628110901-iphone-14-pro-max-128gb-gold-minh-tuan-mobile.jpeg","https://minhtuanmobile.com/uploads/products/220908114431-iphone-14-pro-max-128gb4.jpg","https://minhtuanmobile.com/uploads/products/220908114431-iphone-14-pro-max-128gb5.jpg"]
    },
    {
        id: 2,
        name: 'Bút chì bảy màu',
        price: 20,
        quantity: 50,
        category: { id: 4, name: 'Giáo dục' },
        images: ["https://bookbuy.vn/Res/Images/Product/but-chi-mau-ruot-cau-vong-made-in-japan_74419_1.jpg","https://bookbuy.vn/Res/Images/Product/combo-2-but-chi-mau-cau-vong-ruot-7-mau-loai-lon_74428_1.jpg"]
    },
    {
        id: 3,
        name: 'Vợt cầu lông',
        price: 500,
        quantity: 15,
        category: { id: 1, name: 'Thể thao' },
        images: ["https://product.hstatic.net/200000099191/product/660ccff64a7f24335b56d11219a29021_2a16a7c26bd54f78ae325834fc0a4004_1024x1024.jpg","https://product.hstatic.net/200000099191/product/7b290c2e46f59d0cf26fa51657ef6816_fc932626a9a546b685cd4dc6669e0859_1024x1024.jpg","https://product.hstatic.net/200000099191/product/830dd5ffe332dd81f9ec9876cd652f65_12f225d16c6b4208ba9dd4bf47640319_1024x1024.jpg"]
    },
    {
        id: 4,
        name: 'Giày thể thao',
        price: 5000,
        quantity: 15,
        category: { id: 1, name: 'Thể thao' },
        images: ["https://bizweb.dktcdn.net/100/405/002/products/130.png?v=1692952475837","https://bizweb.dktcdn.net/100/405/002/products/131.png?v=1692952476733"]
    },
    {
        id: 5,
        name: 'Túi xách',
        price: 1000,
        quantity: 20,
        category: { id: 5, name: 'Thời trang' },
        images: ["https://product.hstatic.net/1000152342/product/dscf8308_4ef6be1fecbd4e21a541151f95192407_master.jpg","https://product.hstatic.net/1000152342/product/dscf8309_905e20590b534b22a1085f395a500ea7_master.jpg"]
    },
    {
        id: 6,
        name: 'Lò vi sóng',
        price: 10000,
        quantity: 10,
        category: { id: 3, name: 'Đồ gia dụng' },
        images: ["https://cdn2.cellphones.com.vn/x/media/catalog/product/l/o/lo-vi-song-sharp-20-lit-r-205vn-s_9_.jpg","https://cdn2.cellphones.com.vn/x/media/catalog/product/l/o/lo-sharp-1.png"]
    },
    {
        id: 7,
        name: 'Samsung Z Fold 5',
        price: 30000,
        quantity: 10,
        category: { id: 2, name: 'Điện tử' },
        images: ["https://didongmoi.com.vn/upload/images/product/samsung/samsung-galaxy-z-fold5-gia-re-3.jpg","https://didongmoi.com.vn/upload/images/product/samsung/samsung-galaxy-z-fold5-gia-re-4.jpg","https://didongmoi.com.vn/upload/images/product/samsung/samsung-galaxy-z-fold5-gia-re-5.jpg"]
    },
    {
        id: 8,
        name: 'Laptop Acer',
        price: 15000,
        quantity: 5,
        category: { id: 2, name: 'Điện tử' },
        images: ["https://anphat.com.vn/media/product/46511_laptop_acer_aspire_5_a514_56p_742f_nx_khrsv_005_6.jpg","https://anphat.com.vn/media/product/46511_laptop_acer_aspire_5_a514_56p_742f_nx_khrsv_005_5.jpg","https://anphat.com.vn/media/product/46511_laptop_acer_aspire_5_a514_56p_742f_nx_khrsv_005_1.jpg"]
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