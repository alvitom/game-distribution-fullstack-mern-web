import InputSearch from "./InputSearch";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-xl">
      <div className="container-fluid mx-xl-4 my-xl-2">
        <a className="navbar-brand" href="/">
          Alvito Games Store
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-xl-auto my-3 my-lg-0 gap-1 gap-xl-0">
            <li className="nav-item">
              <a className="nav-link btn btn-secondary" href="">
                STORE
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn btn-secondary" href="">
                Distribusi
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn btn-secondary" href="">
                Bantuan
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn btn-secondary" href="">
                Unreal Engine
              </a>
            </li>
          </ul>
          <InputSearch />
          <div className="d-flex flex-column flex-xl-row justify-content-center justify-content-xl-end gap-3 col-6 col-md-4 col-xxl-3 mx-auto mx-xl-0 mb-3 mb-xl-0" role="search">
            <button className="btn btn-outline-light">
              <i class="bi bi-globe"></i> Bahasa
            </button>
            <button className="btn btn-outline-light">
              <i class="bi bi-person-circle"></i> Login
            </button>
            <button className="btn btn-success">
              <i class="bi bi-download"></i> Unduh
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
