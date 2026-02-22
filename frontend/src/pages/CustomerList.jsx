import React, { useState, useEffect } from 'react'
import TableRow from '../components/TableRow'

// Konfigurasi API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- STATE FILTER ---
  const [search, setSearch] = useState('');
  const [filterJob, setFilterJob] = useState('All');
  const [filterLevel, setFilterLevel] = useState('All'); // <-- FILTER BARU (SKOR)
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // 1. Debounce Search (Agar tidak lag saat mengetik)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // 2. Fetch Data (Logic Filter)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Susun Parameter Query
        const queryParams = new URLSearchParams({
            q: debouncedSearch,
            job: filterJob,
            level: filterLevel // Kirim parameter level ke backend
        }).toString();

        const response = await fetch(`${API_URL}/customers?${queryParams}`);
        const result = await response.json();

        if (response.ok) {
          setCustomers(result.data.customers || []);
        } else {
          console.error("Gagal:", result.message);
        }
      } catch (error) {
        console.error("Error Koneksi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearch, filterJob, filterLevel]); // Reload saat filter berubah

  return (
    <div>
      <div className="header">
        <div className="page-title">Daftar Nasabah</div>
      </div>

      <div className="container">
        
        {/* --- BAGIAN FILTER (Gaya Lama yang Rapi) --- */}
        <div className="search-row" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          
          {/* 1. Input Pencarian */}
          <input
            className="input"
            placeholder="Cari nama"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ minWidth: '250px' }}
          />
          
          {/* 2. Dropdown Pekerjaan */}
          <select className="filter" value={filterJob} onChange={e => setFilterJob(e.target.value)}>
            <option value="All">Semua Pekerjaan</option>
            <option value="management">Management</option>
            <option value="technician">Technician</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="admin.">Admin</option>
            <option value="blue-collar">Blue Collar</option>
            <option value="retired">Retired</option>
            <option value="services">Services</option>
            <option value="student">Student</option>
            <option value="unemployed">Unemployed</option>
          </select>

          {/* 3. Dropdown Skor (BARU - Menggunakan style 'filter' yang sama) */}
          <select className="filter" value={filterLevel} onChange={e => setFilterLevel(e.target.value)}>
            <option value="All">Semua Skor</option>
            <option value="High">High </option>
            <option value="Medium">Medium </option>
            <option value="Low">Low </option>
          </select>

        </div>

        {/* --- TABEL DATA --- */}
        {loading ? (
          <p style={{ textAlign: 'center', padding: 20 }}>Memuat data...</p>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Usia</th>
                  <th>Pekerjaan</th>
                  <th>Status</th>
                  <th>Pendidikan</th> 
                  <th>Status Telepon</th>
                  <th>Skor Prediksi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map(customer => <TableRow key={customer.id} item={customer} />)
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: 20 }}>Tidak ada data ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}