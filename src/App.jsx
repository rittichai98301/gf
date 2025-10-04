import React, { useState, useRef } from 'react'

export default function App() {
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=60',
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=60',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=60'
  ]);

  const memories = [
    'จำได้มั้ยวันนั้นฝนตกแต่เรายังไปกินไอติมกัน 😝',
    'เธอหัวเราะตอนใส่ถุงเท้าสีเดียวกัน น่ารักชิบ',
    'วันนั้นเธอปล่อยแก๊งค์มุกจนผมหัวเราะไม่หยุด 😂',
    'ยังจำกลิ่นกาแฟในเช้าวันนั้นได้อยู่เลย ☕️',
    'ข้ออ้างสุดคลาสสิคของเธอ: "แค่หน่อยเดียว" — แล้วหน่อยเดียว 2 ชั่วโมง'
  ];

  const teasePhrases = [
    'กดเลย ถ้ากล้ารับความน่ารักนี้',
    'อยากเห็นหน้ายิ้มหรือยัง? กดสิ!',
    'เตรียมใจไว้... จะกวนแบบรักๆ นะ 😉',
    'เธอพร้อมหรือยังกับความทรงจำแบบสุ่ม?'
  ];

  const [current, setCurrent] = useState({ img: images[0], mem: memories[0] });
  const [mode, setMode] = useState('soft'); // soft / hard
  const fileInputRef = useRef(null);

  function pickRandom() {
    if (images.length === 0) return;
    const idx = Math.floor(Math.random() * images.length);
    const midx = Math.floor(Math.random() * memories.length);
    setCurrent({ img: images[idx], mem: memories[midx] });
  }

  function onDrop(e) {
    e.preventDefault();
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  }

  function handleFiles(files) {
    const arr = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (arr.length === 0) return;
    const readers = arr.map(f => {
      return new Promise(res => {
        const r = new FileReader();
        r.onload = ev => res(ev.target.result);
        r.readAsDataURL(f);
      });
    });
    Promise.all(readers).then(urls => {
      setImages(prev => [...urls, ...prev]);
      setCurrent({ img: urls[0], mem: memories[Math.floor(Math.random()*memories.length)] });
    });
  }

  function onFileChange(e) {
    handleFiles(e.target.files);
  }

  function downloadCurrent() {
    const a = document.createElement('a');
    a.href = current.img;
    a.download = 'tease-image.jpg';
    a.click();
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-50 to-indigo-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold mb-4 text-pink-700">กวนแฟน (Tease App)</h1>
      <p className="mb-4 text-sm text-gray-600">ลากรูปที่ต้องการลงด้านล่าง หรือกดปุ่มเพื่อสุ่มความทรงจำกวนๆ</p>

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-6">
        <div className="flex gap-4 items-center mb-4">
          <button
            onClick={() => { pickRandom(); }}
            className="px-4 py-2 rounded-full bg-pink-500 text-white font-semibold shadow hover:scale-105 transform transition">
            {teasePhrases[Math.floor(Math.random()*teasePhrases.length)]}
          </button>

          <button
            onClick={() => setMode(m => m === 'soft' ? 'hard' : 'soft')}
            className="px-3 py-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100">
            โหมด: {mode === 'soft' ? 'กวนเล็กๆ' : 'กวนหนัก!'}
          </button>

          <label className="ml-auto flex items-center gap-2">
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={onFileChange} />
            <button onClick={() => fileInputRef.current.click()} className="px-3 py-2 rounded-lg bg-gray-100">อัปโหลดรูป</button>
          </label>
        </div>

        <div
          onDrop={onDrop}
          onDragOver={e => e.preventDefault()}
          className="grid grid-cols-3 gap-3 mb-4">
          {images.map((src, i) => (
            <div key={i} className={`rounded-xl overflow-hidden shadow-sm transform transition hover:scale-105 relative ${current.img===src ? 'ring-4 ring-pink-200' : ''}`}>
              <img src={src} alt={`img-${i}`} className="w-full h-40 object-cover" />
              <div className="absolute bottom-2 left-2 bg-black/40 text-white text-xs px-2 py-1 rounded">#{i+1}</div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 flex gap-6 items-start">
          <div className="w-2/5">
            <div className={`rounded-2xl overflow-hidden border ${mode==='hard' ? 'border-pink-300 animate-pulse' : 'border-gray-200'}`}>
              <img src={current.img} alt="current" className="w-full h-64 object-cover" />
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={downloadCurrent} className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 text-white">ดาวน์โหลด</button>
              <button onClick={() => navigator.share ? navigator.share({ title: 'Memory', text: current.mem, url: window.location.href }) : alert('Share not supported in browser')} className="px-3 py-2 rounded-lg bg-gray-100">แชร์</button>
            </div>
          </div>

          <div className="w-3/5">
            <div className={`p-4 rounded-xl ${mode==='hard' ? 'bg-pink-50 border border-pink-200' : 'bg-gray-50 border border-gray-100'}`}>
              <h2 className="text-xl font-bold mb-2">ความทรงจำกวนๆ</h2>
              <p className="text-gray-700 mb-4 text-lg">{current.mem}</p>

              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setCurrent({ img: current.img, mem: memories[Math.floor(Math.random()*memories.length)] })} className="px-3 py-2 rounded-full bg-yellow-200">สุ่มข้อความใหม่</button>
                <button onClick={() => pickRandom()} className="px-3 py-2 rounded-full bg-emerald-200">สุ่มรูป+ความทรงจำ</button>
                <button onClick={() => setImages([]) } className="px-3 py-2 rounded-full bg-red-200">ล้างรูปทั้งหมด (ย้ำ)</button>
              </div>

              {mode === 'hard' && (
                <div className="mt-4 p-3 rounded-lg bg-pink-100 border border-pink-200">
                  <p className="font-semibold">กวนหนัก: ชุดคำพูดพิเศษ</p>
                  <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
                    <li>เธอคิดว่าเธอน่ารัก แต่ฉันคิดว่าเธอน่ารักมาก 🤭</li>
                    <li>ถ้าตัวเองเป็นแอป ฉันคงกดติดตามตลอดเวลา</li>
                    <li>ระวังนะ เธอยิ้มแล้วโลกจะหยุดหมุน</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-6 text-xs text-gray-500">คำเตือน: ใช้เพื่อความสนุกเท่านั้น — กวนแบบน่ารักนะ!</footer>
    </div>
  )
}
