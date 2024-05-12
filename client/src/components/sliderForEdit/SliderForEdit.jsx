import { useState } from 'react';
import './sliderForEdit.scss';
import toast from 'react-hot-toast';


function Slider({ images  }) {
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

		 const deletePhoto = async () => {
        try {
            // const res = await apiRequest.delete(`/properties/delete-image/${}`);
            if (res.status === 200) {
                toast.success('The property has been deleted', {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
                navigate('/profile');
            } else {
                toast.error('Failed to delete property');
            }
        } catch (error) {
			console.log(error)
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

				{images.slice(0).map((image, index) => (
					<>
					{console.log(image)}
							<div onClick={deletePhoto} className="remove">X</div>
					<img 
						src={image}
						alt=""
						key={index}
						onClick={() => setImageIndex(index)}
						// show only 3 images in small images
						style={{ display: index < 3 ? 'block' : 'none' ,paddingBottom:"60px"}}
					/>
					</>
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
