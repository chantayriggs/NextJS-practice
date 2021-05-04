import firebase from 'firebase/app'
import 'firebase/firestore'
import { useEffect, useState } from 'react'

const ReadDataFromCloudFirestore = ({ id }) => {

    const [ returnedData, setReturnedData ] = useState(null)

    useEffect( () => {
        try {
            firebase
                .firestore()
                .collection('myCollection')
                .doc(id)
                .onSnapshot(function (doc) {
                    setReturnedData(doc.data())
                })
            
        } catch (error) {
            console.log(error)
            alert(error)
        }

    }, [id])

    return (
        <div>
            { returnedData === null ? null : 
            <div>
                {`Current Status: ${returnedData.status}`}
            </div>
            }
        </div>
    )
}

export default ReadDataFromCloudFirestore