const ErrorMessage = ({children}) => {
    
    return(
        <>
            <div className="bg-red-100 rounded-lg  text-sm text-red-500 mb-2 animate-pulse" role="alert"><div>
                <span className="font-medium mx-auto text-center">{children}</span>
            </div>
        </div>  
    </>
    );
    };
    
    export default ErrorMessage;