import React from 'react';

const Contact = () =>{
  let navigate = useNavigate()

  useEffect(() => {
    const userInfo = localStorage.getItem("jwt");
    if (!userInfo){
      navigate("/login")
    }
  }, [navigate]);
  return (
      <h1>CONTACT</h1>
  );
}
export default Contact;