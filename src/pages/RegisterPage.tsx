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
        dob : '',
        pass : '',
        passC : ''
    });
    const[success, setSuccess] = useState('');

    const hasLength = pass.length>=8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[^A-Za-z0-9]/.test(pass);
    
    function handleRegister(event : SyntheticEvent<HTMLFormElement>){
        // const email = (document.getElementById("email") as HTMLInputElement).value;
        // const dob = (document.getElementById("dob") as HTMLInputElement).value;
        // const pass = (document.getElementById("pass") as HTMLInputElement).value;
        // const passC = (document.getElementById("passC") as HTMLInputElement).value; 
        // this is not advisable, because this takes values directly from DOM which is imperative for obtaining dynamically changing values
        event.preventDefault();

        setError({name : '', dob : '', pass : '', passC : ''});
        setSuccess('');

        const trimmedName = name.trim();
        const date = new Date()
        const cuttOffDate = new Date(date.getFullYear()-18, date.getMonth(), date.getDate());
        const birthday = new Date(dob);


        if(trimmedName === "" || trimmedName.length<3 || /[^a-zA-Z -']/.test(trimmedName)) {
            setError(prev => ({...prev, name : "Invalid Name"}));
            return;
        }

        if(cuttOffDate < birthday){
            setError(prev => ({...prev, dob : "You must be at least 18 years old"}));
            return;
        }
        
        if(!hasLength){
            setError(prev => ({...prev, pass :'Password must be at least 8 characters long'}));
            return;
        }

        if(!hasUpper){
            setError(prev => ({...prev, pass :'Password must contain at least one UpperCase'}));
            return;
        }

        if(!hasNumber){
            setError(prev => ({...prev, pass : 'Password must contain at least one Number'}));
            return;
        }

        if(!hasSpecial){
            setError(prev => ({...prev, pass : 'Password must contain at least one Special Character'}));
            return;
        }

        if(pass!==passC){
            setError(prev => ({...prev, passC : 'Passwords don\'t Match'}));
            return;
        }
        
        setSuccess('Welcome '+trimmedName);
    }

    return(
        <div className="min-h-screen flex items-center justify-center">
            <Link to='/'>back</Link>
            <h1>Registration Page</h1>
            <form onSubmit={handleRegister}>
                <label htmlFor='name'>Name :</label>
                <input type='text' id='name' onChange={(event) => setName(event.target.value)} value={name} required/>
                {error.name && <p>{error.name}</p>}<br />
                <label htmlFor='email'>Email address :</label>
                <input type='email' id='email' onChange={(event) => setEmail(event.target.value)} value={email} required/><br/>
                <label htmlFor='dob'>Date of Birth :</label>
                <input type='date' id='dob' onChange={(event) => setDOB(event.target.value)} value={dob} required/>
                {error.dob && <p>{error.dob}</p>}<br/>
                <label htmlFor='pass'>Password :</label>
                <input type='password' id='pass' onChange={(event) => setPass(event.target.value)} value={pass} required/>
                    {pass && (
                        <>
                            <p>{hasLength ? '✅' : '❌' } : Password Length</p>
                            <p>{hasUpper ? '✅' : '❌' } : Contains At least one Upper Case</p>
                            <p>{hasNumber ? '✅' : '❌' } : Contains At least one Number</p>
                            <p>{hasSpecial ? '✅' : '❌' } : Contiains At least one Special Character </p>
                        </>
                    )}
                {error.pass && <p>{error.pass}</p>}<br/>
                <label htmlFor='passC'>Confirm Password :</label>
                <input type='password' id='passC' onChange={(event) => setPassC(event.target.value)} value={passC} required/>
                {error.passC && <p>{error.passC}</p>}<br/>
                <button type='submit'>Register</button>
            </form>
            {success && <p>{success}</p>}
        </div>
    );
}


export default RegisterPage;