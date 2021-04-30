import firebase from 'firebase/app'
import 'firebase/firestore'
import { useState } from 'react'
import { useUser } from '../../firebase/useUser'

const ReadDataFromCloudFirestore = () => {

    const [ returnedData, setReturnedData ] = useState(null)

    const { user } = useUser()
    const readData = () => {
        try {
            firebase
                .firestore()
                .collection('myCollection')
                .doc(user.id)
                .onSnapshot(function (doc) {
                    setReturnedData(doc.data())
                    console.log(doc.data())
                })
            
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <div>
            { returnedData === null ? null : 
            <div>
                { returnedData.string_data }
            </div>
            }
            <div style={{ margin: '5px 0' }}>
                <button onClick={readData}>Read Data From Cloud Firestore</button>
            </div>
        </div>
    )
}

export default ReadDataFromCloudFirestore