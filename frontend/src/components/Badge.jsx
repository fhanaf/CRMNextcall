import React from 'react'
export default function Badge({level='low'}){
  const cls = level==='high' ? 'badge high' : level==='medium' ? 'badge medium' : 'badge low'
  const label = level==='high' ? 'High' : level==='medium' ? 'Medium' : 'Low'
  return <span className={cls}>{label}</span>
}
