import React from 'react'
import ReactDOM from 'react-dom/client'
import InfiniteScroll from './InfiniteScroll.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <InfiniteScroll />
  </React.StrictMode>,
)
