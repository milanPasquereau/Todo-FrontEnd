import Page from './components/page/Page';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App(){

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Page filter={'All'}/>} />
                <Route path="/active" element={<Page filter={'Active'}/>} />
                <Route path="/completed" element={<Page filter={'Completed'}/>} />
            </Routes>
        </BrowserRouter>
    ) 
}

export default App;
