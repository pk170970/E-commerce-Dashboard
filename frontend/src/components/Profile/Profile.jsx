import React from 'react';
import { useEffect, useState } from 'react';
import './profile.css';

const Profile = () => {

  const [profile, setProfile] = useState({
    email: "",
    firstName: "",
    lastName: ""
  });

  useEffect(()=>{
    getData();
  },[])

  function getData() {
    const data = JSON.parse(localStorage.getItem("user"));
    const { firstName, lastName, email } = data;
    setProfile({
      email: email,
      firstName: firstName,
      lastName: lastName
    });
  }


  return (


    <section>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
              <div className="row g-0">
                <div className="col-md-4 gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem" }}>
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                  <h5>{`${profile.firstName} ${profile.lastName}`}</h5>
                  <p>{profile.email}</p>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{profile.email}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Phone</h6>
                        <p className="text-muted">123 456 789</p>
                      </div>
                    </div>
                    <h6>Projects</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Recent</h6>
                        <p className="text-muted">Lorem ipsum</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Most Viewed</h6>
                        <p className="text-muted">Dolor sit amet</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start">
                      <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                      <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                      <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Profile;