import { CalendarViewDay, Create, EventNote, Image, Subscriptions } from '@material-ui/icons'
import React, { useState, useEffect } from 'react'
import './Feed.css'
import InputOption from './InputOption'
import Post from './Post'
import { db } from './firebase'
import firebase from 'firebase';
import { selectUser } from './features/userSlice'
import { useSelector } from 'react-redux'

function Feed() {
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => setPosts(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
        }))));
    }, [])

    const sendPost = (e) => {
        e.preventDefault();

        db.collection('posts').add({
            name: user.displayName,
            description: user.email,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput('');
    }

    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <Create />
                    <form>
                        <input type="text" value={input} onChange={e => setInput(e.target.value)} />
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
                <div className="feed__inputOptions">
                    <InputOption Icon={Image} title='Photo' color='#7085F9' />
                    <InputOption Icon={Subscriptions} title='Video' color='#E7A33E' />
                    <InputOption Icon={EventNote} title='Event' color='#C0CBC0' />
                    <InputOption Icon={CalendarViewDay} title='Write Article' color='#7FC15E' />
                </div>
            </div>

            {posts.map(({ id, data: { name, description, message } }) => (
                <Post key={id} name={name} description={description} message={message} />
            ))}

        </div>
    )
}

export default Feed
