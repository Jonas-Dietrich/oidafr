import PasswordChange from "../components/PasswordChange.tsx";
import rssImage from "@/assets/rssAccount.png";

const AccountManagement = () => {
    return (
        <div className={`flex flex-col items-center justify-center mt-5 text-gray-900`}>
            <img src={rssImage} alt="Our RSS Accountant - he is a shady guy" content={"Content credentials: Generated with AI ∙ 24 May 2024 at 7:17 pm"} className="mb-4 size-52"/>
            <PasswordChange/>
        </div>
    );
};

export default AccountManagement;