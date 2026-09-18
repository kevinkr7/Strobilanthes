import { Link } from 'react-router-dom';

function LoginPage() {
    return <div>
        <Link to='/'>back</Link>
        <form onSubmit={ handleSubmit }>
            <label htmlFor='email'>email : </label>
                <input id='email' type='email' /><br />
            <label htmlFor='pass'>password : </label>
                <input id='pass' type='password' /><br />
            <button type='submit'>Submit</button>
        </form>
    </div>
}

function handleSubmit(event){
    event.preventDefault();
    console.log("Succcessful");
}

export default LoginPage;