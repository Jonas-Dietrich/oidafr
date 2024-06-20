import {useEffect, useState} from 'react';
import supabase from '../../src/utils/supabase.tsx';
import {Session} from "@supabase/supabase-js";

/**
 * Project: RssFrontend
 * Created by: eibmac20
 * Date: 3. 5. 2024
 */

const PasswordChange = () => {
    const [ session, setSession] = useState<Session>();

    const loadSession = async () => {
        supabase.auth.getSession().then(({data: {session}}) => {
            if (session) setSession(session);
        });
    }

    useEffect(() => {
        loadSession().then()
    }, []);
    
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>('');
    const [errorMessage, setErrorMessage] = useState<string | null>('');

    const handlePasswordChange = async () => {
        if (password && newPassword && newPassword === confirmNewPassword) {
            const { data, error } = await supabase.rpc('change_user_password', {
                current_plain_password: password,
                new_plain_password: newPassword
            });
            if (error) {
                console.error(error);
                setErrorMessage(error.message);
                setSuccessMessage(null);
            } else {
                console.log(data);
                setSuccessMessage('Password  changed successfully!');
                setErrorMessage(null);
            }
        } else {
            setErrorMessage('Please enter the same password twice!');
            setSuccessMessage(null);
        }
    };

    const handleLogoff = async () => {
        await supabase.auth.signOut();
    };

    return (
        <div>
            <div className="max-w-md mx-auto my-8 p-4 border rounded-lg shadow-lg">
                <p className="text-lg font-bold mb-4">Hello, {session ? session.user.email : "unknown person"}</p>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Current Password" className="border rounded-lg px-3 py-2 mb-2 w-full" />
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" className="border rounded-lg px-3 py-2 mb-2 w-full" />
                <input type="password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} placeholder="Confirm New Password" className="border rounded-lg px-3 py-2 mb-2 w-full" />
                <button onClick={handlePasswordChange} className="bg-blue-500 text-white px-4 py-2 mx-1 rounded-lg">Change Password</button>
                <button onClick={handleLogoff} className="bg-red-500 text-white px-4 py-2 mx-1 rounded-lg mt-4">Logoff</button>
                {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default PasswordChange;