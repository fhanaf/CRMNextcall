import React, { useState } from 'react';

export default function Settings() {
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Settings saved successfully');
        }, 1000);
    };

    return (
        <div className="settings-page">
            <div className="header">
                <div className="page-title">Settings</div>
            </div>

            <div className="grid">
                <div className="col-8">
                    {/* Account Settings */}
                    <div className="card" style={{ marginBottom: 20 }}>
                        <h3>Profile Settings</h3>
                        <div className="form-group" style={{ marginTop: 15 }}>
                            <label className="form-label" style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: '#333' }}>Full Name</label>
                            <input type="text" className="input" defaultValue="Eka Pradana" style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd' }} />
                        </div>
                        <div className="form-group" style={{ marginTop: 15 }}>
                            <label className="form-label" style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: '#333' }}>Email Address</label>
                            <input type="email" className="input" defaultValue="eka.sales@nextcall.id" style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd' }} />
                        </div>
                    </div>

                    {/* Notification Settings */}
                    <div className="card">
                        <h3>Notifications</h3>
                        <div style={{ marginTop: 15 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
                                <div>
                                    <div style={{ fontWeight: 500 }}>Email Notifications</div>
                                    <div style={{ fontSize: 12, color: '#666' }}>Receive daily summaries</div>
                                </div>
                                <input type="checkbox" defaultChecked />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
                                <div>
                                    <div style={{ fontWeight: 500 }}>High Priority Leads</div>
                                    <div style={{ fontSize: 12, color: '#666' }}>Instant alert for score &gt; 90</div>
                                </div>
                                <input type="checkbox" defaultChecked />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
                                <div>
                                    <div style={{ fontWeight: 500 }}>Task Reminders</div>
                                    <div style={{ fontSize: 12, color: '#666' }}>Remind me 10 mins before calls</div>
                                </div>
                                <input type="checkbox" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-4">
                    <div className="card">
                        <h3>System Status</h3>
                        <div style={{ marginTop: 15 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                                <span style={{ color: '#666' }}>Machine Learning Model</span>
                                <span style={{ color: '#12b76a', fontWeight: 600 }}>Active v2.1</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                                <span style={{ color: '#666' }}>Database Connection</span>
                                <span style={{ color: '#12b76a', fontWeight: 600 }}>Connected</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#666' }}>Last Sync</span>
                                <span>Just now</span>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ marginTop: 20 }}>
                        <button
                            className="btn primary"
                            style={{ width: '100%', justifyContent: 'center', height: 44 }}
                            onClick={handleSave}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
