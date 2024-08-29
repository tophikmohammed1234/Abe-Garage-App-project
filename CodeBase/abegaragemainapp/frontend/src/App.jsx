import React from "react";
import Header from '../src/markup/components/Header/Header';
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./markup/components/Footer/Footer";
function App() {
	return <Router >
      
		<Header />
		<Footer/>

</Router>
}

export default App;
