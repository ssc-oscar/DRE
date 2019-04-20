import React, { Component } from 'react';
import { Container, Row } from "reactstrap";

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FlashMessagesList from '../flash/FlashMessagesList';

const App = ({ children }) => (
  <>
    <div className="main-content">
      <Header />
      <div className="header bg-gradient-default py-6 py-lg-7">
        {/* Page content */}
        <Container className="mt-4 mb-8 pb-5">
          <main>
            {children}
          </main>
        </Container>
      </div>
    </div>
    <Footer />
  </>
);

export default App;
