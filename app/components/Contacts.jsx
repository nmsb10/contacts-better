import React from 'react';
import {Contact} from './Contact.jsx';
import {ContactDetail} from './ContactDetail.jsx';
import axios from 'axios';

export class Contacts extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			allContacts:[],
			favoriteContacts: [{retrieveMes:'retrieving favorite contacts...'}],
			otherContacts: [{retrieveMes:'retrieving other contacts...'}],
			detailedSelection:[],
			detailedArrayLoc:false,
			view:'retrievingContacts'
		};
		this.initializeContactInfo = this.initializeContactInfo.bind(this);
		this.getContactInfo = this.getContactInfo.bind(this);
		this.alphabetizeByLastName = this.alphabetizeByLastName.bind(this);
		this.showOneContact = this.showOneContact.bind(this);
		this.viewAllContacts = this.viewAllContacts.bind(this);
		this.changeFavoriteStatus = this.changeFavoriteStatus.bind(this);
		this.populateContactsArrays = this.populateContactsArrays.bind(this);
	}
	initializeContactInfo(){
		this.getContactInfo().then(function(data){
			//2. ALPHABETIZE ENTIRE CONTACTS LIST
			let allContacts = this.alphabetizeByLastName(data), favContacts = [], otherContacts = [];
			//3. SORT THE ALPHABETIZED ARRAY INTO FAVORITES AND OTHERS (BOTH ARRAYS WILL ALREADY BE ALPHABETIZED)
			//4. SET STATE SO FAVORITES AND OTHER CONTACTS ARE SENT TO CORRECT AREAS OF THE APP
			this.populateContactsArrays(allContacts, favContacts,otherContacts);
			this.setState({
				allContacts: allContacts
			});
		}.bind(this));
	}
	componentDidMount(){
		//1 RETRIEVE CONTACTS DATA
		this.initializeContactInfo();
	}
	getContactInfo(){
		return axios.get('https://s3.amazonaws.com/technical-challenge/v3/contacts.json').then(function(res){
			return res.data;
		});
	}
	alphabetizeByLastName(array){
		//https://www.w3schools.com/js/js_array_sort.asp
		let arr = array;
		arr.sort(function(a,b){
			//find the last names
			//assumes names are separated by a space
			//so first need to replace any '-' with a ' ' (eg Winnie-the-Pooh)
			//https://www.w3schools.com/jsref/jsref_replace.asp
			let nameArrayOne = a.name.replace(/-/g,' ').split(' ');
			let lastNameOne = nameArrayOne[nameArrayOne.length-1].toLowerCase();
			let nameArrayTwo = b.name.replace(/-/g,' ').split(' ');
			let lastNameTwo = nameArrayTwo[nameArrayTwo.length-1].toLowerCase();
			if(lastNameOne < lastNameTwo) {return -1;}
			if(lastNameOne > lastNameTwo) {return 1;}
			return 0;
		});
		return arr;
	}
	showOneContact(type,who){
		//type = favorite or other; who = "id" of the contact
		let selection = [], contacts = this.state.allContacts;
		// indexOf? find?
		//locate index of selected contact in this.state.allContacts array.
		//this loop assumes only one contact has the matching id (ie all contacts have a unique id)
		for(var i = 0; i<contacts.length; i++){
			if(contacts[i].id === who){
				selection.push(this.state.allContacts[i]);
				this.setState({
					detailedSelection: selection,
					detailedArrayLoc:i,
					view: 'oneContact'
				});
				break;
			}
		}
	}
	viewAllContacts(){
		//resort entire list to distribute favorites and other contacts
		let allContacts = this.state.allContacts, favContacts = [], otherContacts = [];
		this.populateContactsArrays(allContacts, favContacts, otherContacts);
	}
	populateContactsArrays(allContacts, favorites, others){
		for(var i = 0; i<allContacts.length; i++){
			if(allContacts[i].isFavorite){
				favorites.push(allContacts[i]);
			}else{
				others.push(allContacts[i]);
			}
		}
		if(favorites.length === 0){
			favorites.push({retrieveMes:'you don\'t have any favorite contacts.'});
		}
		if(others.length === 0){
			others.push({retrieveMes:'you don\'t have any other contacts.'});
		}
		this.setState({
			favoriteContacts: favorites,
			otherContacts: others,
			view: 'displayAllContacts'
		});

	}
	changeFavoriteStatus(id){
		let {detailedSelection, detailedArrayLoc, allContacts} = this.state;
		let newDetSel = detailedSelection, newAllContacts = allContacts;
		//change isFavorite status of detailedSelection
		newDetSel[0].isFavorite = !newDetSel[0].isFavorite;
		//go to allContacts[detailedID] and change isFavorite status
		//detailedArrayLoc is the index of the current detailedSelection in this.state.allContacts, so just change this element only
		newAllContacts[detailedArrayLoc] = newDetSel[0];
		this.setState({
			allContacts: newAllContacts,
			detailedSelection: newDetSel,
		});

		// for(var i = 0; i<newAllContacts.length; i++){
		// 	if(newAllContacts[i].id === newDetSel[0].id){
		// 		newAllContacts[i] = newDetSel[0];
		// 		this.setState({
		// 			allContacts: newAllContacts,
		// 			detailedSelection: newDetSel,
		// 		});
		// 		break;
		// 	}
		// }



		// if(bool){
		// 	//when you want to update an object from this.state
		// 	//first update the one selection to reflect the new favorite status (so appropriate star image shows)
		// 	detSelObjCopy = Object.assign({}, detailedSelection[0], {isFavorite: true});
		// 	//now add this contact to favoriteContacts, then alphabetize
		// 	favoriteContacts.push(detSelObjCopy);
		// 	//update the detailedSelection array:
		// 	newDetSel.push(detSelObjCopy);
		// 	newFavoriteContacts = this.alphabetizeByLastName(favoriteContacts);
		// 	//must update detailedID to reflect new ID of the now not-favorite contact
		// 	for(i = 0; i < newFavoriteContacts.length; i++){
		// 		if(newFavoriteContacts[i].id === contactid){
		// 			newDetailedID = i;
		// 			break;
		// 		}
		// 	}
		// 	//finally remove selected contact from otherContacts;
		// 	newOtherContacts = otherContacts;
		// 	newOtherContacts.splice(detailedID, 1);
		// 	this.setState({
		// 		detailedSelection: newDetSel,
		// 		favoriteContacts: newFavoriteContacts,
		// 		otherContacts: newOtherContacts,
		// 		detailedID: newDetailedID
		// 	});
	}
	render(){
		let {
			favoriteContacts,
			otherContacts,
			detailedSelection,
			view
		} = this.state;
		//let self = this;
		return(
			<div className = 'whole-app'>
				<header className = {view === 'oneContact' ? 'hidden' : 'main-header'}>
					<h1>your contacts</h1>
				</header>
				<h2 className = {view === 'oneContact' ? 'hidden' : 'header-secondary'}><i className="fa fa-check-square font-awesome" aria-hidden="true"></i>favorite contacts</h2>
				< Contact
					contacts = {favoriteContacts}
					view = {view}
					showOneContact = {(id) => this.showOneContact('favorite',id)}
				/>
				<h2 className = {view === 'oneContact' ? 'hidden' : 'header-secondary'}><i className="fa fa-coffee font-awesome" aria-hidden="true"></i>other contacts</h2>
				< Contact
					contacts = {otherContacts}
					view = {view}
					showOneContact = {(id) => this.showOneContact('other',id)}
				/>
				< ContactDetail
					selectedContact = {detailedSelection}
					view = {view}
					viewAllContacts = {() => this.viewAllContacts()}
					changeFavStatus = {(input) => this.changeFavoriteStatus(input)}
				/>
			</div>
		);
	}
}