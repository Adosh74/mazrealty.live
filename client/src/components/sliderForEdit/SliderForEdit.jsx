import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import './sliderForEdit.scss';

function Slider({ images, propertyId }) {
	const [imageIndex, setImageIndex] = useState(null);
	const navigate = useNavigate();

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

	const deletePhoto = async (img) => {
		const imgName = img.split('properties/')[1];

		try {
			await apiRequest.patch(`/properties/delete-image/${propertyId}`, {
				image: imgName,
			});
			toast.success('The image has been deleted', {
				style: {
					borderRadius: '10px',
					background: '#333',
					color: '#fff',
				},
			});
			// rerender edit property page
			// navigate(`/edit/property/${propertyId}`);
			// navigate not working, so I used window.location.reload()
			window.location.reload();
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
		}
	};

	return (
		<div className="sliderForEdit">
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
				{/* {images &&
					images.length > 0 &&
					Array.from(images).map((image, index) => (
						<img
							key={index}
							src={URL.createObjectURL(image)}
							alt="property"
						/>
					))} */}

				{images.map((image, index) => (
					<div key={index}>
						<div onClick={() => deletePhoto(image)} className="remove">
							X
						</div>
						<img
							src={image}
							alt=""
							onClick={() => setImageIndex(index)}
							// show only 3 images in small images
							style={{
								display: index < 3 ? 'block' : 'none',
								paddingBottom: '60px',
							}}
						/>
					</div>
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
