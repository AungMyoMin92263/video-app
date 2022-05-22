import { firebaseApp } from '../firebase-config'

import { collection, doc, getDoc, getDocs, orderBy } from 'firebase/firestore'



// fetch all docs from firebase
export const getAllFeeds = async (firestoreDb) => {
    const feeds = await getDocs(collection(firestoreDb, 'videos'), orderBy('id', 'desc'));
    return feeds.docs.map(doc =>
        doc.data())
}


export const getUserInfo = async (firestoreDb, userId) => {
    const userRef = doc(firestoreDb, 'users', userId)
    const userInfo = await getDoc(userRef)
    if (userInfo.exists()) {
        return userInfo.data()
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

export const getfetchVideoDetail = async (firestoreDb, videoId) =>{
    const videoRef = doc(firestoreDb, 'videos', videoId)
    const videoSnap = await getDoc(videoRef)
    if (videoSnap.exists()){
        return videoSnap.data()
    }else{
        console.log('No such document')
    }
}