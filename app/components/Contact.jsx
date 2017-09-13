import React from 'react';

export class Contact extends React.Component{
	render(){
		let {contacts, view} = this.props;
		let contactClicked = (selection) => {
			this.props.showOneContact(selection);
		};
		return(
			<div className = {view === 'oneContact' ? 'hidden' : 'contacts-type-header'}>
				
				{/* only display the retrieving contacts message on page load*/}
				<h2 className = {contacts[0].retrieveMes ? 'retrieving-contacts' : 'hidden'}>{contacts[0].retrieveMes}</h2>
				{/* if contacts array is populated, map contents to contact div*/}
				<ul className = {contacts[0].retrieveMes ? 'hidden' : 'contacts-ul'}>
				{contacts.map(function(contents, i){
					{/* only display the contacts if view is "display all contacts"*/}
					return (
						<li
							key = {i}
							data-contact-id = {contents.id}
							className = {view === 'displayAllContacts' ? 'displayAllContacts': 'hidden'}
							title = {contents.name ? 'view ' + contents.name + "'s full contact information" : ''}
							onClick = {() => contactClicked(contents.id)}
						>
							{/* if the contact has a small image URL, use the provided URL, otherwise use placeholder image asset*/}
							<img
								className = 'small-contact-img'
								src = {contents.smallImageURL ? contents.smallImageURL : 'https://jonathonn.herokuapp.com/assets/images/userIconSmall3x.png'}
								alt = {contents.smallImageURL? contents.name : 'user image not available'}
							/>
							<div className = 'contact-summary-info'>
								<img
									className = {contents.isFavorite ? 'favorite-star-img' : 'hidden'}
									src = 'https://jonathonn.herokuapp.com/assets/images/favoriteStarT3x.png'
									alt = 'star emoji here...'
								/>
								<div className = {contents.isFavorite ? 'name-company' : 'name-company-other-contact'}>
									<h2 className = 'contact-name'>{contents.name}</h2>
									<h3 className = 'contact-company' title = {contents.name + " works at " + contents.companyName}>{contents.companyName}</h3>
								</div>
							</div>
						</li>
					);
				})
				}
				</ul>
			</div>
		);
	}
}