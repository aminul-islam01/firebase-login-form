import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../Providers/AuthProviders';

const Register = () => {
    const {createUser, emailVerified, proFileUpdate} = useContext(UserContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = (event) => {
        setError('');
        setSuccess('');
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

        if (password.length < 8) {
            setError("Password length must be at least 8 characters");
            return;
          } else if (password.length >= 15) {
            setError("Password length must not exceed 15 characters");
            return;
          } else if (!/(?=.*[A-Z])/.test(password)) {
            setError("Password must be at least one uppercase");
            return;
          } else if (!/(?=.*[@$!%#*?&])/.test(password)) {
            setError("Password must be at least one special characters");
            return;
          } else if (!/[0-9]/.test(password)) {
            setError("Password must be at least one number");
            return;
          }


        createUser(email, password)
        .then((result) => {
            const loggedUser = result.user;

            proFileUpdate(loggedUser, name, photo);

            emailVerified()
            .then(() => {
                alert('check your email and verification this email')
              });

            console.log(loggedUser)
            setSuccess('user has been create successfully');
            form.reset();
          })
          .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
          });
        console.log(photo)
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col ">
                <h1 className="text-5xl font-bold">Please Register!</h1>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" name="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-email">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-photo">Email</span>
                            </label>
                            <input type="file" placeholder="upload your photo" name="photo" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name="password" className="input input-bordered" required/>
                            <p className='text-red-400 mt-5'>{error}</p>
                            <p className='text-green-400'>{success}</p>
                            <p className='mt-5'>if you have an account Please!!
                                 <Link to="/login">
                                  <button className="btn btn-xs ml-2">login</button></Link>
                            </p>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;