import React, { useState } from 'react';
//import { MenuItems } from './MenuItems';
import './Dropdown.css';
import { Link } from 'react-router-dom';

const MenuItems = [
	{
		title: 'showCnt',
		cName: 'dropdown-link'
	},
	{
		title: 'getValues',
		cName: 'dropdown-link'
	}
];

function Dropdown() {
	const [click, setClick] = useState(false);

	const handleClick = () => setClick(!click);

	return (
		<>
		  <ul
		    onClick={handleClick}
		    className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
		    >
		    {MenuItems.map((item, index) => {
			return (
				<li key={index}>
				      {item.title}
				</li>
			);
		})}
		</ul>
              </>
	);
}

export default Dropdown;
