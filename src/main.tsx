import {createRoot} from 'react-dom/client'
import {StrictMode} from 'react'
// npm install react-router
// import {BrowserRouter} from 'react-router'
import {BrowserRouter} from 'react-router'
import App from './App'


const root = createRoot(document.getElementById('root')!);


root.render(
  <StrictMode>
    {/* use <BrowserRouter> Than Wrap Your App Component inside it </BrowserRouter> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);