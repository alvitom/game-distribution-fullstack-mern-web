const HeaderList = ({ title, linkHref, linkTitle }) => {
    return (
      <>
      {linkHref && linkTitle ? (
        <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-light">{title}</h3>
        <a href={linkHref} className="btn btn-outline-light">
            {linkTitle}
          </a>
          </div>
      ) : (
        <h1 className="text-light text-center mb-4">{title}</h1>
      )}
      </>
    );
  };
  
  export default HeaderList;
  