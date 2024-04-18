import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const InputSearch = () => {
  const searchRef = useRef();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e?.preventDefault();
    const keyword = searchRef.current.value;

    if(keyword.trim() === '' || keyword.length < 3) return;
    navigate(`/search/${keyword}`);
  };

  return (
    <>
      <div className="d-flex justify-content-end gap-2 col-8 col-md-6 col-xl-3 col-xxl-2 mx-auto mx-xl-3 me-xl-auto mb-3 mb-xl-0" role="search">
        <input className="form-control pe-5" type="search" placeholder="Cari..." aria-label="Search" ref={searchRef} onKeyDown={(e) => {
        if(e.key === 'Enter') {
          handleSearch();
        }
      }} />
        <button className="btn btn-success position-absolute" onClick={handleSearch}>
          <i className="bi bi-search"></i>
        </button>
      </div>
    </>
  );
};

export default InputSearch;
