import "@/styles/shared/nosotros.css";

function FotoPolaroid({ photo, caption, alt }) {
  return (
    <div className="col-12 col-md-8 col-lg-5 order-2 order-lg-1">
      <figure className="foto-polaroid bg-white p-2 p-md-3 pb-3 pb-md-4 shadow-lg rounded-1 mb-0 mx-auto text-center">
        <img src={photo} className="img-fluid w-100" alt={alt} />
        <figcaption className="text-dark fs-3 mt-2 mb-0 font-handwritten">
          {caption}
        </figcaption>
      </figure>
    </div>
  );
}

export default FotoPolaroid;
