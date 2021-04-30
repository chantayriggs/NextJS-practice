import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'

const Counter = ({ id }) => {
    const [count, setCount] = useState('')
    useEffect(() => {
        const onCountIncrease = (count) => setCount(count.val())

        const fetchData = async () => {
            firebase.database().ref('counts').child(id).on('value', onCountIncrease)
        }

        fetchData()

        return () => {
            firebase.database().ref('counts').child(id).off('value', onCountIncrease)
        }
    }, [id])

    const increaseCount = async () => {
        const registerCount = () => fetch(`/api/incrementCount?id=${encodeURIComponent(id)}`)
        registerCount()
    }

    return (
        <div style={{ margin: '5px 0' }}>
            <button onClick={increaseCount}>Increase count</button>
            <h5>{count ? count : '0'}</h5>
        </div>
    )
}

export default Counter