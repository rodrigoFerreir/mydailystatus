import React from 'react';
import '../styles/styles.css';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const App = ({ Component, pageProps }) => {
    return (
        <div>
            <Header />
            <NavBar />
            <div className="min-h-screen container mx-auto">
                <Component {...pageProps} />
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}

export default App;