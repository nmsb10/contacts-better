import './styles/app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Contacts} from './components/Contacts.jsx';
//import { router } from './config/routes';


const mountingPoint = document.getElementById('app');
ReactDOM.render(< Contacts />, mountingPoint);