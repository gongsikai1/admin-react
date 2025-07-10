// import react, { useState } from 'react'
// import { Button } from 'antd'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <Button type="primary">Ant Design Button</Button>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// 顶部新增导入
import react, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from 'antd'
import Home from './pages/Home';
import About from './pages/About';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      {/* 添加导航链接 */}
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={
          // 原JSX内容包裹在Fragment中作为首页
          <>
            {/* 原有代码保持不变... */}
            <div>
              <Button type="primary">Ant Design Button</Button>
              {/* 原有logo和按钮代码... */}
            </div>
            {/* 其他现有元素... */}
          </>
        } />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App