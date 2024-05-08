import { useState } from 'react';
import './slider.scss';

function Slider({ images }) {
	const [imageIndex, setImageIndex] = useState(null);

	const changeSlide = (direction) => {
		if (direction === 'left') {
			if (imageIndex === 0) {
				setImageIndex(images.length - 1);
			} else {
				setImageIndex(imageIndex - 1);
			}
		} else {
			if (imageIndex === images.length - 1) {
				setImageIndex(0);
			} else {
				setImageIndex(imageIndex + 1);
			}
		}
	};

	return (
		<div className="slider">
			{imageIndex !== null && (
				<div className="fullSlider">
					<div className="arrow" onClick={() => changeSlide('left')}>
						<img src="/arrow.png" alt="" />
					</div>
					<div className="imgContainer">
						<img src={images[imageIndex]} alt="" />
					</div>
					<div className="arrow" onClick={() => changeSlide('right')}>
						<img src="/arrow.png" className="right" alt="" />
					</div>
					<div className="close" onClick={() => setImageIndex(null)}>
						X
					</div>
				</div>
			)}
			<div className="bigImage">
				<img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
			</div>
			<div className="smallImages">
				{images.slice(1).map((image, index) => (
					<img
						src={image}
						alt=""
						key={index}
						onClick={() => setImageIndex(index + 1)}
						// show only 3 images in small images
						style={{ display: index < 3 ? 'block' : 'none' }}
					/>
				))}
				{images.length > 4 && (
					<div className="moreImages">
						<p>+{images.length - 4}</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default Slider;
