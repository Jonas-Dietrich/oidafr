import  { useEffect, useState } from 'react';
import supabase from '../utils/supabase.tsx';
import {Session} from "@supabase/supabase-js";
import {useNavigate} from "react-router-dom";

const ResetPassword = () => {
    const [ session, setSession] = useState<Session>();
    const nav = useNavigate();

    const loadSession = async () => {
        supabase.auth.getSession().then(({data: {session}}) => {
            if (session) setSession(session);
        });
    }

    useEffect(() => {
        loadSession().then()
    }, []);

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>('');
    const [errorMessage, setErrorMessage] = useState<string | null>('');

    const pauseExecution = (duration: number) => {
        return new Promise(resolve => setTimeout(resolve, duration));
    }

    const handlePasswordChange = async () => {
        if (newPassword && newPassword === confirmNewPassword) {
            let { data, error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) {
                console.error(error);
                setErrorMessage(error.message);
                setSuccessMessage(null);
            } else {
                console.log(data);
                setSuccessMessage('Password reset successfully!!');
                setErrorMessage(null);
                pauseExecution(5000).then(() => nav('/'))
            }
        } else {
            setErrorMessage('Please enter the same password twice!');
            setSuccessMessage(null);
        }
    };

    return (
        <div>
            <div className="max-w-md mx-auto my-8 p-4 border rounded-lg shadow-lg">
                <p className="text-lg font-bold mb-4">Hello, {session ? session.user.email : "unknown person"}</p>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                       placeholder="New Password" className="border rounded-lg px-3 py-2 mb-2 w-full"/>
                <input type="password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}
                       placeholder="Confirm New Password" className="border rounded-lg px-3 py-2 mb-2 w-full"/>
                <button onClick={handlePasswordChange} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Passwort
                    zurücksetzen
                </button>
                {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
