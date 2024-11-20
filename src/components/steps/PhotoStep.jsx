import React, { useState, useRef } from 'react';
import { Box, Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const PhotoStep = ({ formProps }) => {
  const { setFieldValue, values } = formProps;
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState();
  const [openCrop, setOpenCrop] = useState(false);
  const imgRef = useRef(null);
  const inputRef = useRef(null);

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result);
        setOpenCrop(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const getCroppedImg = async (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg');
    });
  };

  const handleCropComplete = async () => {
    if (imgRef.current && crop) {
      const croppedImageBlob = await getCroppedImg(imgRef.current, crop);
      const croppedImageFile = new File([croppedImageBlob], 'cropped.jpg', { type: 'image/jpeg' });
      setFieldValue('photo', croppedImageFile);
      setOpenCrop(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: 200,
          height: 200,
          border: '2px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          backgroundImage: values.photo ? `url(${URL.createObjectURL(values.photo)})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        role="img"
        aria-label="Photo preview"
      >
        {!values.photo && 'Preview'}
      </Box>
      <Button
        variant="contained"
        component="label"
        aria-label="Upload Photo"
      >
        Upload Photo
        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={handlePhotoChange}
          id="photo-upload"
          aria-label="Upload photo input"
        />
      </Button>

      <Dialog
        open={openCrop}
        maxWidth="md"
        onClose={() => setOpenCrop(false)}
        aria-labelledby="crop-dialog-title"
      >
        <DialogContent>
          {imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              aspect={1}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                onLoad={onImageLoad}
                style={{ maxHeight: '70vh' }}
                alt="Crop preview"
              />
            </ReactCrop>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCrop(false)}>Cancel</Button>
          <Button onClick={handleCropComplete} variant="contained">
            Crop & Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PhotoStep;
