// to learn how to download a file, get/use file metadata, delete files, and list files see https://firebase.google.com/docs/storage/web/start

import { useRef, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'

const UploadFile = ({ id }) => {
    const inputEl = useRef(null)
    const [value, setValue] = useState(0)

    function uploadFile() {
        // get file
        var file = inputEl.current.files[0]

        // create a storage ref
        // var storageRef = firebase.storage().ref('user_uploads/' + file.name)

        var storageRef = firebase.storage().ref(`user_uploads/${id}`)

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

            function complete() {
                alert('Uploaded to firebase storage successfully!')
                setValue(0)
            }
        )
    }

    return (
        <div style={{ margin: '5px 0' }}>
            <progress value={value} max="100"></progress>
            <br />
            <input
                type="file"
                onChange={uploadFile}
                ref={inputEl}
            />
        </div>
    )
}

export default UploadFile