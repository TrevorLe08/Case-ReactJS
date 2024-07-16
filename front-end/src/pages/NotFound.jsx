import React from 'react'

export default function NotFound() {
    return (
        <div className='not-found' style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rbg(68,68,68)',
            minHeight: '100vh',
            
        }}>
            <h2 style={{fontSize: '50px',margin: 0}}>404</h2>
            <h2 style={{fontSize: '20px'}}>Page Not Found</h2>
        </div>
    )
}
