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
                    if (doc.data()) {
                        setReturnedData(doc.data())
                        
                    } else {
                        setReturnedData("")
                    }
                    
                })
            
        } catch (error) {
            console.log(error)
            alert(error)
        }

    }, [id])

    return (
        <div>
            { returnedData ? 
            <div>
                {`Current Status: ${returnedData.status}`}
            </div>
            : null
            }
        </div>
    )
}

export default ReadDataFromCloudFirestore