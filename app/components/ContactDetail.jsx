import React from 'react';

export class ContactDetail extends React.Component{
	render(){
		let {selectedContact, view} = this.props;
		let viewAllContacts = () => {
			this.props.viewAllContacts();
		};
		let changeFavoriteStatus = (id) => {
			this.props.changeFavStatus(id);
		};
		return(			
			<div className = {view==='oneContact'? 'one-contact':'hidden'}>
			{selectedContact.map(function(contact, i){
			return(
				<div key = {i}>
				<header>
					{/*https://www.w3schools.com/charsets/ref_utf_arrows.asp*/}
					<h2
						className = 'see-all-contacts'
						title = 'view all contacts'
						onClick = {() => viewAllContacts()}
					>&larr; contacts</h2>
					<img
						className = 'favorite-button'
						src = {contact.isFavorite ? 'https://jonathonn.herokuapp.com/assets/images/favoriteStarT3x.png': 'https://jonathonn.herokuapp.com/assets/images/favoriteStarF3x.png'}
						alt = {contact.isFavorite ? 'favorite contact star' : 'other contact star'}
						onClick = {(contactID) => changeFavoriteStatus(contact.id)}
						title = {contact.isFavorite ? 'remove ' + contact.name + ' from favorite contacts' : 'add ' + contact.name + ' to favorite contacts'}
					/>
				</header>
				<div className = 'contact-main-info'>
					{/* if the contact has a large image URL, use the provided URL, otherwise use placeholder image asset*/}
					<img
						className = 'primary-image'
						width = '100px'
						src = {contact.largeImageURL ? contact.largeImageURL : 'https://jonathonn.herokuapp.com/assets/images/userIconLarge3x.png'}
						alt = {contact.largeImageURL ? contact.name : 'user image not available'}
						title = {contact.name ? contact.name : ''}
					/>
					<div className = 'detail-name-company'>
						<h1>{contact.name}</h1>
						<span className = '' title = {contact.name + "'s company name"}>{contact.companyName}</span>
					</div>
				</div>
		
				<div className = {contact.phone.mobile ? 'detail-info' : 'hidden'}>
					<h2>phone:</h2>
					<div className = 'phone-div'>
						<p>{contact.phone.mobile}</p>
						<h3>mobile</h3>
					</div>
				</div>
				<div className = {contact.phone.home ? 'detail-info' : 'hidden'}>
					<h2>phone:</h2>
					<div className = 'phone-div'>
						<p>{contact.phone.home}</p>
						<h3>home</h3>
					</div>
				</div>
				<div className = {contact.phone.work ? 'detail-info' : 'hidden'}>
					<h2>phone:</h2>
					<div className = 'phone-div'>
						<p>{contact.phone.work}</p>
						<h3>work</h3>
					</div>
				</div>
				<div className = {contact.address ? 'detail-info' : 'hidden'}>
					<h2>address:</h2>
					<p>{contact.address.street}</p>
					<p>{contact.address.city}, {contact.address.state} {contact.address.zipCode} | {contact.address.country}</p>
				</div>

				<div className = {contact.birthdate ? 'detail-info' : 'hidden'}>
					<h2>birthdate:</h2>
					<p>{contact.birthdate}</p>
				</div>
				<div className = {contact.emailAddress ? 'detail-info' : 'hidden'}>
					<h2>email:</h2>
					<p>{contact.emailAddress}</p>
				</div>
			</div>
			);
		})
		}
			</div>
		);
	}
}