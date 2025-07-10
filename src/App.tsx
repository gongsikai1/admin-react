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
// import react, { useState } from 'react'
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { Button } from 'antd'
// import { useSelector, useDispatch } from 'react-redux';
// import { increment } from './features/counter/counterSlice';
// import Home from './pages/Home';
// import About from './pages/About';
// import type { RootState, AppDispatch } from './app/store';

// function App() {
//   // const [count, setCount] = useState(0)
//   const count = useSelector((state: RootState) => state.counter.value);
//   const dispatch = useDispatch<AppDispatch>();

//   return (
//     <Router>
//       {/* 添加导航链接 */}
//       <nav>
//         <Link to="/">Home</Link> | 
//         <Link to="/about">About</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={
//           <>
//             <div>
//               <Button type="primary" onClick={() => dispatch(increment())}>
//                 Count: {count}
//               </Button>
//               {/* 其他现有元素... */}
//             </div>
//           </>
//         } />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App

import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, type MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  
  // 修改点击事件处理
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(`/${e.key}`); // 根据菜单key跳转对应路由
  };

  // 自动根据路径高亮菜单（将路径去掉斜杠得到key）
  const currentKey = location.pathname.replace('/', '');

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={onClick}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 1160,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Content */}
          <Routes>
            <Route path="/1" element={<Page1 />} />
            <Route path="/2" element={<Page2 />} />
            <Route path="/3" element={<Page3 />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;