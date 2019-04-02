import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FlashMessagesList from '../flash/FlashMessagesList';

const App = ({ children }) => (
  <>
    <Header />
    <FlashMessagesList />
    <main>
      {children}
    </main>

    <Footer />
  </>
);

export default App;
