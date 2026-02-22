import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';

const data = [
    { name: 'Mon', calls: 40, success: 24 },
    { name: 'Tue', calls: 30, success: 18 },
    { name: 'Wed', calls: 55, success: 35 },
    { name: 'Thu', calls: 80, success: 44 },
    { name: 'Fri', calls: 60, success: 38 },
    { name: 'Sat', calls: 20, success: 10 },
    { name: 'Sun', calls: 10, success: 5 },
];

const pieData = [
    { name: 'High Priority', value: 400 },
    { name: 'Medium', value: 300 },
    { name: 'Low', value: 300 },
];
const COLORS = ['#12b76a', '#f39c12', '#e74c3c'];

export default function Analytics() {
    return (
        <div className="analytics-page">
            <div className="header">
                <div className="page-title">Performance Analytics</div>
            </div>

            <div className="grid">
                <div className="col-8">
                    <div className="card">
                        <h3 style={{ marginBottom: 20 }}>Weekly Call Performance</h3>
                        <div style={{ height: 300, width: '100%' }}>
                            <ResponsiveContainer>
                                <AreaChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="calls" stroke="#667eea" fillOpacity={1} fill="url(#colorCalls)" strokeWidth={2} />
                                    <Area type="monotone" dataKey="success" stroke="#12b76a" fillOpacity={1} fill="url(#colorSuccess)" strokeWidth={2} />
                                    <defs>
                                        <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#667eea" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#12b76a" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#12b76a" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="col-4">
                    <div className="card" style={{ height: '100%' }}>
                        <h3 style={{ marginBottom: 20 }}>Lead Segmentation</h3>
                        <div style={{ height: 300, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="col-12" style={{ marginTop: 20 }}>
                    <div className="card">
                        <h3 style={{ marginBottom: 15 }}>Detailed Stats</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Metric</th>
                                    <th>Current Week</th>
                                    <th>Last Week</th>
                                    <th>Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Total Calls Made</td>
                                    <td>295</td>
                                    <td>240</td>
                                    <td style={{ color: '#12b76a', fontWeight: 600 }}>+22.9%</td>
                                </tr>
                                <tr>
                                    <td>Successful Conversions</td>
                                    <td>169</td>
                                    <td>120</td>
                                    <td style={{ color: '#12b76a', fontWeight: 600 }}>+40.8%</td>
                                </tr>
                                <tr>
                                    <td>Average Duration</td>
                                    <td>2m 15s</td>
                                    <td>1m 50s</td>
                                    <td style={{ color: '#667eea', fontWeight: 600 }}>+22.7%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
