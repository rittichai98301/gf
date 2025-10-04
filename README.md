# กวนแฟน - Tease App (Vite + React + Tailwind)

## รันในเครื่อง
```bash
npm install
npm run dev
```
แล้วเปิดลิ้งก์ที่แสดง (เช่น http://localhost:5173)

## Deploy ขึ้น Vercel
1) สร้าง GitHub repo แล้วอัปโหลดโค้ดนี้
2) ไปที่ https://vercel.com → New Project → Import Git Repository → เลือก repo
3) Framework Preset: **Vite** (Vercel มักเดาได้อัตโนมัติ)
4) Build Command: `npm run build` | Output Dir: `dist`
5) กด Deploy → จะได้ลิ้งก์ `https://<project>.vercel.app` ส่งให้แฟนได้เลย

### ไม่ใช้ Git ก็ได้ (อัปโหลดโดยตรง)
- สร้างโปรเจคใหม่ใน Vercel แล้วเลือก **Add New… → Project** → **Deploy from Git** แนะนำใช้ Git
- หรือใช้ **Netlify Drop** (https://app.netlify.com/drop) โดยรัน `npm run build` แล้วลากโฟลเดอร์ `dist/` ไปวาง

## แก้ไขธีม/คำพูด
- แก้ที่ไฟล์ `src/App.jsx` ในอาร์เรย์ `memories`, `teasePhrases`
- เปลี่ยนรูป default ใน `images[]` หรืออัปโหลดรูปใหม่ขณะใช้งาน (drag & drop)
