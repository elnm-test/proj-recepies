import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/global.scss'
import ScrollToTop from './components/ScrollToTop';


/****** Store ******/
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

/****** Router ******/
import { HashRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

/****** SwiperJs ******/
// 1. Addtional Modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// 2. Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const history = createBrowserHistory();


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <Router createBrowserHistory={history}>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
