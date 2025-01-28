import './Table.css';
import PropTypes from 'prop-types';


const Button = ({currentPage,changePage,totalPages}) => {
    
    return <div className='buttonContainer'> 
        <button 
            className='button' 
            disabled={!(currentPage>1)} //disable the previous button when currentPage is less than 1
            onClick={() => changePage('prev')} 
        >
                Previous
        </button>
            <p>
                Page {currentPage} of {totalPages}
            </p>
        <button
                className='button' 
                onClick={() => changePage('next')}
                disabled={!(currentPage < totalPages)}  // disable the Next button when currentPage becomes more than totalPage
            >
                Next
        </button>
    </div>
  
};

Button.propTypes={
    changePage: PropTypes.func.isRequired,
      currentPage: PropTypes.number.isRequired,
      totalPages: PropTypes.number.isRequired,
}

export default Button