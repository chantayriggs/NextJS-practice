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
                alert(err)
            },

            function complete() {
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

    }, [id, value])

    return (
        <div className="upload-container">
            {
                tryImage === null ? null :
                <div>
                    <img src={tryImage} />
                </div>
            }

            <progress value={value} max="100"></progress>

                    <input
                        type="file"
                        onChange={uploadFile}
                        ref={inputEl}
                    />

        </div>
    )
}

export default UploadFile