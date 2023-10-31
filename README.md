# Final project template

## 1. Tổng quan
Rikkei Academy Da Nang - ReactJS Project Template

## 2. Công nghệ sử dụng

|No.|Name|
|---|----|
|1|React JS|
|2|React Router|
|3|React Bootstrap|
|4|Redux Toolkit|

## 3. Cấu trúc thư mục

```
└───src
    ├───admin-site              # Chứa source code của trang quản trị viên (Routes: /admin/*)
    │   ├───components          # Chứa các component chung của trang quản trị viên
    │   │   ├───partials        # Chứa các component chung (header, footer, menu, ...) của trang quản trị viên
    │   │   ├───table           # Chứa các component chung về bảng (phân trang, ...) của trang quản trị viên
    │   ├───layouts             # Layout chung của trang quản trị viên
    │   ├───pages               # Chứa các page components của trang quản trị viên
    │   │   ├───contacts
    │   │   ├───errors          # Chứa các page error components (not found, ...) của trang quản trị viên
    │   │   ├───orders
    │   │   ├───products
    │   │   └───users
    │   └───store               # Chứa các thành phần về store của trang quản trị viên
    │   │   ├───actions         # Chứa các action của trang quản trị viên
    │   │   └───reducers        # Chứa các reducer của trang quản trị viên
    │   │   └───index.js        # Nơi tạo store của trang quản trị viên
    │   └───AdminApp.js         # Component root (khai báo routes, store, ...) của trang quản trị viên

    └───customer-site           # Chứa source code của trang khách hàng (Routes: /*)
        ├───components          # Chứa các component chung của trang khách hàng
        │   ├───partials        # Chứa các component chung (header, footer, menu, ...) của trang khách hàng
        ├───layouts             # Layout chung dành của trang khách hàng
        ├───pages               # Chứa các page components của trang khách hàng
        │   ├───cart
        │   ├───contacts
        │   ├───errors          # Chứa các page error components (not found, ...) của trang khách hàng
        │   └───products
        └───store               # Chứa các thành phần về store của trang khách hàng
        │   ├───actions         # Chứa các action của trang khách hàng
        │   └───reducers        # Chứa các reducer của trang khách hàng
        │   └───index.js        # Nơi tạo store của trang khách hàng
        └───CustomerApp.js      # Component root (khai báo routes, store, ...) của trang khách hàng
```

## 4. Hướng dẫn cơ bản

### 4.1. Cài đặt:
Chạy câu lệnh phía dưới ở thư mục root (thư mục chứa file `package.json`)
```bash
npm install
```

### 4.2. Khởi động ứng dụng:
Chạy câu lệnh phía dưới ở thư mục root (thư mục chứa file `package.json`)
```bash
npm start
```

### 4.3. Đường dẫn:

#### 4.3.1. Trang quản trị viên

Base URL `http://localhost:3000/admin/`

#### 4.3.2. Trang dành cho khách hàng

Base URL `http://localhost:3000/`
