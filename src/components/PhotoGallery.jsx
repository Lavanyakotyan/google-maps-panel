export default function PhotoGallery({ photos }) {
  return (
    <div className="photo-gallery">
      {photos.map((photo, i) => (
        <img key={i} src={photo} alt={`place-${i}`} />
      ))}
    </div>
  );
}
