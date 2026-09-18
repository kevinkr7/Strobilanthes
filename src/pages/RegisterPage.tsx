import { Link } from 'react-router-dom';
import { useState, type SyntheticEvent } from 'react';

function RegisterPage(){
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[dob, setDOB] = useState('');
    const[pass, setPass] = useState('');
    const[passC, setPassC] = useState('');

    const[error, setError] = useState({
        name : '',
        email : '',
        dob : '',
        pass : '',
        passC : ''
    });
    const[success, setSuccess] = useState('');
    
    function handleRegister(event : SyntheticEvent<HTMLFormElement>){
        // const email = (document.getElementById("email") as HTMLInputElement).value;
        // const dob = (document.getElementById("dob") as HTMLInputElement).value;
        // const pass = (document.getElementById("pass") as HTMLInputElement).value;
        // const passC = (document.getElementById("passC") as HTMLInputElement).value; 
        // this is not advisable, because this takes values directly from DOM which is imperative for obtaining dynamically changing values
        event.preventDefault();
        setError({name : '', email : '', dob : '', pass : '', passC : ''});
        setSuccess('');
        const trimmedName = name.trim();
        const date = new Date()
        const cuttOffDate = new Date(date.getFullYear()-18, date.getMonth(), date.getDate());
        const birthday = new Date(dob);
        if(trimmedName === "" || trimmedName.length<3 || /[^a-zA-Z -']/.test(trimmedName)) {
            setError({...error, name : "Invalid Name"});
            return;
        }

        if(cuttOffDate < birthday){
            setError({...error, dob : "You must be at least 18 years old"});
            return;
        }
        
        if(pass.length<8){
            setError({...error, pass :'Password must be atleast 8 characters long'});
            return;
        }

        if(!/[A-Z]/.test(pass)){
            setError({...error, pass :'Password must contain atleast one UpperCase'});
            return;
        }

        if(!/[0-9]/.test(pass)){
            setError({...error, pass : 'Password must contain atleast one Number'});
            return;
        }

        if(!/[^A-Za-z0-9]/.test(pass)){
            setError({...error, pass : 'Password must contain atleast one Special Character'});
            return;
        }

        if(pass!==passC){
            setError({...error, passC : 'Passwords don\'t Match'});
            return;
        }
        
        setSuccess('Welcome '+trimmedName);
    }

    return(
        <div>
            <Link to='/'>back</Link>
            <h1>Registration Page</h1>
            <form onSubmit={handleRegister}>
                <label htmlFor='name'>Name :</label>
                <input type='text' id='name' onChange={(event) => setName(event.target.value)} value={name} required/>
                {error && <p>{error.name}</p>}<br />
                <label htmlFor='email'>Email address :</label>
                <input type='email' id='email' onChange={(event) => setEmail(event.target.value)} value={email} required/>
                {error && <p>{error.email}</p>}<br />
                <label htmlFor='dob'>Date of Birth :</label>
                <input type='date' id='dob' onChange={(event) => setDOB(event.target.value)} value={dob} required/>
                {error && <p>{error.dob}</p>}<br/>
                <label htmlFor='pass'>Password :</label>
                <input type='password' id='pass' onChange={(event) => setPass(event.target.value)} value={pass} required/>
                {error && <p>{error.pass}</p>}<br/>
                <label htmlFor='passC'>Confirm Password :</label>
                <input type='password' id='passC' onChange={(event) => setPassC(event.target.value)} value={passC} required/>
                {error && <p>{error.passC}</p>}<br/>
                <button type='submit'>Register</button>
            </form>
            {success && <p>{success}</p>}
        </div>
    );
}


export default RegisterPage;