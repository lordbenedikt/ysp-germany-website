import firebase from 'firebase/compat/app';
import DocumentData = firebase.firestore.DocumentData;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import SnapshotOptions = firebase.firestore.SnapshotOptions;

export interface Post {
    title: string;
    body: string;
    date: Date;
    location: string;
    photoUrls: string[];
}

export const postConverter = {
    toFirestore: function(post) {
        return {
            date: post.date,
            title: post.title,
            body: post.body,
            photoUrls: post.photoUrls,
            location: post.location,
        }
    },
    fromFirestore: function(snapshot, options) {
        const data: DocumentData = snapshot.data(options);
        return {
            date: data.date.toDate(),
            title: data.title,
            body: data.body,
            photoUrls: data.photoUrls,
            location: data.location,
        }
    }
};
