import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DisabledSpecializationsProvider from './providers/DisabledSpecializationKeysProvider.tsx'
import RoleProvider from './providers/RoleProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoleProvider>
      <DisabledSpecializationsProvider>
        <App />
      </DisabledSpecializationsProvider>
    </RoleProvider>
  </StrictMode>
)
