import { useState } from 'react';
import toast from 'react-hot-toast';
import apiRequest from '../../lib/apiRequest';
import './sliderForEdit.scss';

function SliderForEdit({ images, propertyId }) {
	const [imageIndex, setImageIndex] = useState(null);
	const [galleryImages, setGalleryImages] = useState(images);

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

	// if image has properties in the name

	const deleteImage = async (img, index) => {
		if (window.confirm('Are you sure you want to delete this Photo?')) {
			const imgName = img.includes('properties')
				? img.split('properties/')[1]
				: img;
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
				const updatedImages = [...galleryImages];
				updatedImages.splice(index, 1);
				setGalleryImages(updatedImages);
				// window.location.reload();
			} catch (error) {
				console.log(error);
				toast.error('Something went wrong');
			}
		}
	};

	return (
		<div className="image-gallery-container">
			{imageIndex !== null && (
				<div className="fullSlider">
					<div className="arrow" onClick={() => changeSlide('left')}>
						<img src="/arrow.png" alt="" />
					</div>
					<div className="imgContainer">
						<img src={galleryImages[imageIndex]} alt="" />
					</div>
					<div className="arrow" onClick={() => changeSlide('right')}>
						<img src="/arrow.png" className="right" alt="" />
					</div>
					<div className="close" onClick={() => setImageIndex(null)}>
						X
					</div>
				</div>
			)}
			{galleryImages.length > 0 && (
				<div className="image-gallery">
					{galleryImages.map((imageUrl, index) => (
						<div key={index} className="image-wrapper">
							<img
								src={imageUrl}
								alt={`Image ${index}`}
								onClick={() => setImageIndex(index)}
							/>
							<button
								className="delete-btn"
								onClick={() => deleteImage(imageUrl, index)}
							>
								X
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default SliderForEdit;
