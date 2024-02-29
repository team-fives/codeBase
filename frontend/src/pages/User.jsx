import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import UserProfileCard from "../components/UserProfileCard";
import UserProfileTabs from "../components/UserProfileTabs";

export default function UserPage() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState("");
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) {
        setErrorText(error.message);
      } else {
        setUserProfile(user);
      }
    };

    loadUser();
  }, [id]);

  const handleUserUpdate = (updatedUser) => {
    if (isCurrentUserProfile) {
      setCurrentUser(updatedUser);
    } else {
      setUserProfile(updatedUser);
    }
  };

  
  if (errorText) return <p>{errorText}</p>;
  if (!userProfile) return null; // or loading indicator

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#E4E4E4] text-black">
        {userProfile && (
          <div className="flex flex-row justify-center space-x-[3rem] pl-[10rem] items-center w-full h-full">
            <UserProfileCard
              username={userProfile.username || currentUser.username}
              bio={userProfile.bio || currentUser.bio}
              profileimage={userProfile.profile_image || currentUser.profile_image}
              isCurrentUserProfile={isCurrentUserProfile}
              onUserUpdate={handleUserUpdate}
            />

            <UserProfileTabs
              username={userProfile.username}
              id={id}
              bio={userProfile.bio}
              isCurrentUserProfile={isCurrentUserProfile}
            />
          </div>
        )}
      </div>
    </>
  );
}

