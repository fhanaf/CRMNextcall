import React from 'react'
import { Link } from 'react-router-dom'
import Badge from './Badge'
import { CheckCircle, Clock } from 'lucide-react'

export default function TableRow({ item }) {
  const scoreNum = parseFloat(item.score);
  
  // --- PERBAIKAN DI SINI ---
  // JANGAN hitung manual (if score > 80...). 
  // Ambil langsung dari kategori database (item.prediction)
  
  let statusLevel = 'low'; // Default
  
  // Mapping dari Database ke Tampilan Badge
  if (item.prediction === 'potensial_besar') {
      statusLevel = 'high';
  } else if (item.prediction === 'potensial_kecil') {
      statusLevel = 'medium';
  } else if (item.prediction === 'rendah') {
      statusLevel = 'low';
  }
  // -------------------------

  const isContacted = item.contact_status === 1;

  return (
    <tr>
      <td style={{fontWeight: 500}}>{item.name}</td>
      <td>{item.age}</td>
      <td style={{textTransform: 'capitalize'}}>{item.job}</td>
      
      <td style={{textTransform: 'capitalize'}}>
        <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', background: '#f3f4f6', color: '#4b5563' }}>
          {item.marital}
        </span>
      </td>

      <td style={{textTransform: 'capitalize'}}>
        {item.education ? item.education.replace(/\./g, ' ') : '-'}
      </td>

      {/* Status Telepon */}
      <td>
        {isContacted ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, background: '#dcfce7', color: '#166534' }}>
            <CheckCircle size={12} /> Sudah
          </span>
        ) : (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: '20px', fontSize: '12px', fontWeight: 500, background: '#fee2e2', color: '#991b1b' }}>
            <Clock size={12} /> Belum
          </span>
        )}
      </td>

      {/* Skor & Badge */}
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Nilai probabilitas TETAP ditampilkan (sudah benar) */}
          <div style={{ fontWeight: 700, width: '45px' }}>{scoreNum.toFixed(1)}%</div>
          
          {/* Badge sekarang mengikuti kategori asli dari DB */}
          <Badge level={statusLevel} />
        </div>
      </td>

      <td>
        <Link to={`/dashboard/customers/${item.id}`} style={{color:'#0b66ff', textDecoration:'none', fontWeight:500}}>
          View Detail
        </Link>
      </td>
    </tr>
  )
}