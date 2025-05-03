anda sebagai UI/UX developer dan frontend engineer buatkan aplikasi point of sales memakai next js 15 (app router), buatkan, jadi setiap fitur jadikan 1 file jsx, style pake tailwind css, animasi yg keren pake framer motion, icon yg bagus pake react-icons, notifikasi pake toastify, management state pake zustand, untuk proses seperti CRUD menggunakan management state

design nya modern, pemilihan warna estetik, minimalis, responsive (hp, tablet, dekstop), table pake pagination

struktur folder sesuai dibawah ini:
src/
├── app/
│   ├── layout.jsx                  # Layout utama
│   ├── page.jsx                    # Halaman memilih mau ke admin atau cashier
│   |   ├── admin/
|   |       |-- layout
|   |       |-- page.jsx            # Halaman Dashboard yang menampilkan kesimpulan, laporan, dll
│   │       ├── products            
|   |           |-- page.jsx        # Halaman manajemen produk CRUD
│   │       ├── suppliers            
|   |           |-- page.jsx        # Halaman manajemen supplier
│   │       ├── transactions       
|   |           |-- page.jsx        # Halaman menampilkan data transaction
│   |   ├── cashier/
|   |       |-- layout.jsx
│   │       ├── page.jsx            # Halaman dashboard untuk transaksi, card, payment, search product
├── stores/                         # Zustand stores
│   ├── useProductStore.js          
│   ├── useCartStore.js 
│   ├── useTransactionStore.js      
├── data/                         
│   ├── products.js          # tambahkan data dummy 50
│   ├── transactions.js      # tambahkan data dummy 100
│   ├── supplier.js          # tambahkan data dummy 5
├── components/                     
│   ├── modal/
│       ├── PaymentModal.jsx
│       ├── ReceiptModal.jsx
│       ├── ProductModal.jsx
│       ├── SupplierModal.jsx
│   ├── ui/
│       ├── SidebarAdmin.jsx        # responsive (hp, tablet, dekstop)
│       ├── SidebarCashier.jsx      # responsive (hp, tablet, dekstop)

data product: id, name, category, price, stock, supplier_id
data transaction: id, date, items=[products], subtotal, paymentMethod, status(refunded, completed)
data supplier: id, name, telp, address