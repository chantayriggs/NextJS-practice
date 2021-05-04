import firebase from 'firebase/app'
import 'firebase/firestore'
import { useState } from "react"

const WriteToCloudFirestore = ({ id }) => {

    const [ status, setStatus ] = useState("")

    const handleStatusChange = event => {
        setStatus(event.target.value)
    }

    const sendData = event => {
        event.preventDefault()
        try {
            firebase
                .firestore()
                .collection('myCollection')
                .doc(id) 
                .set({
                    status: status,
                }
                // , { merge: true }
                )
        } catch (error) {
            console.log(error)
            alert(error)
        }
        setStatus("")
    }

    return (
        <div>
            <form onSubmit={sendData} >
                <input placeholder="Update status" type="text" value={status} onChange={handleStatusChange} />
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            
        </div>
    )
}

export default WriteToCloudFirestore