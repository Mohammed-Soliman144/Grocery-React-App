import React from 'react'
import {Fragment} from 'react'
// import Header from './assets/components/header/Header'
// import Footer from './assets/components/footer/Footer'
// import MainContent from './assets/components/main/MainContent'
// import { ShoppingProvider } from './assets/components/main/ShoppingContext'
// // Custom Hook To Handle ScrollIntoView API
// import { useIntoView } from './hooks/useIntoView'

import Header from './assets/components/features/header/Header'
import Footer from './assets/components/features/footer/Footer'
import MainContent from './assets/components/features/main/MainContent'
import { ShoppingProvider } from './assets/components/features/main/ShoppingContext'
// Custom Hook To Handle ScrollIntoView API
import { useIntoView } from './assets/hooks/useIntoView'

export default function App(): React.JSX.Element {
  // Custom Hook To Handle ScrollIntoView API
  useIntoView();
  return (
    <Fragment>
      <div className="container">
            <ShoppingProvider>
              <Header />
              <main>
                <MainContent />
              </main>
            </ShoppingProvider>
            <Footer />
      </div>
    </Fragment>
  )
}