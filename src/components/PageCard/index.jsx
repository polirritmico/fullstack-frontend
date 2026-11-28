import { Link } from "react-router";

function PageCard({ title, to, img, children, alt, btnText = "Ingresar" }) {
  return (
    <div className="col-12 col-lg-5 col-xl-4 mb-4">
      <div className="card shadow h-100 rounded-10p">
        <img src={img} className="card-img-top card-img-top-css" alt={alt} />

        <div className="card-body d-flex flex-column align-items-center">
          <h1 className="card-title texto-fuerte">{title}</h1>
          <p className="card-text opacity-75 text-center">{children}</p>

          <Link to={to} className="btn btn-primary">
            {btnText}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageCard;
