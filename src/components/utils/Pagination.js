const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="flex justify-end mt-10 mb-6">
        <nav>
          <ul className="flex gap-5">
            {pageNumbers.map((number) => (
              <li key={number} onClick={() => onPageChange(number)} >
                  <div className={`rounded relative inline-block lg:mt-0 text-xl text-black  py-3 mt-5 text-center group cursor-pointer`}>
                    {number}
                    <div className={`bg-black absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 ${number === currentPage ? 'scale-x-100' : 'scale-x-0'}  transition transition-gpu duration-200`}/>
                  </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  };
  
  export default Pagination