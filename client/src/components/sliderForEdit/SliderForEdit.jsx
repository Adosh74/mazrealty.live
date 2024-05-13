import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import './sliderForEdit.scss';

function SliderForEdit({ images, propertyId }) {
	const [imageIndex, setImageIndex] = useState(null);
	const navigate = useNavigate();
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

	const deleteImage = async (img,index ) => {
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
			// window.location.reload();
			const updatedImages = [...galleryImages];
            updatedImages.splice(index, 1);
            setGalleryImages(updatedImages);
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
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
 <div className="image-gallery-container">
      <div className="image-gallery">
        {galleryImages.map((imageUrl, index) => (
          <div key={index} className="image-wrapper">
            <img src={imageUrl} alt={`Image ${index}`} onClick={() => setImageIndex(index )}
						// show only 3 images in small images
					/>
            <button className="delete-btn" onClick={() => deleteImage(imageUrl,index)}>X</button>
          </div>
        ))}
      </div>
    </div>
		</div>
	);
}

export default SliderForEdit;
