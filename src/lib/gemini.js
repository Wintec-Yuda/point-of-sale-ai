import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_GEMINI_API_URL;

export const generate = async (prompt) => {
    const { data } = await axios.post(
        `${apiUrl}?key=${apiKey}`,
        {
            contents: [
                {
                    parts: [{ text: prompt }],
                },
            ],
        },
        { headers: { "Content-Type": "application/json" } }
    );

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Tidak ada rekomendasi.";
    return text.replace(/\n/g, "<br>");
};

export const mergeData = (suppliers, products, transactions) => {
  return transactions.map((transaction) => {
    const detailedItems = transaction.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      const supplier = product
        ? suppliers.find((s) => s.id === product.supplier_id)
        : null;

      return {
        ...item,
        productName: product ? product.name : "Unknown Product",
        productCategory: product ? product.category : "Unknown Category",
        productPrice: product ? product.price : 0,
        supplierId: supplier ? supplier.id : "Unknown Supplier",
        supplierName: supplier ? supplier.name : "Unknown Supplier",
      };
    });

    return {
      ...transaction,
      items: detailedItems,
    };
  });
};


export const buildPromptAnalysis = (suppliers, products, transactions) => {
  const merged = mergeData(suppliers, products, transactions);

  return `Berdasarkan data berikut:
  
SUPPLIERS:
${JSON.stringify(merged, null, 2)}

lakukan analisis mendalam untuk memberikan wawasan dan rekomendasi strategis yang dapat mendukung pengambilan keputusan bisnis. Fokus pada:
1. **Kinerja Supplier**:
   - Supplier mana yang produknya paling laris berdasarkan jumlah transaksi?
   - Bagaimana korelasi antara supplier dan nilai refund?

2. **Analisis Produk**:
   - Produk apa yang paling sering muncul di transaksi bernilai tinggi?
   - Adakah pola produk yang sering direfund?

3. **Analisis Transaksi**:
   - Identifikasi tren temporal (mingguan/bulanan) dari nilai transaksi
   - Hitung rasio refund rate (total refunded/total transaksi)
   - Analisis rata-rata nilai transaksi per jumlah item

4. **Rekomendasi Bisnis**:
   - Saran untuk optimasi inventory berdasarkan produk terlaris
   - Strategi pricing untuk bundle produk yang sering dibeli bersama
   - Rekomendasi perbaikan proses untuk mengurangi refund

Format output:
- Gunakan bullet points untuk insight penting
- Sertakan perhitungan numerik untuk mendukung analisis
- Berikan rekomendasi yang actionable dengan prioritas (high/medium/low)
- Gunakan bahasa yang jelas dan ringkas
- Flag data anomali jika ditemukan`;
};