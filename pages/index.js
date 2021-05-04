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
      <div className="logout-container">
        <button onClick={() => logout()} style={{ width: '100px' }}>Log Out</button>
      </div>
      <div >

          <div className="user-info-container">

          <div>
              <h1>{user.name}</h1>
              <h2>{user.email}</h2>
              <div className="read-write-container">
              <ReadDataFromCloudFirestore id={user.id} />
              <WriteToCloudFirestore id={user.id}  />
          </div>
            </div>
            <div className="profile-pic-container">
              <h3>Current Profile Picture</h3>
              <UploadFile id={user.id}/>
            </div>
          </div>




            <div className="realtime-database-container">
              <h5>Real Time Database Hit:</h5>
              <Counter id={user.id} />
            </div>





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
