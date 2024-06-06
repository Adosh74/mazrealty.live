import SearchBar from '../../components/searchBar/SearchBar';
import './homePage.scss';

function HomePage() {
	return (
		<div className="homePage">
			<div className="HH">
				<div className="textContainer">
					<div className="wrapper">
						<h1 className="title">Find Real Estate & Get Your Dream Place</h1>
						<p>
							Welcome to our real estate app. We are dedicated to helping
							you find your dream home with ease and convenience
						</p>
						<SearchBar />
					</div>
				</div>
				<div className="imgContainer">
					<img src="/bg.png" alt="" />
				</div>
			</div>
			<footer className="footer">
				<div className="container">
					<p>
						&copy; {new Date().getFullYear()} MAZ REALTY. All rights reserved.
					</p>

					<p>
						Contact:
						<a href="mailto:support@mazrealty.live">support@mazrealty.live</a>
					</p>
				</div>
			</footer>
		</div>
	);
}

export default HomePage;
