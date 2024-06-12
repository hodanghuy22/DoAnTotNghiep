USE DoAnTotNghiep
GO
DELETE FROM Colors;
DBCC CHECKIDENT ('DoAnTotNghiep.dbo.Colors', RESEED, 0);
GO
DELETE FROM Brands;
DBCC CHECKIDENT ('DoAnTotNghiep.dbo.Brands', RESEED, 0);
GO
DELETE FROM Capacities;
DBCC CHECKIDENT ('DoAnTotNghiep.dbo.Capacities', RESEED, 0);
GO
DELETE FROM Categories;
DBCC CHECKIDENT ('DoAnTotNghiep.dbo.Categories', RESEED, 0);
GO
DELETE FROM Products;
DBCC CHECKIDENT ('DoAnTotNghiep.dbo.Products', RESEED, 0);
GO
DELETE FROM ProductDetails;
DBCC CHECKIDENT ('DoAnTotNghiep.dbo.ProductDetails', RESEED, 0);
GO
DELETE FROM OrderStatuses;
DBCC CHECKIDENT ('DoAnTotNghiep.dbo.OrderStatuses', RESEED, 0);
GO
DELETE FROM Invoices;
DBCC CHECKIDENT ('DoAnTotNghiep.dbo.Invoices', RESEED, 0);
GO
DELETE FROM InvoiceDetails;
DBCC CHECKIDENT ('DoAnTotNghiep.dbo.InvoiceDetails', RESEED, 0);
GO
DELETE FROM Images;
DBCC CHECKIDENT ('DoAnTotNghiep.dbo.Images', RESEED, 0);
GO
DELETE FROM Slideshows;
DBCC CHECKIDENT ('DoAnTotNghiep.dbo.Slideshows', RESEED, 0);
GO
--COlor
GO
INSERT INTO Colors(ColorName,Status) VALUES(N'Bạc',1)
INSERT INTO Colors(ColorName,Status) VALUES(N'Đen',1)
INSERT INTO Colors(ColorName,Status) VALUES(N'Xanh Dương',1)
INSERT INTO Colors(ColorName,Status) VALUES(N'Vàng',1)
INSERT INTO Colors(ColorName,Status) VALUES(N'Đỏ',1)
INSERT INTO Colors(ColorName,Status) VALUES(N'Tím',1)
INSERT INTO Colors(ColorName,Status) VALUES(N'Trắng',1)
INSERT INTO Colors(ColorName,Status) VALUES(N'Xanh Lá',1)
INSERT INTO Colors(ColorName,Status) VALUES(N'Xám',1)
GO
INSERT INTO Brands(Title,Status) VALUES(N'Apple',1)
INSERT INTO Brands(Title,Status) VALUES(N'XIAOMI',1)
INSERT INTO Brands(Title,Status) VALUES(N'VIVO',1)
INSERT INTO Brands(Title,Status) VALUES(N'OPPO',1)
INSERT INTO Brands(Title,Status) VALUES(N'SAMSUNG',1)
INSERT INTO Brands(Title,Status) VALUES(N'REALME',1)
INSERT INTO Brands(Title,Status) VALUES(N'ONEPLUS',1)
INSERT INTO Brands(Title,Status) VALUES(N'POCO',1)
--sac du phong
INSERT INTO Brands(Title,Status) VALUES(N'ANKER',1)
INSERT INTO Brands(Title,Status) VALUES(N'Baseus',1)
INSERT INTO Brands(Title,Status) VALUES(N'Adata ',1)
--tai nghe khong day
INSERT INTO Brands(Title,Status) VALUES(N'HAVIT',1)
INSERT INTO Brands(Title,Status) VALUES(N'JPL',1)
INSERT INTO Brands(Title,Status) VALUES(N'SONY',1)
INSERT INTO Brands(Title,Status) VALUES(N'HAVIT',1)
INSERT INTO Brands(Title,Status) VALUES(N'Mozard',1)
INSERT INTO Brands(Title,Status) VALUES(N'Awei',1)

Go
INSERT INTO Categories(Title,Status) VALUES (N'Điện thoại',1)
INSERT INTO Categories(Title,Status) VALUES (N'Sạc dự phòng',1)
INSERT INTO Categories(Title,Status) VALUES (N'Tai nghe không dây',1)
INSERT INTO Categories(Title,Status) VALUES (N'Tai nghe có dây',1)
Go
INSERT INTO Capacities(TotalCapacity,Status) VALUES (N'64',1)
INSERT INTO Capacities(TotalCapacity,Status) VALUES (N'128',1)
INSERT INTO Capacities(TotalCapacity,Status) VALUES (N'256',1)
INSERT INTO Capacities(TotalCapacity,Status) VALUES (N'512',1)
Go
--PRODUCTS PHONE
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('realme 10', N'Điện thoại tầm trung với màn hình AMOLED cong và vi xử lý mạnh mẽ', '4GB/6GB', '128GB/256GB', '5000mAh', 'Android 13', N'28 phút', 'MediaTek Helio G99', '33W', '16MP', '50MP + 8MP + 2MP', 'Super AMOLED', '6.4', '178g', 'bbbt3matxraa9yk5vpgr', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116862/bbbt3matxraa9yk5vpgr.webp', '1','6','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('OPPO Reno10 Pro 5G', N'Điện thoại cao cấp với thiết kế đẹp, hệ thống camera mạnh mẽ và sạc nhanh', '12GB', '256GB', '4600mAh', 'Android 13', N'28 phút', 'Snapdragon 778G', '80W', '32MP', '50MP + 8MP + 2MP', 'AMOLED', '6.7', '185g', 'dgjpurryah9amjonjijc', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116862/dgjpurryah9amjonjijc.jpg', '1','4','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Samsung Galaxy A73 5G', N'Điện thoại tầm trung với màn hình lớn, thời lượng pin dài và kết nối 5G', '6GB/8GB', '128GB/256GB', '5000mAh', 'Android 13', N'30 phút', 'Snapdragon 778G', '25W', '32MP', '108MP + 12MP + 5MP', 'Super AMOLED', '6.7', '181g', 'aonerrfhxxusg4zrcurf', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116862/aonerrfhxxusg4zrcurf.jpg', '1','5','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Xiaomi Redmi Note 12 Pro+', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, màn hình 120Hz và sạc nhanh', '8GB', '256GB', '5000mAh', 'Android 13', N'19 phút', 'MediaTek Dimensity 1080', '120W', '16MP', '200MP + 8MP + 2MP', 'AMOLED', '6.67', '204g', 'xvl0evuu2lhjnwtv5tuy', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116863/xvl0evuu2lhjnwtv5tuy.jpg', '1','2','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Samsung Galaxy A34 5G', N'Điện thoại tầm trung với thiết kế mỏng, màn hình AMOLED và kết nối 5G', '6GB/8GB', '128GB/256GB', '5000mAh', 'Android 13', N'30 phút', 'MediaTek Dimensity 1080', '25W', '13MP', '48MP + 8MP + 5MP', 'Super AMOLED', '6.6', '199g', 'utvfeicimqwgaz8anxje', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116863/utvfeicimqwgaz8anxje.jpg', '1','5','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('OPPO Reno9 5G', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, thời lượng pin dài và sạc nhanh', '8GB/12GB', '128GB/256GB', '4500mAh', 'Android 13', N'35 phút', 'Snapdragon 778G', '67W', '32MP', '50MP + 8MP + 2MP', 'AMOLED', '6.7', '186g', 'vbhws4ktwyoc6iunbocn', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116863/vbhws4ktwyoc6iunbocn.jpg', '1','4','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('OnePlus Nord 2T 5G', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, màn hình 120Hz và sạc nhanh', '8GB/12GB', '128GB/256GB', '4500mAh', 'Android 13', N'25 phút', 'MediaTek Dimensity 1300', '80W', '32MP', '50MP + 8MP + 2MP', 'AMOLED', '6.43', '190g', 'txtjj7qkrxkcbncvkqhh', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116863/txtjj7qkrxkcbncvkqhh.jpg', '1','7','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('realme 11', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, màn hình 120Hz và sạc nhanh', '8GB/12GB', '128GB/256GB', '5000mAh', 'Android 13', N'30 phút', 'MediaTek Dimensity 7020', '67W', '16MP', '108MP + 2MP', 'Super AMOLED', '6.7', '202g', 'susnpyskzp4ht1hjmofw', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116863/susnpyskzp4ht1hjmofw.jpg', '1','6','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('OPPO Reno8 5G', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, màn hình 90Hz và sạc nhanh', '8GB/12GB', '128GB/256GB', '4500mAh', 'Android 13', N'30 phút', 'MediaTek Dimensity 1300', '80W', '32MP', '50MP + 8MP + 2MP', 'AMOLED', '6.43', '179g', 'x5smsxmqh7jczmah2jq4', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116863/x5smsxmqh7jczmah2jq4.jpg', '1','4','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('OnePlus Nord CE 2 5G', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, màn hình 90Hz và sạc nhanh', '6GB/8GB', '128GB/256GB', '4500mAh', 'Android 13', N'30 phút', 'MediaTek Dimensity 900', '65W', '32MP', '64MP + 8MP + 2MP', 'AMOLED', '6.43', '173g', 'ppsvfcgwih2ontnfhzg8', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116863/ppsvfcgwih2ontnfhzg8.jpg', '1','7','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('POCO F4 5G', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, màn hình 120Hz và sạc nhanh', '6GB/8GB/12GB', '128GB/256GB', '4500mAh', 'Android 13', N'30 phút', 'Snapdragon 870', '67W', '20MP', '64MP + 8MP + 2MP', 'AMOLED', '6.67', '195g', 'wbcppfct0ovp7hzhhuci', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116864/wbcppfct0ovp7hzhhuci.jpg', '1','8','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('POCO F5 5G', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, màn hình 120Hz và sạc nhanh', '8GB/12GB', '128GB/256GB', '5000mAh', 'Android 13', N'28 phút', 'Snapdragon 7+ Gen 2', '67W', '16MP', '64MP + 8MP + 2MP', 'AMOLED', '6.67', '181g', 'xepofwnqjuadcmdhkinm', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116864/xepofwnqjuadcmdhkinm.jpg', '1','8','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Samsung Galaxy A54 5G', N'Điện thoại tầm trung với màn hình lớn, thời lượng pin dài và kết nối 5G', '6GB/8GB', '128GB/256GB', '5000mAh', 'Android 13', N'30 phút', 'Exynos 1380', '25W', '32MP', '50MP + 12MP + 5MP', 'Super AMOLED', '6.4', '199g', 'd1gv4y7ddt7y5hjcrmp7', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116864/d1gv4y7ddt7y5hjcrmp7.jpg', '1','5','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Xiaomi 12 Pro 5G', N'Điện thoại cao cấp với vi xử lý mạnh mẽ, màn hình độ phân giải cao và sạc nhanh', '8GB/12GB', '128GB/256GB', '4600mAh', 'Android 13', N'20 phút', 'Snapdragon 8 Gen 1', '120W', '32MP', '50MP + 50MP + 50MP', 'AMOLED', '6.73', '204g', 'yhxitymqbsvtgjgbtq3n', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116864/yhxitymqbsvtgjgbtq3n.jpg', '1','2','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Xiaomi 13T 5G', N'Điện thoại cao cấp với vi xử lý mạnh mẽ, màn hình độ phân giải cao và sạc nhanh', '8GB/12GB', '128GB/256GB', '5000mAh', 'Android 13', N'19 phút', 'Dimensity 9200+', '120W', '20MP', '50MP + 12MP + 50MP', 'OLED', '6.73', '197g', 'xhk6f27dmq5f6igj5wb4', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116864/xhk6f27dmq5f6igj5wb4.jpg', '1','2','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('OPPO Reno10 5G', N'Điện thoại cao cấp với thiết kế đẹp, hệ thống camera mạnh mẽ và sạc nhanh', '8GB/12GB', '128GB/256GB', '4500mAh', 'Android 13', N'30 phút', 'Snapdragon 8+ Gen 1', '80W', '32MP', '50MP + 8MP + 2MP', 'AMOLED', '6.7', '182g', 'wtndrv9p6ktb9xvasvp9', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116865/wtndrv9p6ktb9xvasvp9.jpg', '1','4','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Xiaomi 12 5G', N'Điện thoại cao cấp với vi xử lý mạnh mẽ, màn hình độ phân giải cao và sạc nhanh', '8GB/12GB', '128GB/256GB', '4500mAh', 'Android 12', N'17 phút', 'Snapdragon 8 Gen 1', '120W', '32MP', '50MP + 13MP + 5MP', 'AMOLED', '6.28', '180g', 'jssenugqxralmjpnjjmn', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116865/jssenugqxralmjpnjjmn.jpg', '1','2','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('iPhone 11', N'Điện thoại cao cấp với hiệu năng mạnh mẽ, thời lượng pin dài và camera chất lượng cao', '4GB', '64GB/128GB/256GB', '3110mAh', 'iOS 16', N'2 giờ', 'Apple A13 Bionic', '18W', '12MP', '12MP + 12MP', 'Liquid Retina LCD', '6.1', '194g', 'bum7gaym9popmeny34ri', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116865/bum7gaym9popmeny34ri.jpg', '1','1','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('vivo V29 5G', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, màn hình 90Hz và sạc nhanh', '8GB/12GB', '128GB/256GB', '4500mAh', 'Android 13', N'31 phút', 'Snapdragon 870', '44W', '50MP', '64MP + 8MP + 2MP', 'AMOLED', '6.44', '184g', 'jrdvenl5k4zbg86uqsrn', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116865/jrdvenl5k4zbg86uqsrn.jpg', '1','3','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Samsung Galaxy S21 FE 5G', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, màn hình 120Hz và sạc nhanh', '6GB/8GB', '128GB/256GB', '4500mAh', 'Android 13', N'30 phút', 'Snapdragon 888 5G', '25W', '32MP', '12MP + 12MP + 8MP', 'Dynamic AMOLED 2X', '6.4', '177g', 'ifuiglgozeqrfpabzejn', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116865/ifuiglgozeqrfpabzejn.jpg', '1','5','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Xiaomi 13 5G', N'Điện thoại cao cấp với vi xử lý mạnh mẽ, màn hình độ phân giải cao và sạc nhanh', '8GB/12GB', '128GB/256GB', '5000mAh', 'Android 13', N'19 phút', 'Dimensity 9200+', '120W', '20MP', '50MP + 12MP + 50MP', 'OLED', '6.73', '197g', 'teatlm1v9bj41ykkc8x6', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116866/teatlm1v9bj41ykkc8x6.jpg', '1','2','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('realme 11 Pro 5G', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, màn hình 120Hz và sạc nhanh', '8GB/12GB', '128GB/256GB', '5000mAh', 'Android 13', N'30 phút', 'Snapdragon 695 5G', '67W', '16MP', '108MP + 8MP + 2MP', 'LCD', '6.7', '199g', 'wj06luenwjhxwwlspniz', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116866/wj06luenwjhxwwlspniz.jpg', '1','6','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Samsung Galaxy M54 5G', N'Điện thoại tầm trung với màn hình lớn, thời lượng pin dài và kết nối 5G', '6GB/8GB', '128GB/256GB', '5000mAh', 'Android 13', N'30 phút', 'Exynos 1380', '25W', '32MP', '80MP + 8MP + 2MP', 'Super AMOLED', '6.6', '200g', 'lgq0vd6hu2zq8sqjlfec', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116866/lgq0vd6hu2zq8sqjlfec.jpg', '1','5','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Samsung Galaxy A54 5G', N'Điện thoại tầm trung với màn hình lớn, thời lượng pin dài và kết nối 5G', '6GB/8GB', '128GB/256GB', '5000mAh', 'Android 13', N'30 phút', 'Exynos 1380', '25W', '32MP', '50MP + 12MP + 5MP', 'Super AMOLED', '6.6', '190g', 'j2nlgbjxtvxer4gwljot', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116866/j2nlgbjxtvxer4gwljot.jpg', '1','5','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Samsung Galaxy S21+', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, màn hình 120Hz và sạc nhanh', '6GB/8GB', '128GB/256GB', '4500mAh', 'Android 13', N'30 phút', 'Snapdragon 888 5G', '25W', '32MP', '12MP + 12MP + 8MP', 'Dynamic AMOLED 2X', '6.4', '177g', 'srcydqycfc4gnxnxhr5g', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116866/srcydqycfc4gnxnxhr5g.jpg', '1','5','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('vivo V25 Pro 5G', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, màn hình 120Hz và sạc nhanh', '8GB/12GB', '128GB/256GB', '4800mAh', 'Android 13', N'30 phút', 'MediaTek Dimensity 1300', '66W', '50MP', '64MP + 8MP + 2MP', 'AMOLED', '6.44', '186g', 'zfdnhguzkiftpjjd2psc', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116866/zfdnhguzkiftpjjd2psc.jpg', '1','3','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('vivo Y17s', N'Điện thoại giá rẻ với màn hình lớn và thời lượng pin dài', '4GB', '128GB', '5000mAh', 'Android 12', N'2 giờ', 'Helio G35', '18W', '5MP', '13MP + 2MP', 'IPS LCD', '6.58', '199g', 'wa1jixzudgc8zao7k3tp', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116867/wa1jixzudgc8zao7k3tp.jpg', '1','3','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('vivo V25E', N'Điện thoại giá rẻ với màn hình lớn và thời lượng pin dài', '8GB', '128GB/256GB', '4500mAh', 'Android 13', N'30 phút', 'MediaTek Helio G99', '44W', '32MP', '64MP + 8MP + 2MP', 'AMOLED', '6.44', '186g', 'wem72yqpsomk64w4uoq3', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116867/wem72yqpsomk64w4uoq3.jpg', '1','3','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Xiaomi Redmi Note 12', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, màn hình 90Hz và sạc nhanh', '4GB/6GB', '128GB/256GB', '5000mAh', 'Android 12', N'1 giờ', 'Snapdragon 4 Gen 1', '18W', '8MP', '48MP + 8MP + 2MP', 'IPS LCD', '6.67', '193g', 'dxdtba2whb8xguxjcgmi', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116867/dxdtba2whb8xguxjcgmi.jpg', '1','2','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Xiaomi Redmi Note 13', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, màn hình 90Hz và sạc nhanh', '4GB/6GB', '128GB/256GB', '5000mAh', 'Android 12', N'1 giờ', 'Snapdragon 665', '18W', '8MP', '48MP + 8MP + 2MP', 'IPS LCD', '6.67', '193g', 'xgwmnso5vjx50j2ndtve', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116867/xgwmnso5vjx50j2ndtve.jpg', '1','2','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Xiaomi Redmi Note 13 Pro', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, màn hình 120Hz và sạc nhanh', '6GB/8GB', '128GB/256GB', '5000mAh', 'Android 12', N'46 phút', 'Snapdragon 765', '67W', '16MP', '200MP + 8MP + 2MP', 'AMOLED', '6.67', '187g', 'tm9ckfx30pai10lo1uaf', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116867/tm9ckfx30pai10lo1uaf.jpg', '1','2','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Samsung Galaxy A24', N'Điện thoại tầm trung với màn hình lớn và thời lượng pin dài', '4GB/6GB', '64GB/128GB', '5000mAh', 'Android 13', N'1 giờ', 'Qualcomm Snapdragon 680', '15W', '13MP', '50MP + 5MP + 2MP', 'Super AMOLED', '6.5', '195g', 'b2sofqqa3e3riypvp6ws', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116867/b2sofqqa3e3riypvp6ws.jpg', '1','5','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Samsung Galaxy A05', N'Điện thoại giá rẻ với màn hình lớn và thời lượng pin dài', '4GB', '32GB/64GB', '5000mAh', 'Android 13', N'2 giờ', 'Unisoc SC9863A', '15W', '5MP', '13MP + 2MP', 'PLS TFT LCD', '6.5', '192g', 'qybdnryoqejzxqq3zlyx', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116867/qybdnryoqejzxqq3zlyx.jpg', '1','5','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Xiaomi Redmi A2+', N'Điện thoại giá rẻ với màn hình lớn và thời lượng pin dài', '2GB', '32GB', '5000mAh', 'Android 13 (Go edition)', N'2 giờ', 'MediaTek Helio G35', '10W', '5MP', '8MP', 'IPS LCD', '6.52', '192g', 'rt4c3liohpslhzbwxi8z', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116868/rt4c3liohpslhzbwxi8z.jpg', '1','2','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Xiaomi Redmi 12C', N'Điện thoại giá rẻ với màn hình lớn và thời lượng pin dài', '3GB', '32GB/64GB', '5000mAh', 'Android 12 (Go edition)', N'2 giờ', 'MediaTek Helio G35', '10W', '5MP', '50MP + 2MP', 'IPS LCD', '6.7', '195g', 'nzhfaobtoj2ud4hozhcf', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116868/nzhfaobtoj2ud4hozhcf.jpg', '1','2','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Samsung Galaxy A14', N'Điện thoại giá rẻ với màn hình lớn và thời lượng pin dài', '4GB', '64GB/128GB', '5000mAh', 'Android 13', N'2 giờ', 'MediaTek Helio G80', '15W', '13MP', '50MP + 2MP + 2MP', 'PLS TFT LCD', '6.6', '200g', 'dgdoi7jlurkj2steqep7', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116868/dgdoi7jlurkj2steqep7.jpg', '1','5','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Xiaomi Redmi A2', N'Điện thoại giá rẻ với màn hình lớn và thời lượng pin dài', '2GB', '32GB', '5000mAh', 'Android 13 (Go edition)', N'2 giờ', 'MediaTek Helio G35', '10W', '5MP', '8MP', 'IPS LCD', '6.52', '192g', 'vy4ludafzehejf80nwrz', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116868/vy4ludafzehejf80nwrz.jpg', '1','2','1')
INSERT INTO Products(Name,[Desc],RAM,ROM,Battery,OS,ChargingTime,Chip,ChargingEfficiency,FrontCamera,RearCamera,Screen,Size,Weight,ThumnailId,ThumnailUrl,CategoryId,BrandId,Status) VALUES('Xiaomi Redmi Note 12 Pro', N'Điện thoại tầm trung với vi xử lý mạnh mẽ, màn hình 120Hz và sạc nhanh', '6GB/8GB', '128GB/256GB', '5000mAh', 'Android 12', N'46 phút', 'MediaTek Dimensity 1080', '67W', '16MP', '200MP + 8MP + 2MP', 'AMOLED', '6.67', '187g', 'qn4xitxpyxkskqhqnedw', 'https://res.cloudinary.com/dht1ypbn2/image/upload/v1718116868/qn4xitxpyxkskqhqnedw.jpg', '1','2','1')

--PRODUCTDETAILS
Go
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,4690000,1,2,2,4790000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,4690000,1,3,3,4790000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,4690000,1,4,4,4790000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,14190000,2,2,4,14490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,14190000,2,3,5,14490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,14190000,2,4,6,14490000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,9190000,3,2,2,9490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,9190000,3,3,3,9490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,9190000,3,4,4,9490000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,9190000,4,2,2,9690000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,9190000,4,3,3,9690000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,9190000,4,4,4,9690000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,10190000,5,2,2,10390000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,10190000,5,3,3,10390000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,10190000,5,4,4,10390000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8190000,6,2,2,9190000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8190000,6,3,3,9190000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8190000,6,4,4,9190000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,9190000,7,2,2,9490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,9190000,7,3,3,9490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,9190000,7,4,4,9490000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,6190000,8,2,2,6490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,6190000,8,3,3,6490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,6190000,8,4,4,6490000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,9,2,2,7790000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,9,3,3,7790000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,9,4,4,7790000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,10,2,2,7490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,10,3,3,7490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,10,4,4,7490000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,11,2,2,7490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,11,3,3,7490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,11,4,4,7490000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,11,2,2,7490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,11,3,3,7490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,11,4,4,7490000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8990000,12,2,2,9290000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8990000,12,3,4,9290000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8990000,12,4,4,9290000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,13,2,2,7490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,13,3,3,7490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,13,4,4,7490000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8190000,14,2,2,8490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8190000,14,3,3,8490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8190000,14,4,4,8490000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8690000,15,2,2,8990000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8690000,15,3,3,8990000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8690000,15,4,4,8990000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,12190000,16,2,2,12390000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,12190000,16,3,3,12390000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,12190000,16,4,4,12390000,1)


INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,10690000,17,2,2,10890000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,10690000,17,3,3,10890000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,10690000,17,4,4,10890000,1)


INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,9690000,18,2,2,9990000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,9690000,18,3,3,9990000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,9690000,18,4,4,9990000,1)


INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,10690000,19,2,2,10990000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,10690000,19,3,3,10990000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,10690000,19,4,4,10990000,1)


INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8690000,20,2,2,8990000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8690000,20,3,3,8990000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8690000,20,4,4,8990000,1)


INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8690000,21,2,2,8890000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8690000,21,3,3,8890000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8690000,21,4,4,8890000,1)


INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,12190000,22,2,2,12490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,12190000,22,3,3,12490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,12190000,22,4,4,12490000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,10690000,23,2,2,10890000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,10690000,23,3,3,10890000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,10690000,23,4,4,10890000,1)


INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,10390000,24,2,2,10590000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,10390000,24,3,3,10590000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,10390000,24,4,4,10590000,1)


INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,9690000,25,2,2,9890000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,9690000,25,3,3,9890000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,9690000,25,4,4,9890000,1)


INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8690000,26,2,2,9090000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8690000,26,3,3,9090000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8690000,26,4,4,9090000,1)


INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,14290000,27,2,2,14590000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,14290000,27,3,3,14590000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,14290000,27,4,4,14590000,1)


INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,4690000,28,2,2,4890000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,4690000,28,3,3,4890000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,4690000,28,4,4,4890000,1)


INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8190000,29,2,2,8390000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8190000,29,3,3,8390000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,8190000,29,4,4,8390000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,30,2,2,7390000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,30,3,3,7390000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,30,4,4,7390000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,5490000,31,2,2,5890000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,5490000,31,3,3,5890000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,5490000,31,4,4,5890000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,32,2,2,7490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,32,3,3,7490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,7190000,32,4,4,7490000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,5190000,33,2,2,5490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,5190000,33,3,3,5490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,5190000,33,4,4,5490000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,3190000,34,2,2,3690000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,3190000,34,3,3,3690000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,3190000,34,4,4,3690000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,3190000,35,2,2,3490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,3190000,35,3,3,3490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,3190000,35,4,4,3490000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,34190000,36,2,2,4690000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,34190000,36,3,3,4690000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,34190000,36,4,4,4690000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,4190000,37,2,2,4490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,4190000,37,3,3,4490000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,4190000,37,4,4,4490000,1)

INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,2690000,38,2,2,2990000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,2690000,38,3,3,2990000,1)
INSERT INTO ProductDetails (Quantity,CostPrice,ProductId,CapacityId,ColorId,RetailPrice,Status) 
VALUES(10,2690000,38,4,4,2990000,1)

Go

--PRODUCT SAC DU PHONG
Go
INSERT INTO Products (Name,[Desc],Size,Weight,ChargingTime,ChargingEfficiency,Accessibility,Battery,BatteryCore,Controls,Input,Output,Features,BrandId,CategoryId,Status) VALUES (N'Baseus Bipow Pro PPBD2-1020',N'Pin sạc dự phòng Polymer 10000mAh Type C PD 20W Baseus Bipow Pro PPBD2-1020 sở hữu gam màu sang trọng, thiết kế đẹp mắt, dung lượng 10.000 mAh, tương thích với nhiều thiết bị, mang đến cho người dùng những trải nghiệm hoàn hảo.','Dài 13.2 cm - Rộng 6.2 cm - Dày 1.96 cm','200 g','5 - 6 giờ (dùng Adapter 2A)10 - 11 giờ (dùng Adapter 1A)','0.58','Đèn LED báo pin','10000 mAh','Polymer','1 nút nguồn','Type C: 5V - 3A, 9V - 2A','USB: 5V - 3A, 9V - 2A, 12V - 1.5AType C: (PD) 5V - 3A, 9V - 2.22A (Max 20 W), 12V - 1.5A','Power Delivery Màn hình LED báo hiệu',10,2,1)
INSERT INTO Products (Name,[Desc],Size,Weight,ChargingTime,ChargingEfficiency,Accessibility,Battery,BatteryCore,Controls,Input,Output,Features,BrandId,CategoryId,Status) VALUES (N'Baseus Comet PPMD10',N'Pin sạc dự phòng Polymer 10000mAh Type C PD 22.5W Baseus Comet PPMD10 kèm Cáp Lightning và Type C sở hữu thiết kế thanh lịch, chất liệu pin sạc bền bỉ. Bên cạnh đó, sạc dự phòng còn được tích hợp dung lượng pin lớn kèm công nghệ sạc ấn tượng, hứa hẹn không làm cho người dùng phải thất vọng.','Dài 12.85 cm - Rộng 7 cm - Dày 2.33 cm','260g','5 - 6 giờ (dùng Adapter 2A)10 - 11 giờ (dùng Adapter 1A)','0.6','Đèn LED báo pin','10001 mAh','Li-Polymer','1 nút nguồn','Type C: 5V - 3A, 9V - 2A, 12V - 1.5A','USB: 5V - 2.4AType C: 5V - 2.4A, 9V - 2.22A (Max 20W), 12V - 1.5ACáp Type C: 5V - 2.4A, 9V - 2A, 10V - 2.25A (SCP), 12V - 1.5ACáp Lightning: 5V - 2.4A, 9V - 2.22A','Power Delivery Màn hình LED báo hiệu',10,2,1)
INSERT INTO Products (Name,[Desc],Size,Weight,ChargingTime,ChargingEfficiency,Accessibility,Battery,BatteryCore,Controls,Input,Output,Features,BrandId,CategoryId,Status) VALUES (N'Anker MagGo A1611',N'Pin sạc dự phòng Polymer 5000mAh Không dây Magnetic Type C Anker MagGo A1611 sở hữu ngoại hình đẹp mắt, khối lượng gọn nhẹ, tích hợp sạc không dây tiện lợi,...','Dài 10.5 cm - Rộng 6.7 cm - Dày 1.5 cm','145g','5 - 6 giờ (dùng 5V -2A)','0.6','Đèn LED báo pin','5000 mAh','Polymer','1 nút nguồn','Type C: 5V - 2.4A','Type C: 5V - 2.4ASạc không dây: 5W; 7.5W','Đèn LED báo hiệu Sạc không dây Magnetic Mini Cell',9,2,1)
INSERT INTO Products (Name,[Desc],Size,Weight,ChargingTime,ChargingEfficiency,Accessibility,Battery,BatteryCore,Controls,Input,Output,Features,BrandId,CategoryId,Status) VALUES (N'Anker MagGo A1641',N'Pin sạc dự phòng 10000mAh Không dây Magnetic Type C PD QC 3.0 20W Anker MagGo A1641 là sản phẩm 2 trong 1 vừa dùng để sạc pin vừa làm giá đỡ cho điện thoại của bạn, tích hợp sạc không dây tiện lợi, cổng ra hỗ trợ công suất lên đến 20 W, đáp ứng các nhu cầu sử dụng cơ bản hàng ngày.','Dài 10 cm - Ngang 7 cm - Dày 2 cm','218 g','Khoảng 2 giờ (dùng Adapter 3A)','0.6','Không','10000 mAh','Li-Ion','1 nút nguồn','Type C: 5V - 3A, 9V - 2A','USB: 5V - 3A, 9V - 2A (Max 18W)Type C: 5V - 3A, 9V - 2.22A (Max 20W)Sạc không dây: 5W; 7.5W','Đèn LED báo hiệu Sạc không dây MagneticQuick Charge 3.0 PowerIQPower Delivery',9,2,1)
INSERT INTO Products (Name,[Desc],Size,Weight,ChargingTime,ChargingEfficiency,Accessibility,Battery,BatteryCore,Controls,Input,Output,Features,BrandId,CategoryId,Status) VALUES (N'Polymer Baseus PPCXZ10',N'Pin sạc dự phòng Polymer 10000mAh Không dây Magnetic Type C PD 20W Baseus PPCXZ10 sở hữu gam màu sang trọng, diện mạo thanh lịch, dung lượng pin lớn, kích thước khá gọn nhẹ, tiện lợi mang theo bất cứ đâu mà không lo chiếm quá nhiều diện tích.','Dài 11.73 cm - Rộng 6.97 cm - Dày 2.3 cm','220 g','5 - 6 giờ (dùng Adapter 2A)10 - 11 giờ (dùng Adapter 1A)','0.58','Đèn LED báo pin','10000 mAh','Li-Polymer','1 nút nguồn','Type C: 5V - 3A, 9V - 2A','Type C: (PD) 5V - 3A, 9V - 2.22A (Max 20 W), 12V - 1.5AMagnetic: 5 W - 7.5 W - 10 W - 15 W','Sạc không dây Magnetic Power Delivery Màn hình LED báo hiệu',10,2,1)
INSERT INTO Products (Name,[Desc],Size,Weight,ChargingTime,ChargingEfficiency,Accessibility,Battery,BatteryCore,Controls,Input,Output,Features,BrandId,CategoryId,Status) VALUES (N'Samsung EB-U2510',N'Pin sạc dự phòng 10000mAh Không dây Type C PD 25W Samsung EB-U2510 là lựa chọn hoàn hảo cho những ai cần một nguồn năng lượng đáng tin cậy khi di chuyển. Với dung lượng này, bạn có thể giúp bạn luôn an tâm và không lo hết pin trong những chuyến công tác hay du lịch dài ngày.','Dài 14.8 cm - Ngang 7.2 cm - Dày 1.64 cm','222 g','2.2 giờ (sạc Samsung Galaxy S22 Ultra)','0.6','Không','10000 mAh','Li-Ion','1 nút nguồn','Type C: 5V - 3A, 9V - 2.77A (Max 25W)','Type C (PD 3.0) PPS: 3.3V~5.9V - 3A, 3.3V~11.0V - 2.25A (Max 25W)Sạc không dây 7.5WPDO: 5V - 3A, 9V - 2.77A (Max 25W)','Sạc không dây chuẩn Qi Power Delivery Màn hình LED báo hiệu',5,2,1)
INSERT INTO Products (Name,[Desc],Size,Weight,ChargingTime,ChargingEfficiency,Accessibility,Battery,BatteryCore,Controls,Input,Output,Features,BrandId,CategoryId,Status) VALUES (N'Samsung EB-P4520',N'Pin sạc dự phòng 20000 mAh Type C PD 45 W Samsung EB-P4520 với khả năng sạc siêu nhanh đến 45 W cho phép bạn sạc nhanh các thiết bị tương thích của bên thứ ba và Samsung.','Dài 15.2 cm - Rộng 7.6 cm - Dày 2.55 cm','402 g','3 - 4 giờ (dùng Adapter 2A)','0.6','Không','20000 mAh','Li-Ion','1 nút nguồn','Type C (PDO): 5V - 3A, 9V - 2.77A (Max 25W)','Type C (PPS): 3.3-11V - 4.05A, 3.3-16V - 2.8A, 3.3-21V - 2.1AType C (PDO): 5V - 3A, 9V - 3A,15V - 3A, 20V - 2.25A (Max 45W)','Super Fast Charging Power Delivery',5,2,1)
INSERT INTO Products (Name,[Desc],Size,Weight,ChargingTime,ChargingEfficiency,Accessibility,Battery,BatteryCore,Controls,Input,Output,Features,BrandId,CategoryId,Status) VALUES (N'Anker A1256',N'Siêu mỏng, tích hợp cáp sạc','Dày 2.6 cm - Rộng 5.2 cm - Dài 9.8 cm','220 g','3 giờ 30 phút (dùng Adapter 3A)','0.55','Không','10000 mAh','Li-Ion','1 nút nguồn','Type C: 5V - 3A, 9V - 2A, 12V - 1.5A','USB: 5V - 3A, 9V - 2A, 10V - 2.25A, 12V - 1.5AType C: 5V - 3A, 9V - 3A, 12V - 2.5A, 10V - 2.25A, 15V - 2A, 20V - 1.5A','Quick Charge 3.0 PowerIQPower Delivery Màn hình LED báo hiệu',9,2,1)

INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,720000,39,648000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,110000,40,99000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,850000,41,765000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,1050000,42,945000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,665000,43,598500,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,920000,44,828000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,1130000,45,1017000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,800000,46,720000,2,1)

Go


--PRODUCT TAI NGHE KHONG DAY
Go
INSERT INTO Products (Name,[Desc],Size,Weight,Battery,ChargingTime,Accessibility,Input,AudioTechnology,ChargingCase,Connectivity,BrandId,CategoryId,Status) VALUES (N'Bluetooth True Wireless realme Buds T300',N'Tai nghe Bluetooth True Wireless realme Buds T300 giúp bạn thưởng thức âm trầm sâu hơn, cùng với âm trung và cao rõ nét, tạo nên một trải nghiệm âm thanh toàn diện.',N'Dài 2.2 cm - Rộng 1.9 cm - Cao 3 cm',N'4.1 g ± 0.3 g',N'Dùng 8 giờ - Sạc 2 giờ',N'Sạc 2 giờ',N'macOSAndroid, iOS, Windows',N'Type-C',N'Dynamic Driver 12.4 mm|Active|Noise|Cancellation|Công nghệ ENC|360 Spatial Sound','Dùng 40 giờ - Sạc 2 giờ',N'Bluetooth 5.3',N'6',3,1)
INSERT INTO Products (Name,[Desc],Size,Weight,Battery,ChargingTime,Accessibility,Input,AudioTechnology,ChargingCase,Connectivity,BrandId,CategoryId,Status) VALUES (N'Bluetooth True Wireless realme Buds T110',N'Tai nghe Bluetooth True Wireless realme Buds T110 là sự lựa chọn hoàn hảo cho những ai yêu thích âm nhạc chất lượng cao cùng trải nghiệm mượt mà, ổn định.',N'Dài 3.264 cm - Rộng 2.128 cm - Cao 2.075 cm',N'4.09 g ± 0.3 g',N'Dùng 7 giờ - Sạc 2 giờ',N'Sạc 2 giờ',N'macOSAndroid, iOS, Windows',N'Type-C',N'Chống nước IPX5|Game Mode|Có mic thoại|Sạc nhanh|Khử tiếng ồn AI|Hỗ trợ Google Fast Pair','Dùng 38 giờ - Sạc 2 giờ',N'Bluetooth 5.4',N'6',3,1)
INSERT INTO Products (Name,[Desc],Size,Weight,Battery,ChargingTime,Accessibility,Input,AudioTechnology,ChargingCase,Connectivity,BrandId,CategoryId,Status) VALUES (N'Bluetooth True Wireless Xiaomi Redmi Buds 5',N'Nếu bạn là một tín đồ âm nhạc đích thực, luôn tìm kiếm những trải nghiệm nghe nhạc đỉnh cao, thì đừng bỏ qua Xiaomi Redmi Buds 5. Với thiết kế thời thượng, cảm giác đeo thoải mái, chất âm sống động và thời lượng pin dài, Redmi Buds 5 sẽ mang đến cho bạn những phút giây thư giãn tuyệt vời.',N'Dài 2.95 cm - Rộng 2.35 cm - Cao 2.14 cm',N'5.3 g',N'Dùng 10 giờ - Sạc 2 giờ',N'Sạc 2 giờ',N'macOSAndroid, iOS, Windows',N'Type-C',N'Dynamic Driver 12.4 mm|Active Nois| Cancelling','Dùng 40 giờ - Sạc 2 giờ',N'Bluetooth 5.3',N'2',3,1)
INSERT INTO Products (Name,[Desc],Size,Weight,Battery,ChargingTime,Accessibility,Input,AudioTechnology,ChargingCase,Connectivity,BrandId,CategoryId,Status) VALUES (N'Bluetooth True Wireless OPPO ENCO Buds 2 ETE41',N'Thiết kế dạng tròn mới lạ, màu sắc thời thượng, sang trọng',N'Dài 2.1 cm - Rộng 2.2 cm - Cao 3.4 cm',N'4 g',N'Dùng 7 giờ - Sạc 1.5 giờ',N'Sạc 2 giờ',N'macOSAndroid, iOS, Windows',N'Type-C',N'Chống nước IPX4|Game Mode|Chụp ảnh nhanh','Dùng 28 giờ - Sạc 3 giờ',N'Bluetooth 5.2',N'4',3,1)
INSERT INTO Products (Name,[Desc],Size,Weight,Battery,ChargingTime,Accessibility,Input,AudioTechnology,ChargingCase,Connectivity,BrandId,CategoryId,Status) VALUES (N'Bluetooth True Wireless HAVIT TW976',N'Tai nghe Bluetooth True Wireless HAVIT TW976 mang luồng gió mới với thiết kế trendy, chất âm sống động dành cho giới trẻ sành điệu, đồng thời tích hợp nhiều công nghệ tiên tiến cho trải nghiệm tuyệt vời nhất.',N'Dài 3.177 cm - Rộng 1.702 cm - Cao 1.679 cm',N'3.4 g',N'Dùng 5 giờ - Sạc 2 giờ',N'Sạc 2 giờ',N'macOSAndroid, iOS, Windows',N'Type-C',N'Tăng/giảm âm lượng|Phát/dừng chơi nhạc|Chuyển bài hát|Bật trợ lí ảo|Bật/tắt game mode|Nhận/Ngắt cuộc gọi','Dùng 25 giờ - Sạc 2 giờ',N'Bluetooth 5.3',N'12',3,1)
INSERT INTO Products (Name,[Desc],Size,Weight,Battery,ChargingTime,Accessibility,Input,AudioTechnology,ChargingCase,Connectivity,BrandId,CategoryId,Status) VALUES (N'Bluetooth True Wireless JBL Tune Beam',N'Đắm chìm trong từng điệu nhạc với tai nghe Bluetooth True Wireless JBL Tune Beam có thiết kế ôm sát, vừa vặn, tạo cảm giác chắc chắn, ngăn chặn tiếng ồn cho hiệu suất âm thanh hoàn hảo hơn.',N'Dài 3.4 cm - Rộng 2.5 cm - Cao 1.3 cm',N'5 g',N'Dùng 12 giờ - Sạc 1 giờ',N'Sạc 2 giờ',N'macOSAndroid, iOS, Windows',N'Type-C',N'JBL Pure Bass|Sound|Active Noise|Cancelling|TalkThru|Ambient Sound','Dùng 48 giờ - Sạc 2 giờ',N'Bluetooth 5.3',N'13',3,1)
INSERT INTO Products (Name,[Desc],Size,Weight,Battery,ChargingTime,Accessibility,Input,AudioTechnology,ChargingCase,Connectivity,BrandId,CategoryId,Status) VALUES (N'Bluetooth True Wireless JBL Wave Beam',N'Hòa mình vào giai điệu mọi lúc, mọi nơi với tai nghe Bluetooth True Wireless JBL Wave Beam có chất âm JBL Deep Bass sâu lắng giúp bạn tự do thả mình vào thế giới âm nhạc đặc sắc.',N'Dài 2.35 cm - Rộng 2.186 cm - Cao 3.099 cm',N'4.4 g',N'Dùng 8 giờ - Sạc 1 giờ',N'Sạc 2 giờ',N'macOSAndroid, iOS, Windows',N'Type-C',N'JBL Pure Bass|Sound|Active Noise|Cancelling|TalkThru|Ambient Sound','Dùng 32 giờ - Sạc 2 giờ',N'Bluetooth 5.2',N'13',3,1)
INSERT INTO Products (Name,[Desc],Size,Weight,Battery,ChargingTime,Accessibility,Input,AudioTechnology,ChargingCase,Connectivity,BrandId,CategoryId,Status) VALUES (N'Bluetooth True Wireless JBL Live Pro 2',N'Tai nghe Bluetooth True Wireless JBL Live Pro 2 mang đến những trải nghiệm âm thanh tuyệt vời với thời lượng pin lên đến 40 tiếng, giúp bạn tự do đắm chìm trong vũ trụ nhịp điệu của riêng mình.',N'Dài 3.2 cm - Rộng 2.3 cm - Cao 1.9 cm',N'4.8 g',N'Dùng 10 giờ - Sạc 1 giờ',N'Sạc 2 giờ',N'macOSAndroid, iOS, Windows',N'Type-C',N'JBL Signature Sound|Ambient Sound|True Adaptive Nois| Cancelling','Dùng 40 giờ - Sạc 2 giờ',N'Bluetooth 5.2',N'13',3,1)
INSERT INTO Products (Name,[Desc],Size,Weight,Battery,ChargingTime,Accessibility,Input,AudioTechnology,ChargingCase,Connectivity,BrandId,CategoryId,Status) VALUES (N'Bluetooth True Wireless Xiaomi Redmi Buds 5 Pro',N'Xiaomi vừa trình làng mẫu tai nghe True Wireless mới nhất của mình mang tên Xiaomi Redmi Buds 5 Pro. Mang nhiều công nghệ đáng chú ý như giảm tiếng ồn lên đến 52 dB và chặn 99.5% tiếng ồn xung quanh, tích hợp thuật toán AI, sạc siêu nhanh, đi cùng thời lượng pin ấn tượng,... hứa hẹn đáp ứng tối ưu mọi nhu cầu sử dụng của người dùng.',N'Dài 3 cm - Rộng 2 cm - Cao 2.2 cm',N'5.1 g',N'Dùng 10 giờ - Sạc 2 giờ',N'Sạc 2 giờ',N'macOSAndroid, iOS, Windows',N'Type-C',N'Hi-Res AudioActive Noise Cancelling','Dùng 38 giờ - Sạc 2 giờ',N'Bluetooth 5.3',N'2',3,1)
INSERT INTO Products (Name,[Desc],Size,Weight,Battery,ChargingTime,Accessibility,Input,AudioTechnology,ChargingCase,Connectivity,BrandId,CategoryId,Status) VALUES (N'Bluetooth True Wireless Samsung Galaxy Buds FE R400N',N'Tai nghe Bluetooth True Wireless Samsung Galaxy Buds FE R400N là sự kết hợp hoàn hảo của thiết kế và chất âm khi mang diện mạo nhỏ gọn, khả năng tái tạo âm bass mạnh mẽ, công nghệ chống ồn chủ động, hỗ trợ đàm thoại rõ nét,... cùng vô vàn tiện ích khác chờ bạn khám phá, trải nghiệm. ',N'Dài 2.22 cm - Rộng 1.71 cm - Cao 1.92 cm',N'5.6 g',N'Dùng Khoảng 8.5 giờ (khi tắt ANC) - Sạc Khoảng 1.7 giờ',N'Sạc 2 giờ',N'macOSAndroid, iOS, Windows',N'Type-C',N'Active Noise|CancellingAmbient Sound','Dùng 30 giờ - Sạc 2 giờ',N'Bluetooth 5.2',N'5',3,1)
INSERT INTO Products (Name,[Desc],Size,Weight,Battery,ChargingTime,Accessibility,Input,AudioTechnology,ChargingCase,Connectivity,BrandId,CategoryId,Status) VALUES (N'Bluetooth True Wireless HAVIT TW971',N'Tai nghe Bluetooth True Wireless HAVIT TW971 mang đến một thiết kế trong suốt, âm thanh rõ ràng và sống động, cùng với nhiều công nghệ tiện ích được tích hợp, hứa hẹn đáp ứng nhu cầu nghe nhạc hay gọi thoại cơ bản hằng ngày cho người dùng.',N'Dài 3.3 cm - Rộng 2.9 cm - Cao 1.7 cm',N'3.9 g',N'Dùng 5 giờ - Sạc 1.5 giờ',N'Sạc 2 giờ',N'macOSAndroid, iOS, Windows',N'Type-C',N'Màng loa 13 mm','Dùng 18 giờ - Sạc 2 giờ',N'Bluetooth 5.3',N'12',3,1)
INSERT INTO Products (Name,[Desc],Size,Weight,Battery,ChargingTime,Accessibility,Input,AudioTechnology,ChargingCase,Connectivity,BrandId,CategoryId,Status) VALUES (N'Bluetooth True Wireless HAVIT TW945',N'Tai nghe Bluetooth True Wireless HAVIT TW945 mang đến thiết kế sang trọng với kiểu dáng tối giản và màu sắc đa dạng, âm thanh đầy đủ và rõ ràng, tích hợp nhiều tính năng và tiện ích khác, phục vụ tốt nhu cầu sử dụng cơ bản hàng ngày của đa số người dùng.',N'Dài 3.3 cm - Rộng 1.9 cm - Cao 1.6 cm',N'4 g',N'Dùng 3 giờ - Sạc 1.5 giờ',N'Sạc 2 giờ',N'macOSAndroid, iOS, Windows',N'Type-C',N'Màng loa 13 mm','Dùng 18 giờ - Sạc 2 giờ',N'Bluetooth 5.3',N'12',3,1)


INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,890000,47,801000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,690000,48,621000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,990000,49,891000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,790000,50,711000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,260000,51,234000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,2290000,52,2061000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,1290000,53,1161000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,2790000,54,2511000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,1790000,55,1611000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,1390000,56,1251000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,2277000,57,2049300,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,290000,58,261000,2,1)

Go

--PRODUCT TAI NGHE CO DAY
Go
INSERT INTO Products(Name,[Desc],Accessibility,Controls,Input,Connectivity,BrandId,CategoryId,Status) VALUES (N'Sony MDR - ZX110AP',N'Tai nghe Chụp Tai Sony MDR - ZX110AP với thiết kế hiện đại, phong cách',N'Android',N'Phát/dừng chơi nhạc',N'Jack 3.5mm',N'1 thiết bị',14,4,1)
INSERT INTO Products(Name,[Desc],Accessibility,Controls,Input,Connectivity,BrandId,CategoryId,Status) VALUES (N'Sony MDR-EX155AP',N'Tai nghe Có Dây Sony MDR-EX155AP thiết kế trẻ trung, đảm bảo tương thích với hầu hết điện thoại, laptop hay máy tính bảng hiện nay (sử dụng jack 3.5 mm)',N'Windows PhoneWindowsiOS (iPhone)Android',N'Phát/dừng chơi nhạcNhận/Ngắt cuộc gọiMic thoại',N'Jack 3.5mm',N'1 thiết bị',14,4,1)
INSERT INTO Products(Name,[Desc],Accessibility,Controls,Input,Connectivity,BrandId,CategoryId,Status) VALUES (N'Sony MDR-EX15AP',N'Tai nghe in-ear với âm thanh chất lượng cao',N'Windows PhoneWindowsiOS (iPhone)Android',N'Phát/dừng chơi nhạcNhận/Ngắt cuộc gọiMic thoại',N'Jack 3.5mm',N'1 thiết bị',14,4,1)
INSERT INTO Products(Name,[Desc],Accessibility,Controls,Input,Connectivity,BrandId,CategoryId,Status) VALUES (N'Xiaomi Mi Basic',N'Tai nghe Xiaomi Mi Basic: vẻ đẹp tinh tế, chất âm tinh khiết',N'Windows PhoneWindowsiOS (iPhone)Android',N'Dừng hoặc phát nhạc',N'Jack 3.5mm',N'1 thiết bị',2,4,1)
INSERT INTO Products(Name,[Desc],Accessibility,Controls,Input,Connectivity,BrandId,CategoryId,Status) VALUES (N'Mozard DS510-WB',N'Tai nghe Có Dây Mozard DS510-WB có thiết kế mới mẻ, hợp thời trang',N'Windows PhoneWindowsiOS (iPhone)Android',N'Tăng/giảm âm lượngNhận/Ngắt cuộc gọi',N'Jack 3.5mm',N'1 thiết bị',16,4,1)
INSERT INTO Products(Name,[Desc],Accessibility,Controls,Input,Connectivity,BrandId,CategoryId,Status) VALUES (N'Awei Q27Hi',N'Tai nghe Có Dây Awei Q27Hi có thiết kế nhỏ gọn, tiện lợi, dễ mang theo để sử dụng trong các chuyến đi',N'Windows PhoneWindowsiOS (iPhone)Android',N'Tăng/giảm âm lượngPhát/dừng chơi nhạcNhận/Ngắt cuộc gọi',N'Jack 3.5mm',N'1 thiết bị',17,4,1)
INSERT INTO Products(Name,[Desc],Accessibility,Controls,Input,Connectivity,BrandId,CategoryId,Status) VALUES (N'HAVIT H205D',N'Tai nghe nhét tai với âm thanh rõ ràng',N'Đệm tai thoải mái',N'Nút điều khiển nhạc và cuộc gọi',N'Jack 3.5mm',N'Có dây',15,4,1)
INSERT INTO Products(Name,[Desc],Accessibility,Controls,Input,Connectivity,BrandId,CategoryId,Status) VALUES (N'HAVIT HV-E11',N'Tai nghe nhét tai với thiết kế đơn giản',N'Đệm tai mềm mại',N'Nút điều khiển cuộc gọi',N'Jack 3.5mm',N'Có dây',15,4,1)
INSERT INTO Products(Name,[Desc],Accessibility,Controls,Input,Connectivity,BrandId,CategoryId,Status) VALUES (N'Xiaomi Mi In-Ear Headphones Pro HD',N'Tai nghe nhét tai với driver ba lớp cho âm thanh chi tiết',N'Đệm tai thoải mái',N'Nút điều khiển âm lượng và cuộc gọi',N'Jack 3.5mm',N'Có dây',2,4,1)
INSERT INTO Products(Name,[Desc],Accessibility,Controls,Input,Connectivity,BrandId,CategoryId,Status) VALUES (N'Samsung Level In ANC',N'Tai nghe nhét tai với công nghệ chống ồn',N'Đệm tai thay thế',N'Nút điều khiển nhạc và cuộc gọi',N'Jack 3.5mm',N'Có dây',5,4,1)
INSERT INTO Products(Name,[Desc],Accessibility,Controls,Input,Connectivity,BrandId,CategoryId,Status) VALUES (N'Sony WF-C500',N'Tai nghe thể thao, chống nước',N'Dễ sử dụng',N'Nút điều khiển',N'USB-C',N'Bluetooth',14,4,1)
INSERT INTO Products(Name,[Desc],Accessibility,Controls,Input,Connectivity,BrandId,CategoryId,Status) VALUES (N'Samsung Galaxy Buds Live',N'Thiết kế độc đáo, chất lượng âm thanh tốt',N'Dễ sử dụng',N'Nút điều khiển',N'USB-C',N'Bluetooth',5,4,1)

INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,430000,59,387000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,320000,60,288000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,190000,61,171000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,150000,62,135000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,135000,63,121500,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,90000,64,81000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,150000,65,135000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,100000,66,90000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,135000,67,121500,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,1200000,68,1080000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,1800000,69,1620000,2,1)
INSERT INTO ProductDetails(Quantity,RetailPrice,ProductId,CostPrice,ColorId,Status) VALUES(12,3200000,70,2880000,2,1)

Go
--IMAGES
GO
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('wf844cgwwvzmbnsszlq5','https://res.cloudinary.com/dht1ypbn2/image/upload/v1718021124/wf844cgwwvzmbnsszlq5.jpg',1)
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('nti1ash26dnvlmqy3vtf','https://res.cloudinary.com/dht1ypbn2/image/upload/v1718021124/nti1ash26dnvlmqy3vtf.jpg',1)
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('srtv88ifgs04u5catu49','https://res.cloudinary.com/dht1ypbn2/image/upload/v1718021124/srtv88ifgs04u5catu49.jpg',1)
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('xhlqeb9spfmjovqht39p','https://res.cloudinary.com/dht1ypbn2/image/upload/v1718021124/xhlqeb9spfmjovqht39p.jpg',1)
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('scdmopdbsa1vqvarqund','https://res.cloudinary.com/dht1ypbn2/image/upload/v1718021124/scdmopdbsa1vqvarqund.jpg',1)
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('h7lzp3hdykptl5gcbahk','https://res.cloudinary.com/dht1ypbn2/image/upload/v1718021126/h7lzp3hdykptl5gcbahk.jpg',1)
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('pac7yonapdvs9namvjwc','https://res.cloudinary.com/dht1ypbn2/image/upload/v1718021126/pac7yonapdvs9namvjwc.jpg',1)
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('oqije9uqky4n5mahu7rf','https://res.cloudinary.com/dht1ypbn2/image/upload/v1718021182/oqije9uqky4n5mahu7rf.jpg',1)
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('rhmd5u9g9cjayw4kam09','https://res.cloudinary.com/dht1ypbn2/image/upload/v1718021182/rhmd5u9g9cjayw4kam09.jpg',1)
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('bt3ssoh7loowkvgaxwp8','https://res.cloudinary.com/dht1ypbn2/image/upload/v1718021182/bt3ssoh7loowkvgaxwp8.jpg',1)
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('wqyea5xnq2pu5i5bidns','https://res.cloudinary.com/dht1ypbn2/image/upload/v1718021182/wqyea5xnq2pu5i5bidns.jpg',1)
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('d6cru6tdqwarkgieeddn','https://res.cloudinary.com/dht1ypbn2/image/upload/v1718021182/d6cru6tdqwarkgieeddn.jpg',1)
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('jmactdaxmseuhbzrzv3l','https://res.cloudinary.com/dht1ypbn2/image/upload/v1718021182/jmactdaxmseuhbzrzv3l.jpg',1)

INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 2 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 2 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 3 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 4 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 5 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 6 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 7 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 8 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 9 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 10 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 11 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 12 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 13 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 14 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 15 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 16 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 17 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 18 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 19 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 20 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 21 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 22 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 23 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 24 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 25 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 26 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 27 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 28 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 29 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 30 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 31 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 32 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 33 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 34 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 35 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 36 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 37 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 38 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 39 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 40 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 41 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 42 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 43 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 44 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 45 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 46 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 47 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 48 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 49 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 50 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 51 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 52 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 53 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 54 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 55 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 56 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 57 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 58 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 59 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 60 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 61 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 62 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 63 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 64 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 65 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 66 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 67 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 68 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 69 )
INSERT INTO Images (ImagePublicId,ImageUrl,ProductId) VALUES('znct6ni51v1ahhygrjbf','https://res.cloudinary.com/dnae0qmxl/image/upload/v1717395741/znct6ni51v1ahhygrjbf.jpg', 70 )
go
--ORDER STATUS
INSERT INTO OrderStatuses(Title,Status) VALUES('IsPaid',1)
INSERT INTO OrderStatuses(Title,Status) VALUES('IsBeginShipped',1)
INSERT INTO OrderStatuses(Title,Status) VALUES('IsShipped',1)
INSERT INTO OrderStatuses(Title,Status) VALUES('IsCompled',1)
INSERT INTO OrderStatuses(Title,Status) VALUES('IsCanceled',1)


Go
INSERT INTO Slideshows(ImagePublicId,ImageUrl,ContentUrl,Status) VALUES('rldg5fy44fxc3rwa952x','https://res.cloudinary.com/dht1ypbn2/image/upload/v1718184968/rldg5fy44fxc3rwa952x.webp','dtdd/2',1)
INSERT INTO Slideshows(ImagePublicId,ImageUrl,ContentUrl,Status) VALUES('x8jcrvgzabpgyn0izqni','https://res.cloudinary.com/dht1ypbn2/image/upload/v1718184969/x8jcrvgzabpgyn0izqni.webp','dtdd/30',1)
--INVOICE
Go
INSERT INTO Invoices(UserId,ShippingInfo,IssueDate,DeliveryDate,TotalPrice,TotalPriceAfterDiscount,RecipientName,RecipientPhoneNumber,OrderStatusId)
VALUES ('e6791f11-0ace-4a3d-b7d2-00127c35c084',N'53b tân nhơn phú A','2024/06/03','2024/06/05',93400000,93400000,N'Phạm Quảng Bình','0329155867',4)

INSERT INTO Invoices(UserId,ShippingInfo,IssueDate,DeliveryDate,TotalPrice,TotalPriceAfterDiscount,RecipientName,RecipientPhoneNumber,OrderStatusId)
VALUES ('e6791f11-0ace-4a3d-b7d2-00127c35c084',N'53b tân nhơn phú A','2024/06/03','2024/06/05',30892000,30892000,N'Phạm Quảng Bình','0329155867',4)

INSERT INTO Invoices(UserId,ShippingInfo,IssueDate,DeliveryDate,TotalPrice,TotalPriceAfterDiscount,RecipientName,RecipientPhoneNumber,OrderStatusId)
VALUES ('e6791f11-0ace-4a3d-b7d2-00127c35c084',N'53b tân nhơn phú A','2024/06/03','2024/06/05',30892000,30892000,N'Phạm Quảng Bình','0329155867',4)
Go

--INVOICEDETAIL
Go
INSERT INTO InvoiceDetails VALUES (1,6,2,14190000)
INSERT INTO InvoiceDetails VALUES (1,15,2,10190000)
INSERT INTO InvoiceDetails VALUES (1,14,3,10190000)
INSERT INTO InvoiceDetails VALUES (1,123,3,4690000)
INSERT INTO InvoiceDetails VALUES (1,88,3,4690000)
INSERT INTO InvoiceDetails VALUES (1,22,3,4690000)
INSERT INTO InvoiceDetails VALUES (1,55,3,4690000)
INSERT INTO InvoiceDetails VALUES (1,77,3,4690000)

INSERT INTO InvoiceDetails VALUES (2,124,1,1150000)
INSERT INTO InvoiceDetails VALUES (2,125,1,690000)
INSERT INTO InvoiceDetails VALUES (2,126,1,5727000)
INSERT INTO InvoiceDetails VALUES (2,127,1,2300000)
INSERT INTO InvoiceDetails VALUES (2,128,1,6417000)
INSERT INTO InvoiceDetails VALUES (2,129,1,4577000)
INSERT INTO InvoiceDetails VALUES (2,130,1,2277000)
INSERT INTO InvoiceDetails VALUES (2,131,1,1587000)

INSERT INTO InvoiceDetails VALUES (2,124,1,1150000)
INSERT INTO InvoiceDetails VALUES (2,125,1,690000)
INSERT INTO InvoiceDetails VALUES (2,126,1,5727000)
INSERT INTO InvoiceDetails VALUES (2,127,1,2300000)
INSERT INTO InvoiceDetails VALUES (2,128,1,6417000)
INSERT INTO InvoiceDetails VALUES (2,129,1,4577000)
INSERT INTO InvoiceDetails VALUES (2,130,1,2277000)
INSERT INTO InvoiceDetails VALUES (2,131,1,1587000)


INSERT INTO InvoiceDetails VALUES (3,140,1,350000)
INSERT INTO InvoiceDetails VALUES (3,141,1,250000)
INSERT INTO InvoiceDetails VALUES (3,142,1,300000)
INSERT INTO InvoiceDetails VALUES (3,143,1,200000)
INSERT INTO InvoiceDetails VALUES (3,136,1,400000)
INSERT INTO InvoiceDetails VALUES (3,137,1,300000)
INSERT INTO InvoiceDetails VALUES (3,138,1,150000)
INSERT INTO InvoiceDetails VALUES (3,139,1,100000)
GO