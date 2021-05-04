import WriteToCloudFirestore from '../components/cloudFirestore/Write'
import ReadDataFromCloudFirestore from '../components/cloudFirestore/Read'
import { useUser } from '../firebase/useUser'
import Counter from '../components/realtimeDatabase/Counter'
import UploadFile from '../components/storage/UploadFile'

export default function Home() {
  const { user, logout } = useUser()

  if (user) {
    return (
      <div className="home-container">
            <div>{user.name}</div>
            <div>{user.email}</div>
            {user.profilePic ? <image src={user.profilePic} height={100} width={100}></image> : <p>No profile pic</p>}

            <WriteToCloudFirestore id={user.id}  />
            <ReadDataFromCloudFirestore id={user.id} />

            <Counter id={user.id} />

            <UploadFile id={user.id}/>

            <div>
              <button onClick={() => logout()} style={{ width: '100px' }}>Log Out</button>
            </div>
      </div>
    )
  }

  else return (
    <div>
      <p><a href="/auth">Log In!</a></p>
    </div>
  )
}
