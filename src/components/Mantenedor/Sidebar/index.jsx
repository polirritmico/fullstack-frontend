import EntityHeader from "./EntityHeader";

function Sidebar({ title, data }) {
  return (
    <div className="col-12 col-md-4 col-lg-3 col-xl-3 col-xxl-2 bg-white p-0 border-end">
      <EntityHeader title={title} />

      <div className="border-top d-flex flex-column py-2">
        <div className="panel-roles pt-2 d-md-flex flex-md-column gap-2 gap-md-0">
          {data.map((entity) => (
            <button type="button" className="btn rounded-0">
              <span>{entity.icon}</span>
              <span>{entity.name}</span>
              <span>{entity.amount}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
