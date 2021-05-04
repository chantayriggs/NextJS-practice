import { useEffect, useRef, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'

const UploadFile = ({ id }) => {
    const inputEl = useRef(null)
    const [value, setValue] = useState(0)

    const [ tryImage, setTryImage ] = useState(null)

    function uploadFile() {
        // get file
        var file = inputEl.current.files[0]

        // create a storage ref
        var storageRef = firebase.storage().ref(`${id}/profile_picture`)

        // upload file
        var task = storageRef.put(file)

        // update progress bar
        task.on('state_change',

            function progress(snapshot) {
                setValue((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            },

            function error(err) {
                alert(error)
            },

            function compleete() {
                alert('Uploaded to firebase storage successfully!')
                setValue(0)
            }
        )
    }

    useEffect( () => {
        const images = firebase.storage().ref().child(id)
        const image = images.child('profile_picture')
        // image.getDownloadURL().then((url) => { 
        //     setTryImage(url)
        // })

        image.getDownloadURL().then(onResolve, onReject);

        function onResolve(foundURL) {
            setTryImage(foundURL)
        }
        
        function onReject(error) {
            console.log("No uploaded profile picture yet");
        }




    }, [id])



    return (
        <div>
            <progress value={value} max="100"></progress>
            <br />
            <input
                type="file"
                onChange={uploadFile}
                ref={inputEl}
            />
            {
                tryImage === null ? null :
                <div>
                    <img src={tryImage} style={{ width: "500px"}} />
                </div>
            }
        </div>
    )
}

export default UploadFile