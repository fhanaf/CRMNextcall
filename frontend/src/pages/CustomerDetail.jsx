import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FileText, X } from 'lucide-react'
import logoImg from '../assets/logo_nextcall.png' // Pastikan import ini tidak hilang jika ada

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// --- HELPER 1: Label Pdays ---
const getPdaysLabel = (days) => {
  const dayNum = parseInt(days);
  if (dayNum === 999 || isNaN(dayNum)) return "Belum pernah dihubungi sebelumnya";
  if (dayNum === 0) return "Hari ini (Baru saja)";
  return `${dayNum} hari yang lalu`;
};

// --- HELPER 2: Format Nomor HP (BARU) ---
const formatPhoneNumber = (phone) => {
  if (!phone) return '-';
  const phoneStr = String(phone); // Ubah ke string dulu
  
  // Jika sudah ada 0 di depan, biarkan. Jika belum, tambahkan 0.
  if (phoneStr.startsWith('0')) return phoneStr;
  return '0' + phoneStr;
};

export default function CustomerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [person, setPerson] = useState(null)
  const [loading, setLoading] = useState(true)

  // State Telepon & Notes
  const [isCalling, setIsCalling] = useState(false)
  const [callStatus, setCallStatus] = useState('idle')
  const [notes, setNotes] = useState('')
  const [showNoteModal, setShowNoteModal] = useState(false)

  // 1. Fetch Data
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`${API_URL}/customers/${id}`);
        const result = await response.json();
        if (response.ok) {
          setPerson(result.data.customer);
        } else {
          console.error("Gagal mengambil data nasabah");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  // 2. Simpan Log
  const saveLog = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`${API_URL}/customers/${id}/interaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: notes, userId: userId })
      })

      if (response.ok) {
        alert(`✅ Interaksi Tersimpan! Status nasabah diperbarui.`)
        setIsCalling(false)
        setCallStatus('idle')
        setNotes('')
        window.location.reload(); 
      }
    } catch (error) {
      alert('Gagal menghubungi server.')
    }
  }

  // Helper Warna Ekonomi
  const getEconomicColor = (val) => {
    if (!val) return '#999';
    const lower = val.toLowerCase();
    if (lower.includes('stabil') || lower.includes('optimis') || lower.includes('membaik')) return '#12b76a';
    if (lower.includes('buruk') || lower.includes('pesimis') || lower.includes('tinggi')) return '#e74c3c';
    return '#f39c12';
  };

  // --- RENDER ---
  if (loading) return <div className="p-5 text-center">Memuat data profil...</div>
  if (!person) return <div className="p-5 text-center">Data nasabah tidak ditemukan.</div>

  const startCall = () => {
    setIsCalling(true);
    setCallStatus('ringing');
    setTimeout(() => setCallStatus('connected'), 2000);
  };
  const endCall = () => setCallStatus('ended');

  return (
    <div>
      {/* Header */}
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="page-title">Detail Nasabah</div>
        <button className="btn ghost" onClick={() => navigate('/dashboard/customers')}>Kembali</button>
      </div>

      {/* Modal Telepon */}
      {isCalling && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 100,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div className="card" style={{ width: 400, padding: 30, textAlign: 'center' }}>
            {callStatus === 'ringing' && (
              <div className="animate-pulse">
                <h3>Menghubungi {person.name}...</h3>
                
                {/* TAMPILKAN NOMOR HP YANG SUDAH DIFORMAT DI MODAL JUGA */}
                <p>{formatPhoneNumber(person.phone)}</p>
                
              </div>
            )}
            {callStatus === 'connected' && (
              <div>
                <h3 style={{ color: '#12b76a' }}>Terhubung</h3>
                <p>Durasi: Berjalan...</p>
                <textarea
                  style={{ width: '100%', marginTop: 15, padding: 10 }}
                  rows={3}
                  placeholder="Catatan panggilan..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
                <button className="btn primary" style={{ background: '#e74c3c', marginTop: 15, width: '100%' }} onClick={endCall}>Akhiri</button>
              </div>
            )}
            {callStatus === 'ended' && (
              <div>
                <h3>Panggilan Selesai</h3>
                <button className="btn primary" onClick={saveLog}>Simpan Log</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Catatan */}
      {showNoteModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 110,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
           <div className="card" style={{ width: 450, padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb' }}>
                  <h3 style={{ margin: 0, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FileText size={18}/> Catatan Terakhir
                  </h3>
                  <button onClick={() => setShowNoteModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
                    <X size={20} />
                  </button>
              </div>
              <div style={{ padding: 25, lineHeight: '1.6', color: '#374151', minHeight: 100, maxHeight: 400, overflowY: 'auto' }}>
                  {person.last_note ? (
                    <div style={{ whiteSpace: 'pre-wrap' }}>{person.last_note}</div>
                  ) : (
                    <div style={{ color: '#9ca3af', fontStyle: 'italic', textAlign: 'center', padding: 20 }}>
                      Belum ada catatan interaksi sebelumnya.
                    </div>
                  )}
              </div>
              <div style={{ padding: '15px 20px', borderTop: '1px solid #eee', textAlign: 'right', background: '#fff' }}>
                  <button className="btn primary" onClick={() => setShowNoteModal(false)}>Tutup</button>
              </div>
           </div>
        </div>
      )}

      {/* Grid Konten */}
      <div className="grid">

        <div className="col-8">
          <div className="card profile-card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Informasi Pribadi</h3>
              {person.contacted === 1 && <span className="badge high">Sudah Dihubungi</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 15 }}>
              <div>
                <div style={{ color: '#666', fontSize: 13 }}>Nama Lengkap</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{person.name}</div>
                <div style={{ color: '#666', fontSize: 13, marginTop: 12 }}>Pekerjaan</div>
                <div style={{ fontWeight: 700 }}>{person.job}</div>
                <div style={{ color: '#666', fontSize: 13, marginTop: 12 }}>Pendidikan</div>
                <div style={{ fontWeight: 700 }}>{person.education}</div>
              </div>
              <div>
                <div style={{ color: '#666', fontSize: 13 }}>Status Pernikahan</div>
                <div style={{ fontWeight: 700 }}>{person.marital}</div>
                <div style={{ color: '#666', fontSize: 13, marginTop: 12 }}>Usia</div>
                <div style={{ fontWeight: 700 }}>{person.age} Tahun</div>
                
                {/* --- UPDATE BAGIAN INI: GUNAKAN HELPER --- */}
                <div style={{ color: '#666', fontSize: 13, marginTop: 12 }}>Nomor HP</div>
                <div style={{ fontWeight: 700 }}>
                   {formatPhoneNumber(person.phone)}
                </div>
                {/* ----------------------------------------- */}

              </div>
            </div>

            <div className="action-row" style={{ marginTop: 30, borderTop: '1px solid #eee', paddingTop: 20 }}>
              <button className="btn primary" onClick={startCall}>Call Now</button>
            </div>
          </div>

          <div className="card" style={{ marginTop: 20 }}>
            <h3>Riwayat Kampanye</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 15 }}>
              <div style={{ background: '#f9fafb', padding: 10, borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: '#666' }}>Kampanye Saat Ini</div>
                <div style={{ fontWeight: 'bold' }}>{person.campaign}x Dihubungi</div>
              </div>
              <div style={{ background: '#f9fafb', padding: 10, borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: '#666' }}>Kampanye Sebelumnya</div>
                <div style={{ fontWeight: 'bold' }}>{person.previous}x Dihubungi</div>
              </div>
              <div style={{ background: '#f9fafb', padding: 10, borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: '#666' }}>Hasil Sebelumnya</div>
                <div style={{ fontWeight: 'bold', color: person.poutcome === 'success' ? '#12b76a' : '#666' }}>
                  {person.poutcome || '-'}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 15, fontSize: 13, color: '#666', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>Terakhir dihubungi: <b>{getPdaysLabel(person.pdays)}</b></span>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 5 }}>Probabilitas Subscribe</div>
            <div style={{
              fontSize: 42, fontWeight: 800,
              color: parseFloat(person.score) > 80 ? '#12b76a' : parseFloat(person.score) > 50 ? '#f39c12' : '#e74c3c'
            }}>
              {parseFloat(person.score).toFixed(1)}%
            </div>
            <div style={{ marginTop: 5 }}>
              <span className={`badge ${parseFloat(person.score) > 80 ? 'high' : parseFloat(person.score) > 50 ? 'medium' : 'low'}`}>
                {parseFloat(person.score) > 80 ? 'High' : parseFloat(person.score) > 50 ? 'Medium' : 'Low'} Potential
              </span>
            </div>
          </div>

          <div className="card" style={{ marginTop: 20 }}>
            <h4 style={{ marginBottom: 15 }}>Kondisi Makro Ekonomi</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ padding: 10, border: '1px solid #eee', borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: '#666' }}>Kondisi Lapangan Kerja</div>
                <div style={{ fontWeight: 'bold', color: getEconomicColor(person.emp_rate) }}>
                  {person.emp_rate || 'Data Tidak Ada'}
                </div>
              </div>
              <div style={{ padding: 10, border: '1px solid #eee', borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: '#666' }}>Kepercayaan Konsumen</div>
                <div style={{ fontWeight: 'bold', color: getEconomicColor(person.conf_idx) }}>
                  {person.conf_idx || 'Data Tidak Ada'}
                </div>
              </div>
              <div style={{ padding: 10, border: '1px solid #eee', borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: '#666' }}>Tingkat Inflasi/Harga</div>
                <div style={{ fontWeight: 'bold', color: getEconomicColor(person.price_idx) }}>
                  {person.price_idx || 'Data Tidak Ada'}
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
            <div style={{ fontWeight: 'bold', fontSize: 15, color: '#374151' }}>Catatan Terakhir</div>
            <button 
                onClick={() => setShowNoteModal(true)}
                className="btn ghost" 
                style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #e5e7eb', padding: '8px 16px' }}
            >
                <FileText size={16} /> Buka
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}