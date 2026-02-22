import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, X, Save, Edit } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Dashboard() {
  const navigate = useNavigate()
  
  // State Data
  const [highPriorityList, setHighPriorityList] = useState([])
  const [stats, setStats] = useState({ total: 0, called: 0 })
  const [loading, setLoading] = useState(true)
  const [userInitials, setUserInitials] = useState('S')
  
  // State Notes
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [myNotes, setMyNotes] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)

  useEffect(() => {
    // 1. Setup User Initials
    const userName = localStorage.getItem('userName') || 'Sales Admin';
    const userId = localStorage.getItem('userId') || 1;
    const names = userName.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) initials += names[names.length - 1].substring(0, 1).toUpperCase();
    setUserInitials(initials);

    const fetchData = async () => {
      try {
        // 2. Fetch Customers
        const custRes = await fetch(`${API_URL}/customers`);
        const custData = await custRes.json();
        
        if (custRes.ok) {
          const allCustomers = custData.data.customers || [];
          setHighPriorityList(allCustomers.slice(0, 4));
          setStats({ 
            total: allCustomers.length, 
            called: allCustomers.filter(c => c.contacted === 1).length 
          });
        }

        // 3. Fetch Notes
        const profileRes = await fetch(`${API_URL}/sales/profile?id=${userId}`);
        const profileData = await profileRes.json();
        if (profileRes.ok) {
           setMyNotes(profileData.data.notes || '');
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Simpan Notes
  const handleSaveNotes = async () => {
    setSavingNotes(true);
    const userId = localStorage.getItem('userId') || 1;
    try {
        await fetch(`${API_URL}/sales/notes`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: userId, notes: myNotes })
        });
        setShowNotesModal(false);
    } catch (error) {
        alert("Gagal menyimpan catatan.");
    } finally {
        setSavingNotes(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      
      {/* HEADER */}
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div className="page-title">Sales Dashboard</div>
          <p style={{ color: '#666', margin: 0 }}>Fokus pada nasabah prioritas tinggi hari ini.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
           <div style={{ 
             width: 40, height: 40, background: '#e0e7ff', borderRadius: '50%', 
             display: 'flex', alignItems: 'center', justifyContent: 'center', 
             fontWeight: 'bold', color: '#4338ca', border: '2px solid #fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
           }}>
              {userInitials}
           </div>
        </div>
      </div>

      <div className="grid">
        
        {/* --- KOLOM KIRI (Worklist) --- */}
        <div className="col-8">
          <div className="card" style={{ height: '100%' }}> {/* Pastikan tinggi mengikuti konten */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3>High Priority Worklist</h3>
              <span className="badge high">{highPriorityList.length} Leads Teratas</span>
            </div>

            {loading ? <p>Memuat data...</p> : highPriorityList.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #f3f4f6', borderRadius: '12px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                  <div style={{ width: 50, height: 50, borderRadius: '50%', background: parseFloat(item.score) > 80 ? '#12b76a' : '#f39c12', color: 'white', fontWeight: 'bold', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {parseFloat(item.score).toFixed(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</div>
                    <div style={{ color: '#666', fontSize: 13, display: 'flex', gap: 5 }}>
                      <span style={{ color: parseFloat(item.score) > 80 ? '#12b76a' : '#f39c12', fontWeight: 600 }}>
                         {parseFloat(item.score) > 80 ? 'High Potential' : 'Medium'}
                      </span>
                      <span>•</span>
                      <span>{item.phone || '-'}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="btn ghost" onClick={() => navigate(`/dashboard/customers/${item.id}`)}>View</button>
                </div>
              </div>
            ))}
            <div style={{ textAlign: 'center', marginTop: 15 }}>
                <span onClick={() => navigate('/dashboard/customers')} style={{ color: '#0b66ff', cursor: 'pointer', fontWeight: 500 }}>Lihat Semua Nasabah</span>
            </div>
          </div>
        </div>

        {/* --- KOLOM KANAN (Widgets) --- */}
        <div className="col-4" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* 1. Progress Telepon */}
          <div className="card" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', color: 'white' }}>
            <div style={{ fontSize: 13, opacity: 0.9 }}>Progress Telepon</div>
            <div style={{ fontSize: 32, fontWeight: 'bold', margin: '10px 0' }}>
               {stats.called} <span style={{ fontSize: 16, fontWeight: 'normal', opacity: 0.8 }}>/ {stats.total} Nasabah</span>
            </div>
            <div style={{ width: '100%', height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 10, overflow: 'hidden' }}>
               <div style={{ height: '100%', background: 'white', width: `${stats.total > 0 ? (stats.called / stats.total) * 100 : 0}%` }}></div>
            </div>
            <div style={{ fontSize: 12, marginTop: 8, opacity: 0.9 }}>
              {stats.total > 0 ? `${((stats.called / stats.total) * 100).toFixed(1)}% target tercapai` : 'Belum ada data'}
            </div>
          </div>

          {/* 2. NOTES LANGSUNG (Dengan Scroll & Fixed Height) */}
          <div className="card" style={{ 
              height: '320px',  // <-- TINGGI DIKUNCI DI SINI (Agar sejajar dengan kiri)
              display: 'flex', 
              flexDirection: 'column' 
          }}>
             {/* Header Notes */}
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, borderBottom: '1px solid #f3f4f6', paddingBottom: 10 }}>
                <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8, color: '#f97316' }}>
                    <FileText size={18} /> Catatan Saya
                </h4>
                <button 
                    onClick={() => setShowNotesModal(true)} 
                    style={{ background: '#fff7ed', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 6, color: '#c2410c' }}
                >
                    <Edit size={16} />
                </button>
             </div>

             {/* Isi Notes dengan SCROLL */}
             <div style={{ 
                 flex: 1, 
                 overflowY: 'auto', // <-- SCROLL OTOMATIS
                 paddingRight: '5px', // Spasi untuk scrollbar
                 fontSize: 14, 
                 color: '#4b5563', 
                 lineHeight: '1.6', 
                 whiteSpace: 'pre-wrap' 
             }}>
                {myNotes ? myNotes : (
                    <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                        Belum ada catatan. Klik tombol edit di kanan atas untuk menulis to-do list atau strategi sales Anda.
                    </span>
                )}
             </div>
          </div>

        </div>
      </div>

      {/* --- MODAL EDIT NOTES --- */}
      {showNotesModal && (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 999,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <div className="card" style={{ width: 500, padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Edit size={20} color="#f97316"/> Edit Catatan
                    </h3>
                    <button onClick={() => setShowNotesModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={20} />
                    </button>
                </div>
                <div style={{ padding: 20 }}>
                    <textarea 
                        value={myNotes}
                        onChange={(e) => setMyNotes(e.target.value)}
                        placeholder="Tulis to-do list atau strategi sales di sini..."
                        style={{ width: '100%', height: 200, padding: 15, border: '1px solid #ddd', borderRadius: 8, resize: 'none', fontFamily: 'inherit', fontSize: 14 }}
                    />
                </div>
                <div style={{ padding: '15px 20px', background: '#f9fafb', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                    <button onClick={() => setShowNotesModal(false)} className="btn ghost">Batal</button>
                    <button onClick={handleSaveNotes} className="btn primary" disabled={savingNotes} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Save size={16} /> {savingNotes ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  )
}